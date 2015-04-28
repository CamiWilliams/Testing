describe("Range", function() {
  // INPUT SPACE CHARACTERISTIC TESTING : Range Constructor (start, end, step)
  // Char1 : "Visibility" of Start
  // Char2 : "Visibility" of End
  // Char3 : "Visibility" of Step

  // Blocks for Char1 and Char2:
  // B1 : undefined
  // B2 : < 0
  // B3 : >== 0

  // Blocks for Char3:
  // B1 : undefined
  // B2 : === 0
  // B3 : !== 0

  it("when start undefined, end undefined, step undefined", function() {
  	var range = Immutable.Range(undefined,undefined,undefined);
  	expect(range.toString()).toBe("Range [ 0..." + Infinity + " ]");
  	expect(range.includes(4)).toBeTruthy();
  	expect(range.includes(-4)).toBeFalsy();
  });

  it("when start undefined, end < 0, step === 0", function() {
  	var range;
  	expect(function() {
  		range = Immutable.Range(undefined, -5, 0);
  	}).toThrow(new Error('Cannot step a Range by 0'));
  });

  it("when start undefined, end >= 0, step !== 0", function() {
  	var range = Immutable.Range(undefined, 10, 2);
  	expect(range.toString()).toBe("Range [ 0...10 by 2 ]");
  	expect(range.includes(4)).toBeTruthy();
  	expect(range.includes(12)).toBeFalsy();
  });

  it("when start < 0, end undefined, step === 0", function() {
  	var range;
  	expect(function() {
  		range = Immutable.Range(- 10,undefined, 0);
  	}).toThrow(new Error('Cannot step a Range by 0'));
  });

  it("when start < 0, end < 0, step != 0", function() {
  	var range = Immutable.Range(-10, -2, 2);
  	expect(range.toString()).toBe("Range [ -10...-2 by 2 ]");
  	expect(range.includes(-6)).toBeTruthy();
  	expect(range.includes(0)).toBeFalsy();
  });

  it("when start < 0, end >=0, step === undefined", function() {
    var range = Immutable.Range(-5, 5);
    expect(range.toString()).toBe("Range [ -5...5 ]");
    expect(range.includes(3)).toBeTruthy();
    expect(range.includes(-7)).toBeFalsy();
  });

  it("when start >= 0, end is undefined, step != 0", function() {
    var range = Immutable.Range(10,undefined,2);
    expect(range.toString()).toBe("Range [ 10...Infinity by 2 ]");
    expect(range.includes(12)).toBeTruthy();
    expect(range.includes(11)).toBeFalsy();
  });

  it("when start >=0, end < 0, step is undefined", function() {
    var range = Immutable.Range(10, -5);
    expect(range.toString()).toBe("Range [ 10...-5 ]");
    expect(range.includes(-4)).toBeTruthy();
    expect(range.includes(-6)).toBeFalsy();
  });

  it("when start >= 0, end >=0, step == 0", function() {
    expect( function() {var range = Immutable.Range(10, 100, 0);} ).toThrow(new Error("Cannot step a Range by 0"));
  });

  // Slice function
  it("when begin and end >= 0", function() {
    var range = Immutable.Range(0, 10, 2);
    var res = range.slice(1, 4);
    expect(res._start).toBe(2);
    expect(res._end).toBe(8);
    expect(res._step).toBe(2);
  });

  it("when begin and end are both undefined", function() {
    var range = Immutable.Range(0, 10, 2);
    var res = range.slice();
    expect(res._start).toBe(0);
    expect(res._end).toBe(10);
    expect(res._step).toBe(2);
  });

  it("when begin and end < 0", function() {
    var range = Immutable.Range(0, 10, 2);
    var res = range.slice(-1, -3);
    expect(res._start).toBe(0);
    expect(res._end).toBe(0);
    expect(res._step).toBe(1);
  });


  // INPUT SPACE CHARACTERISTIC TESTING : Range Constructor (start, end, step)
})
