describe("ArrayMapNode", function() {
  it("returns itself if key and value already exist", function() {
    var map = new Immutable.ArrayMapNode(0, [[1,2],[3,4]]);
    var res = map.update(0, 0, 0, 1, 2, {value: false}, {value: false});
    expect(Immutable.is(res, map)).toBeTruthy();
  });

  it("returns itself if key is not in the map and value is NOT_SET", function() {
    var map = new Immutable.ArrayMapNode(0, [[1,2],[3,4]]);
    // console.log(Immutable.NOT_SET);
    var res = map.update(0, 0, 0, 4, Immutable.NOT_SET, {value: false}, {value: false});
    expect(Immutable.is(res, map)).toBeTruthy();
  });

  it("returns undefined if there is only one key in the map and that key is called on update with value == NOT_SET", function() {
    var map = new Immutable.ArrayMapNode(0, [[1, 'a']]);
    var res = map.update(0, 0, 0, 1, Immutable.NOT_SET, {value: false}, {value: false});
    expected(Immutable.is(res, undefined)).toBeTruthy();
  });

  it("returns a ValueNode instance", function() {
    
  });
})
