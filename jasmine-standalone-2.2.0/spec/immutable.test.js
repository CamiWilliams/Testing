describe("ArrayMapNode", function() {
  it("returns itself if key and value already exist", function() {
    var map = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
    var res = map.update(0, 0, 0, 1, 'a', {value: false}, {value: false});
    var toComp = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
    expect(Immutable.is(res.ownerID, toComp.ownerID)).toBeTruthy();
    for (var i=0; i<res.entries.length; i++) {
      expect(Immutable.is(res.entries[i][0], toComp.entries[i][0])).toBeTruthy();
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  it("returns itself if key is not in the map and value is NOT_SET", function() {
    var map = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
    // console.log(Immutable.NOT_SET);
    var res = map.update(0, 0, 0, 3, Immutable.NOT_SET, {value: false}, {value: false});
    var toComp = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  it("returns undefined if there is only one key in the map and that key is called on update with value == NOT_SET", function() {
    var map = new Immutable.ArrayMapNode(0, [[1, 'a']]);
    var res = map.update(0, 0, 0, 1, Immutable.NOT_SET, {value: false}, {value: false});
    expect(res).toBe(undefined);
  });

  it("adds new element if key doesn't exist and value is not NOT_SET, with ownerID stays the same", function() {
    var map = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b']]);
    var res = map.update(0, 0, 0, 3, 'c');
    var toComp = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b'],[3, 'c']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  it("returns a new map with new ownerID. The new map will have the same elements" +
  "as the old one, and if the key doesn't exist yet, and value is not NOT_SET," +
  "add it to the new map", function() {
    var map = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b']]);
    var res = map.update(1, 0, 0, 3, 'c');
    var toComp = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b'],[3, 'c']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  it("remove element if key is in the map and value is NOT_SET", function() {
    var map = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b']]);
    var res = map.update(0, 0, 0, 2, Immutable.NOT_SET);
    var toComp = new Immutable.ArrayMapNode(0, [[1, 'a']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  it("returns a new map with new ownerID. The new map will have the same elements" +
  "as the old one, and if the key exists, and value is NOT_SET," +
  "remove the key out of the new map", function() {
    var map = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b']]);
    var res = map.update(1, 0, 0, 2, 'c');
    var toComp = new Immutable.ArrayMapNode(1, [[1, 'a']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  it("remove element if key is in the map and value is NOT_SET. " +
  "The index of the key in map is not at the end", function() {
    var map = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b']]);
    var res = map.update(0, 0, 0, 2, Immutable.NOT_SET);
    var toComp = new Immutable.ArrayMapNode(0, [[2, 'a']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  it("returns a new map with new ownerID. The new map will have the same elements" +
  "as the old one, and if the key exists, and value is NOT_SET," +
  "remove the key out of the new map. The index of the key is not at the end", function() {
    var map = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b']]);
    var res = map.update(1, 0, 0, 1, 'c');
    var toComp = new Immutable.ArrayMapNode(1, [[1, 'a']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });
})
