describe("partition extra", function() {
  // wholeSlice function:
  // parameters: begin, end, size
  // begin: undefined, <0, 0, >0 // b1, b2, b3, b4
  // end: undefined, <0, >=0 // e1, e2, e3
  // size: undefined, >=0 // s1, s2
  it("begin == undefined, end == undefined, size == undefined", function() {
    var val = Immutable.wholeSlice(undefined, undefined, undefined);
    expect(val).toBeFalsy();
  });

  it("begin == undefined, end < 0, size >= 0", function() {
    var val = Immutable.wholeSlice(undefined, -5, 4);
    expect(val).toBeFalsy();
  });

  it("begin == undefined, end >= 0, size == undefined", function() {
    var val = Immutable.wholeSlice(undefined, 5, undefined);
    expect(val).toBeFalsy();
  });

  it("begin < 0, end == undefined, size >= 0", function() {
    var val = Immutable.wholeSlice(-6, undefined, 5);
    expect(val).toBeTruthy();
  })

  it("begin < 0, end < 0, size == undefined", function() {
    var val = Immutable.wholeSlice(-4, -5, undefined);
    expect(val).toBeFalsy();
  });

  it("begin < 0, end >= 0, size >= 0", function() {
    var val = Immutable.wholeSlice(-5, 5, 5);
    expect(val).toBeTruthy();
  });

  it("begin == 0, end == undefined, size == undefined", function() {
    var val = Immutable.wholeSlice(0, undefined, undefined);
    expect(val).toBeTruthy();
  });

  it("begin == 0, end < 0, size >= 0", function() {
    var val = Immutable.wholeSlice(0, -5, 5);
    expect(val).toBeFalsy();
  });

  it("begin == 0, end >= 0, size == undefined", function() {
    var val = Immutable.wholeSlice(0, 5, undefined);
    expect(val).toBeFalsy();
  });

  it("begin > 0, end == undefined, size >= 0", function() {
    var val = Immutable.wholeSlice(4, undefined, 2);
    expect(val).toBeFalsy();
  });

  it("begin > 0, end < 0, size == undefined", function() {
    var val = Immutable.wholeSlice(4, -5, undefined);
    expect(val).toBeFalsy();
  });

  it("begin > 0, end >= 0, size >= 0", function() {
    var val = Immutable.wholeSlice(5, 5, 5);
    expect(val).toBeFalsy();
  });
})
