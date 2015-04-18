describe("Range", function() {
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
    var range = Immutable.Range(-5, 5,undefined);
    expect(range.toString()).toBe("Range [ -5...5 ]");

  });
})
