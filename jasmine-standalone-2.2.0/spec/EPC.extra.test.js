describe('EPC-extra', function() {
  // EPC: [1,2,8]
  it("one of the object is null", function() {
    var val = Immutable.is(null, 2);
    expect(val).toBeFalsy();
  })
  // EPC: [1,2,3], [2,3,4], [3,4,9]
  it("2 functions, same value", function() {
  	var func = function(a, b){
  		return a+b;
  	};
  	var func2 = function(a, b){
  		return a+b;
  	}
  	expect(Immutable.is(func,func2).toBeTruthy();
  });

  it("1 function as both parameters", function() {
  	var func = function(a, b){
  		return a+b;
  	};
  	expect(Immutable.is(func,func).toBeTruthy();
  });

})
