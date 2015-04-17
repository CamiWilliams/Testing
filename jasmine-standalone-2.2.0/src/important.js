function ValueNode(ownerID, keyHash, entry) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entry = entry;
}

ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
  return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
};

ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  var removed = value === NOT_SET;
  var keyMatch = is(key, this.entry[0]);
  if (keyMatch ? value === this.entry[1] : removed) {
    return this;
  }

  SetRef(didAlter);

  if (removed) {
    SetRef(didChangeSize);
    return; // undefined
  }

  if (keyMatch) {
    if (ownerID && ownerID === this.ownerID) {
      this.entry[1] = value;
      return this;
    }
    return new ValueNode(ownerID, this.keyHash, [key, value]);
  }

  SetRef(didChangeSize);
  return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
};








function createNodes(ownerID, entries, key, value) {
  if (!ownerID) {
    ownerID = new OwnerID();
  }
  var node = new ValueNode(ownerID, hash(key), [key, value]);
  for (var ii = 0; ii < entries.length; ii++) {
    var entry = entries[ii];
    node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
  }
  return node;
}




function ArrayMapNode(ownerID, entries) {
  this.ownerID = ownerID;
  this.entries = entries;
}

ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
  var entries = this.entries;
  for (var ii = 0, len = entries.length; ii < len; ii++) {
    if (is(key, entries[ii][0])) {
      return entries[ii][1];
    }
  }
  return notSetValue;
};

ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  var removed = value === NOT_SET;

  var entries = this.entries;
  var idx = 0;
  for (var len = entries.length; idx < len; idx++) { //Node #2, 4
    if (is(key, entries[idx][0])) { //Node #3
      break;
    }
  }
  var exists = idx < len;

  //2 CLAUSES (1)
  if (exists ? entries[idx][1] === value : removed) { //Node #5, 6, 7
    return this; //Node #8
  }

  SetRef(didAlter);
  (removed || !exists) && SetRef(didChangeSize); //Node #9, 11

  //2 CLAUSES (2)
  if (removed && entries.length === 1) { //Node #10
    return; //Node #12
  }

  //3 CLAUSES (3)
  if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) { //Node #13
    return createNodes(ownerID, entries, key, value); //Node #14
  }

  //2 CLAUSES (4)
  var isEditable = ownerID && ownerID === this.ownerID;
  var newEntries = isEditable ? entries : arrCopy(entries); //Node #15, 16, 17

  if (exists) { //Node #18
    if (removed) { //Node #19
      idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop()); //Node #21, 23, 24
    } else { //Node #22
      newEntries[idx] = [key, value];
    }
  } else { //Node #20
    newEntries.push([key, value]);
  }

  if (isEditable) { //Node #25
    this.entries = newEntries;
    return this; //Node #26
  }

  return new ArrayMapNode(ownerID, newEntries); //Node #27
};


function arrCopy(arr, offset) {
  offset = offset || 0;
  var len = Math.max(0, arr.length - offset);
  var newArr = new Array(len);
  for (var ii = 0; ii < len; ii++) {
    newArr[ii] = arr[ii + offset];
  }
  return newArr;
}
