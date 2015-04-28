describe('EPC-extra', function() {
  it("one of the object is null", function() {
    var val = Immutable.is(null, 2);
    expect(val).toBeFalsy();
  });
})
