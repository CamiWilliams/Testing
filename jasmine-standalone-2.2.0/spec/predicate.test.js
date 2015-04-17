describe("ArrayMapNode", function() {
  //-----------------------------------------------------------------------
  //   2 Clauses: if(exists ? entries[idx][1] === value : removed)
  //                   A                B1                   B2
  //-----------------------------------------------------------------------
      //   Major is A (B1 = T, B2 = F)
      //   A  |  B1  |  B2 |  P
      //-----------------------
      //   T  |  T   | T/F |  T   <----
      //   T  |  F   | T/F |  F
      //   F  |  T/F |  T  |  T
      //   F  |  T/F |  F  |  F
      it("returns itself if key and value already exist", function() {
        var map = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
        var res = map.update(0, 0, 0, 2, 'b', {value: false}, {value: false});
        var toComp = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
        expect(Immutable.is(res.ownerID, toComp.ownerID)).toBeTruthy();
        for (var i=0; i<res.entries.length; i++) {
          expect(Immutable.is(res.entries[i][0], toComp.entries[i][0])).toBeTruthy();
          expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
        }
      });

      //   Major is A (B1 = T, B2 = F)
      //   A  |  B1  |  B2 |  P
      //-----------------------
      //   T  |  T   | T/F |  T
      //   T  |  F   | T/F |  F
      //   F  |  T/F |  T  |  T
      //   F  |  T/F |  F  |  F   <----
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

      //   Major is B1
      //   A  |  B1  |  B2 |  P
      //-----------------------
      //   T  |  T   | T/F |  T   <----
      //   T  |  F   | T/F |  F
      //   F  |  T/F |  T  |  T
      //   F  |  T/F |  F  |  F
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

      //   Major is B1
      //   A  |  B1  |  B2 |  P
      //-----------------------
      //   T  |  T   | T/F |  T
      //   T  |  F   | T/F |  F   <----
      //   F  |  T/F |  T  |  T
      //   F  |  T/F |  F  |  F
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

      //   Major is B2
      //   A  |  B1  |  B2 |  P
      //-----------------------
      //   T  |  T   | T/F |  T
      //   T  |  F   | T/F |  F
      //   F  |  T/F |  T  |  T   <----
      //   F  |  T/F |  F  |  F
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

      //   Major is B2
      //   A  |  B1  |  B2 |  P
      //-----------------------
      //   T  |  T   | T/F |  T
      //   T  |  F   | T/F |  F
      //   F  |  T/F |  T  |  T
      //   F  |  T/F |  F  |  F   <----
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

  //-----------------------------------------------------------------------
  //   2 Clauses: if (removed && entries.length === 1)
  //                    A                B
  //-----------------------------------------------------------------------
      //   Major is A
      //   A  |  B  |  P
      //------------------
      //   T  |  T  |  T
      //   T  |  F  |  F  <----
      //   F  |  T  |  F
      //   F  |  F  |  F
      it("adds new element if key doesn't exist and value is NOT_SET, with ownerID stays the same", function() {
        var map = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
        var res = map.update(1, 0, 0, 2, Immutable.NOT_SET);
        var toComp = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b']]);
        expect(res.ownerID).toBe(toComp.ownerID);
        for (var i=0; i<res.entries.length; i++) {
          expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
          expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
        }
      });  //NEW TEST!!!

      //   Major is A
      //   A  |  B  |  P
      //------------------
      //   T  |  T  |  T
      //   T  |  F  |  F
      //   F  |  T  |  F
      //   F  |  F  |  F  <----
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

      //   Major is B
      //   A  |  B  |  P
      //------------------
      //   T  |  T  |  T
      //   T  |  F  |  F
      //   F  |  T  |  F   <----
      //   F  |  F  |  F
      it("adds new element if key doesn't exist and value is not NOT_SET, with ownerID stays the same, and the size is 1", function() {
        var map = new Immutable.ArrayMapNode(1, [[1, 'a']);
        var res = map.update(1, 0, 0, 2, 'b');
        var toComp = new Immutable.ArrayMapNode(1, [[1, 'a'], [2, 'b']]);
        expect(res.ownerID).toBe(toComp.ownerID);
        for (var i=0; i<res.entries.length; i++) {
          expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
          expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
        }
      });  //NEW TEST!!!

      //   Major is B
      //   A  |  B  |  P
      //------------------
      //   T  |  T  |  T
      //   T  |  F  |  F
      //   F  |  T  |  F
      //   F  |  F  |  F   <----
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

  //-----------------------------------------------------------------------
  //   3 Clauses: if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE)
  //                    A            B                  C
  //-----------------------------------------------------------------------
      //   Major is A
      //   A  |  B  |  C  |  P
      //-----------------------
      //   T  |  T  |  T  |  T   <----
      //   T  |  T  |  F  |  F
      //   T  |  F  |  T  |  F
      //   T  |  F  |  F  |  F
      //   F  |  T  |  T  |  F
      //   F  |  T  |  F  |  F
      //   F  |  F  |  T  |  F
      //   F  |  F  |  F  |  F
      it("createNodes if entries.length >= Max_Array_Map_Size, entry doesn't exist, and removed is false", function() {
        var map = new Immutable.ArrayMapNode(1, [[1,'a'],[2,'b'],[3,'c'],[4,'d'],[5,'e'],
          [6,'f'],[7,'g'],[8,'h']]);
        var res = map.update(1, 0, 0, 9, 'i');
        // console.log(res);
        var nodes = [new Immutable.ValueNode(1, undefined, [1,'a']),
                      new Immutable.ValueNode(1, undefined, [2,'b']),
                      new Immutable.ValueNode(1, undefined, [3,'c']),
                      new Immutable.ValueNode(1, undefined, [4,'d']),
                      new Immutable.ValueNode(1, undefined, [5,'e']),
                      new Immutable.ValueNode(1, undefined, [6,'f']),
                      new Immutable.ValueNode(1, undefined, [7,'g']),
                      new Immutable.ValueNode(1, undefined, [8,'h']),
                      new Immutable.ValueNode(1, undefined, [9,'i'])]
        var toComp = new Immutable.BitmapIndexedNode(1, undefined, nodes);
        expect(res.ownerID).toBe(toComp.ownerID);
        for (var i=0; i<res.nodes.length; i++) {
          expect(res.nodes[i].entry[0]).toBe(toComp.nodes[i].entry[0]);
          expect(res.nodes[i].entry[1]).toBe(toComp.nodes[i].entry[1]);
        }
      });

      //   Major is A
      //   A  |  B  |  C  |  P
      //-----------------------
      //   T  |  T  |  T  |  T
      //   T  |  T  |  F  |  F
      //   T  |  F  |  T  |  F
      //   T  |  F  |  F  |  F
      //   F  |  T  |  T  |  F   <----
      //   F  |  T  |  F  |  F
      //   F  |  F  |  T  |  F
      //   F  |  F  |  F  |  F
      it("doesn't change if entries.length >= Max_Array_Map_Size, entry does exist, and removed is false", function() {
        var map = new Immutable.ArrayMapNode(1, [[1,'a'],[2,'b'],[3,'c'],[4,'d'],[5,'e'],
          [6,'f'],[7,'g'],[8,'h']]);
        var res = map.update(1, 0, 0, 8, 'i');
        // console.log(res);
        var nodes = [new Immutable.ValueNode(1, undefined, [1,'a']),
                      new Immutable.ValueNode(1, undefined, [2,'b']),
                      new Immutable.ValueNode(1, undefined, [3,'c']),
                      new Immutable.ValueNode(1, undefined, [4,'d']),
                      new Immutable.ValueNode(1, undefined, [5,'e']),
                      new Immutable.ValueNode(1, undefined, [6,'f']),
                      new Immutable.ValueNode(1, undefined, [7,'g']),
                      new Immutable.ValueNode(1, undefined, [8,'h'])]
        var toComp = new Immutable.ArrayMapNode(1, nodes);
        expect(res.ownerID).toBe(toComp.ownerID);
        for (var i=0; i<res.nodes.length; i++) {
          expect(res.nodes[i].entry[0]).toBe(toComp.nodes[i].entry[0]);
          expect(res.nodes[i].entry[1]).toBe(toComp.nodes[i].entry[1]);
        }
      }); //NEW TEST!!!

      //   Major is B
      //   A  |  B  |  C  |  P
      //-----------------------
      //   T  |  T  |  T  |  T
      //   T  |  T  |  F  |  F   <----
      //   T  |  F  |  T  |  F
      //   T  |  F  |  F  |  F
      //   F  |  T  |  T  |  F
      //   F  |  T  |  F  |  F
      //   F  |  F  |  T  |  F
      //   F  |  F  |  F  |  F
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

      //   Major is B
      //   A  |  B  |  C  |  P
      //-----------------------
      //   T  |  T  |  T  |  T
      //   T  |  T  |  F  |  F
      //   T  |  F  |  T  |  F
      //   T  |  F  |  F  |  F   <----
      //   F  |  T  |  T  |  F
      //   F  |  T  |  F  |  F
      //   F  |  F  |  T  |  F
      //   F  |  F  |  F  |  F
      it("doesn't change if key doesn't exist and value is NOT_SET, with ownerID stays the same", function() {
        var map = new Immutable.ArrayMapNode(0, [[4, 'x'], [5, 'y']]);
        var res = map.update(0, 0, 0, 6, Immutable.NOT_SET, {value: true}, {value: true});
        var toComp = new Immutable.ArrayMapNode(0, [[4, 'x'], [5, 'y']]);
        expect(res.ownerID).toBe(toComp.ownerID);
        for (var i=0; i<res.entries.length; i++) {
            expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
            expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
        }
      });// NEW TEST!!!

      //   Major is C
      //   A  |  B  |  C  |  P
      //-----------------------
      //   T  |  T  |  T  |  T
      //   T  |  T  |  F  |  F
      //   T  |  F  |  T  |  F
      //   T  |  F  |  F  |  F
      //   F  |  T  |  T  |  F
      //   F  |  T  |  F  |  F
      //   F  |  F  |  T  |  F   <----
      //   F  |  F  |  F  |  F
      it("doesn't change entries.length >= Max_Array_Map_Size, entry does exist, and removed is true", function() {
        var map = new Immutable.ArrayMapNode(1, [[1,'a'],[2,'b'],[3,'c'],[4,'d'],[5,'e'],
          [6,'f'],[7,'g'],[8,'h']]);
        var res = map.update(1, 0, 0, 8, Immutable.NOT_SET);
        // console.log(res);
        var nodes = [new Immutable.ValueNode(1, undefined, [1,'a']),
                      new Immutable.ValueNode(1, undefined, [2,'b']),
                      new Immutable.ValueNode(1, undefined, [3,'c']),
                      new Immutable.ValueNode(1, undefined, [4,'d']),
                      new Immutable.ValueNode(1, undefined, [5,'e']),
                      new Immutable.ValueNode(1, undefined, [6,'f']),
                      new Immutable.ValueNode(1, undefined, [7,'g']),
                      new Immutable.ValueNode(1, undefined, [8,'h'])]
        var toComp = new Immutable.ArrayMapNode(1, nodes);
        expect(res.ownerID).toBe(toComp.ownerID);
        for (var i=0; i<res.nodes.length; i++) {
          expect(res.nodes[i].entry[0]).toBe(toComp.nodes[i].entry[0]);
          expect(res.nodes[i].entry[1]).toBe(toComp.nodes[i].entry[1]);
        }
      });// NEW TEST!!!

      //   Major is C
      //   A  |  B  |  C  |  P
      //-----------------------
      //   T  |  T  |  T  |  T
      //   T  |  T  |  F  |  F
      //   T  |  F  |  T  |  F
      //   T  |  F  |  F  |  F
      //   F  |  T  |  T  |  F
      //   F  |  T  |  F  |  F
      //   F  |  F  |  T  |  F
      //   F  |  F  |  F  |  F   <----
      it("doesn't change entries.length >= Max_Array_Map_Size, entry does exist, and removed is true", function() {
        var map = new Immutable.ArrayMapNode(1, [[1,'a'],[2,'b']]);
        var res = map.update(0, 0, 0, 9, Immutable.NOT_SET, {value: true}, {value: true});
        var toComp = new Immutable.ArrayMapNode(0, [[1, 'a'], [2, 'b']]);
        expect(res.ownerID).toBe(toComp.ownerID);
        for (var i=0; i<res.entries.length; i++) {
            expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
            expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
        }
      });// NEW TEST!!!

  //-----------------------------------------------------------------------
  //   2 Clauses:   var isEditable = ownerID && ownerID === this.ownerID;
  //                                    A                B
  //-----------------------------------------------------------------------
      //   Major is A
      //   A  |  B  |  P
      //------------------
      //   T  |  T  |
      //   T  |  F  |
      //   F  |  T  |
      //   F  |  F  |

      //   Major is A
      //   A  |  B  |  P
      //------------------
      //   T  |  T  |
      //   T  |  F  |
      //   F  |  T  |
      //   F  |  F  |

      //   Major is B
      //   A  |  B  |  P
      //------------------
      //   T  |  T  |
      //   T  |  F  |
      //   F  |  T  |
      //   F  |  F  |

      //   Major is B
      //   A  |  B  |  P
      //------------------
      //   T  |  T  |
      //   T  |  F  |
      //   F  |  T  |
      //   F  |  F  |


});
