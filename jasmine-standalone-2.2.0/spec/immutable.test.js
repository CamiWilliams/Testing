describe("ArrayMapNode", function() {
  it("return itself if key and value already exist", function() {
    var map = new Immutable.ArrayMapNode(0, [[1,2],[3,4]]);
    var res = map.update(0, 0, 0, 1, 2, 0, 0);
    expect(Immutable.is(res, map)).toBeTruthy();
  });

  it("return itself if key is not in the map and value is NOT_SET", function() {
    var map = new Immutable.ArrayMapNode(0, [[1,2],[3,4]]);
    console.log(Immutable.NOT_SET);
    var res = map.update(0, 0, 0, 4, Immutable.NOT_SET, 0, 0);
    expect(Immutable.is(res, map)).toBeTruthy();
  });
})
