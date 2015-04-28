describe('EPC-extra', function() {
  it("one of the object is null", function() {
    var val = Immutable.is(null, 2);
    expect(val).toBeFalsy();
  })
  
  it("function values", function() {
  	var func = function(a, b){
  		return a+b;
  	};
  	var func2 = function(a, b){
  		return a+b;
  	}
  	expect(Immutable.is(func,func2).toBeTruthy();
  });

  it("function values", function() {
  	var func = function(a, b){
  		return a+b;
  	};
  	expect(Immutable.is(func,func).toBeTruthy();
  });

})
