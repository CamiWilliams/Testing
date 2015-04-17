describe("ArrayMapNode", function() {

  // NEW TEST
    // EPC 14 : [6, 9, 10] 
    it("returns itself if key is in the map and value is NOT_SET/invalid", function() {
      var map = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
      var res = map.update(0, 0, 0, 2, Immutable.NOT_SET, {value: true}, {value: false});
      var toComp = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
      expect(res.ownerID).toBe(toComp.ownerID);
      for (var i=0; i<res.entries.length; i++) {
          expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
          expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
      }
    });

    // NEW TEST
    // EPC 16: [7, 9, 10]
    it("adds new element if key doesn't exist and value is not NOT_SET, with ownerID stays the same", function() {
      var map = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b']]);
      var res = map.update(0, 0, 0, 3, 'c', {value: true}, {value: true});
      var toComp = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b'],[3, 'c']]);
      expect(res.ownerID).toBe(toComp.ownerID);
      for (var i=0; i<res.entries.length; i++) {
          expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
          expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
      }
    });

  //EPC [1, 2, 3], [2, 3, 5], [3, 5, 6], [5, 6, 9], [6, 9, 11], [9, 11, 10], [11, 10, 13],
  //[10, 13, 15], [13, 15, 17], [15, 17, 18], [17, 18, 19], [18, 19, 21],
  //[19, 21, 24], [21, 24, 25], [24, 25, 26]

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

  // EPC [1, 2, 3] [2, 3, 4], [3, 4, 2], [4, 2, 3], [3, 5, 6],
  // [5, 6, 9], [6, 9, 11], [9, 11, 10], [11, 10, 13], [10, 13, 15], [13, 15, 17], [15, 17, 18],
  // [17, 18, 19], [18, 19, 21], [19, 21, 23], [21, 23, 25], [23, 25, 26]
  it("determines if an ArrayMapNode called by update with a found entry at the last index will" +
  "return an equal copy of an ArrayMapNode", function () {
    var map = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
    var res = map.update(0, 0, 0, 2, Immutable.NOT_SET, {value: false}, {value: false});
    var toComp = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(Immutable.is(res.entries[i][0], toComp.entries[i][0])).toBeTruthy();
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  //EPC [1, 2, 3], [2, 3, 4], [3, 4, 2], [4, 2, 3], [4, 2, 5], [2, 5, 7], [5, 7, 8]
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
  
  //EPC [1, 2, 3], [2, 3, 5], [5, 6, 8]
  // [11,10,12]
  it("returns undefined if there is only one key in the map and that key is called on update with value == NOT_SET", function() {
    var map = new Immutable.ArrayMapNode(0, [[1, 'a']]);
    var res = map.update(0, 0, 0, 1, Immutable.NOT_SET, {value: false}, {value: false});
    expect(res).toBe(undefined);
  });

  //EPC [1, 2, 3], [2, 3, 4], [3, 4, 2], [4, 2, 3], [4, 2, 5], [5, 7, 9], [7, 9, 11],
  //[9, 11, 10], [10, 13, 15], [13, 15, 17], [15, 17, 18] [17, 18, 20], [20, 25, 26]
  // [11,10,13],[10,13,15],[13,15,16],[15,16,18], [16,18,20], [18,20,25], [20,25,26]
  it("adds new element if key doesn't exist and value is not NOT_SET, with ownerID stays the same", function() {
    var map = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b']]);
    var res = map.update(1, 0, 0, 3, 'c');
    var toComp = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b'],[3, 'c']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  //EPC [1, 2, 3], [2, 3, 5], [3, 5, 6], [5, 6, 9], [6, 9, 11], [9, 11, 10],
  //[11, 10, 13], [10, 13, 15], [13, 15, 17],  [15, 17, 18], [17, 18, 19],
  //[18, 19, 22], [19, 22, 25], [22, 25, 26]
  it("adds new element if key doesn't exist and value is not NOT_SET, with ownerID stays the same", function() {
    var map = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b']]);
    var res = map.update(0, 0, 0, 1, 'c');
    var toComp = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b'],[3, 'c']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(Immutable.is(res.entries[i][0], toComp.entries[i][0])).toBeTruthy();
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  // [13,15,17],[15,17,18],[17,18,20],[20,25,27]
  it("returns a new map with new ownerID. The new map will have the same elements" +
  "as the old one, and if the key doesn't exist yet, and value is not NOT_SET," +
  "add it to the new map", function() {
    var map = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b']]);
    var res = map.update(2, 0, 0, 3, 'c');
    var toComp = new Immutable.ArrayMapNode(2, [[1, 'a'], [2, 'b'],[3, 'c']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });


  // [16,18,19],[23,25,26]
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

  // [17,18,19], [18,19,21], [19,21,23], [21,23,25], [23,25,27]
  it("returns a new map with new ownerID. The new map will have the same elements" +
  "as the old one, and if the key exists, and value is NOT_SET," +
  "remove the key out of the new map", function() {
    var map = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b']]);
    var res = map.update(2, 0, 0, 2, Immutable.NOT_SET);
    var toComp = new Immutable.ArrayMapNode(2, [[1, 'a']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  // [19,21,24], [21,24,25],[24, 25, 26]
  it("removes element if key is in the map and value is NOT_SET. " +
  "The index of the key in map is not at the end", function() {
    var map = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b']]);
    var res = map.update(1, 0, 0, 1, Immutable.NOT_SET);
    var toComp = new Immutable.ArrayMapNode(1, [[2, 'b']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  // Edge-pair Coverage
  // [24, 25, 27],
  it("returns a new map with new ownerID. The new map will have the same elements" +
  "as the old one, and if the key exists, and value is NOT_SET," +
  "remove the key out of the new map. The index of the key is not at the end", function() {
    var map = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b']]);
    var res = map.update(2, 0, 0, 1, Immutable.NOT_SET);
    var toComp = new Immutable.ArrayMapNode(2, [[2, 'b']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

  // [22,25,26]
  it("when the key already exists and the value is not NOT_SET, replace " +
    "it with a new value", function() {
      var map = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b'], [3, 'c']]);
      var res = map.update(1, 0, 0, 2, 'd');
      var toComp = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'd'], [3, 'c']]);
      expect(res.ownerID).toBe(toComp.ownerID);
      for (var i=0; i<res.entries.length; i++) {
        expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
        expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
      }
  });

  // [18,19,22], [19,22,25], [22,25,27]
  it("returns new map if given a new ownerID, when the key already exists and the value is not NOT_SET, replace " +
    "it with a new value", function() {
      var map = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b'], [3, 'c']]);
      var res = map.update(2, 0, 0, 2, 'd');
      var toComp = new Immutable.ArrayMapNode(2, [[1, 'a'], [2, 'd'], [3, 'c']]);
      expect(res.ownerID).toBe(toComp.ownerID);
      for (var i=0; i<res.entries.length; i++) {
        expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
        expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
      }
  });

  // [10,13,14]
  it("createNodes if entries.length >= Max_Array_Map_Size", function() {
    var map = new Immutable.ArrayMapNode(1, [[1,'a'],[2,'b'],[3,'c'],[4,'d'],[5,'e'],
      [6,'f'],[7,'g'],[8,'h']]);
    var res = map.update(1, 0, 0, 9, 'i');
    var toComp = new ValueNode(1, undefined, [9, 'i']);
    expect(res.ownerID).toBe(toComp.ownerID);
    expect(res.entry[0]).toBe(toComp.entry[0]);
    expect(res.entry[1]).toBe(toComp.entry[0]);
  });
})
