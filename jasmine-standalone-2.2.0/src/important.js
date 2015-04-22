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








function Range(start, end, step) {
  if (!(this instanceof Range)) {
    return new Range(start, end, step);
  }
  invariant(step !== 0, 'Cannot step a Range by 0');
  start = start || 0;
  if (end === undefined) {
    end = Infinity;
  }
  step = step === undefined ? 1 : Math.abs(step);
  if (end < start) {
    step = -step;
  }
  this._start = start;
  this._end = end;
  this._step = step;
  this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
  if (this.size === 0) {
    if (EMPTY_RANGE) {
      return EMPTY_RANGE;
    }
    EMPTY_RANGE = this;
  }
}

Range.prototype.toString = function() {
  if (this.size === 0) {
    return 'Range []';
  }
  return 'Range [ ' +
    this._start + '...' + this._end +
    (this._step > 1 ? ' by ' + this._step : '') +
  ' ]';
};

Range.prototype.get = function(index, notSetValue) {
  return this.has(index) ?
    this._start + wrapIndex(this, index) * this._step :
    notSetValue;
};

Range.prototype.includes = function(searchValue) {
  var possibleIndex = (searchValue - this._start) / this._step;
  return possibleIndex >= 0 &&
    possibleIndex < this.size &&
    possibleIndex === Math.floor(possibleIndex);
};

Range.prototype.slice = function(begin, end) {
  if (wholeSlice(begin, end, this.size)) {
    return this;
  }
  begin = resolveBegin(begin, this.size);
  end = resolveEnd(end, this.size);
  if (end <= begin) {
    return new Range(0, 0);
  }
  return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
};

Range.prototype.indexOf = function(searchValue) {
  var offsetValue = searchValue - this._start;
  if (offsetValue % this._step === 0) {
    var index = offsetValue / this._step;
    if (index >= 0 && index < this.size) {
      return index
    }
  }
  return -1;
};

Range.prototype.lastIndexOf = function(searchValue) {
  return this.indexOf(searchValue);
};

Range.prototype.__iterate = function(fn, reverse) {
  var maxIndex = this.size - 1;
  var step = this._step;
  var value = reverse ? this._start + maxIndex * step : this._start;
  for (var ii = 0; ii <= maxIndex; ii++) {
    if (fn(value, ii, this) === false) {
      return ii + 1;
    }
    value += reverse ? -step : step;
  }
  return ii;
};

Range.prototype.__iterator = function(type, reverse) {
  var maxIndex = this.size - 1;
  var step = this._step;
  var value = reverse ? this._start + maxIndex * step : this._start;
  var ii = 0;
  return new src_Iterator__Iterator(function()  {
    var v = value;
    value += reverse ? -step : step;
    return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
  });
};

Range.prototype.equals = function(other) {
  return other instanceof Range ?
    this._start === other._start &&
    this._end === other._end &&
    this._step === other._step :
    deepEqual(this, other);
};



function resolveIndex(index, size, defaultIndex) {
  return index === undefined ?
    defaultIndex :
    index < 0 ?
      Math.max(0, size + index) :
      size === undefined ?
        index :
        Math.min(size, index);
}

function resolveBegin(begin, size) {
  return resolveIndex(begin, size, 0);
}

function resolveEnd(end, size) {
  return resolveIndex(end, size, size);
}

function wholeSlice(begin, end, size) {
  return (begin === 0 || (size !== undefined && begin <= -size)) &&
    (end === undefined || (size !== undefined && end >= size));
}
