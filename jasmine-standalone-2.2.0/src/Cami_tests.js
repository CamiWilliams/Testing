describe("ArrayMapNode", function() {
  // EPC [2, 4, 3], [3, 4, 2], [4, 2, 3], [2, 5, 7], [3, 5, 7], [4, 2, 5],
  // [5, 7, 9], [7, 9, 11], [9, 11, 10], [11, 10, 13], [13, 15, 17], [15, 17, 18],
  // [17, 18, 19], [18, 19, 21], [19, 21, 23], [21, 23, 25], [23, 25, 27]
  it("determines if an ArrayMapNode called by update with a found entry will" +
  "return an equal copy of an ArrayMapNode", function () {
    var map = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
    var res = map.update(0, 0, 0, 2, Immutable.NOT_SET, {value: false}, {value: false});
    var toComp = new Immutable.ArrayMapNode(0, [[1,'a'],[2,'b']]);
    expect(res.ownerID).toBe(toComp.ownerID);
    for (var i=0; i<res.entries.length; i++) {
      expect(res.entries[i][0]).toBe(toComp.entries[i][0]);
      expect(res.entries[i][1]).toBe(toComp.entries[i][1]);
    }
  });

});
