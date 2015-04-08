describe("ArrayMapNode", function() {
  it("do stuff", function() {
    var node = new Immutable.ArrayMapNode(0, [[1,2],[3,4]]);
    expect(node.get(0, 0, 1, 0)).toEqual(2);
    var m = Immutable.Map({'a': 'A', 'b': 'B'});
    expect(m.get('a')).toBe('A');
  })
})
