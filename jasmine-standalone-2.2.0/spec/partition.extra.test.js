describe("partition extra", function() {
  // wholeSlice function:
  // parameters: begin, end, size
  // begin: undefined, <0, 0, >0 // b1, b2, b3, b4
  // end: undefined, <0, >=0 // e1, e2, e3
  // size: undefined, >=0 // s1, s2
  it("begin == undefined, end == undefined, size == undefined", function() {
    var val = Immutable.wholeSlice(undefined, undefined, undefined);
    expect(val).toBeFalsy();
  })
})
