describe('EPC-extra', function() {

  // EPC: [1,2,8]
  it("one of the object is null", function() {
    var val = Immutable.is(null, 2);
    expect(val).toBeFalsy();
  });
<<<<<<< HEAD
})
=======

  // EPC: [1,2,3], [2,3,4], [3,4,9]
  it("2 Equal Ranges", function() {
  	var ran = Immutable.Range(1, 10, 1);
  	var ran2 = Immutable.Range(1, 10, 1);
  	expect(Immutable.is(ran, ran2)).toBeTruthy();
  });

  // EPC: [1,2,3], [2,3,4], [3,4,5], [4,5,10]
  it("1 valid Range, 1 undefined", function() {
  	var ran = Immutable.Range(1, 10, 1);
  	var ran2 = Immutable.Range(1, undefined, 1);
  	expect(Immutable.is(ran, ran2)).toBeFalsy();
  });

  // EPC: [1,2,3], [2,3,6], [3,6,8]
  it("2 values, not equal", function() {
  	var a = 1; var b = 2;
  	expect(Immutable.is(a, b)).toBeFalsy();
  });

});
>>>>>>> origin/master
