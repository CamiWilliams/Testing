describe('EPC-extra', function() {

  // (1,2,8)
  it("one of the object is null", function() {
    var val = Immutable.is(null, 2);
    expect(val).toBeFalsy();
  });

  // EPC: [1,2,3], [2,3,4], [3,4,9]
  it("2 Equal Ranges", function() {
  	var ran = Immutable.Range(1, 10, 1);
  	var ran2 = Immutable.Range(1, 10, 1);
  	expect(Immutable.is(ran, ran2)).toBeTruthy();
  });

  // (1,2,3) (2,3,4) (3,4,5) (4,5,6) (5,6,11)
  it("both repesent the same map", function() {
    var a = Immutable.Map({1: 'a', 2: 'b'});
    var b = Immutable.Map({1: 'a', 2: 'b'});
    expect(Immutable.is(a, b)).toBeTruthy();
  });

  // (5,6,12)
  it("each repesents different map", function() {
    var a = Immutable.Map({1: 'a', 2: 'b'});
    var b = Immutable.Map({1: 'a', 3: 'b'});
    expect(Immutable.is(a, b)).toBeFalsy();
  });

  // (3,4,9)
  it("same dates", function() {
    var date1 = new Date(1234567890000);
    var date2 = new Date(1234567890000);
    expect(Immutable.is(date1, date2)).toBeTruthy();
  });

  // (4,5,10)
  it("different dates", function() {
    var date1 = new Date(1234567890000);
    var date2 = new Date(0);
    expect(Immutable.is(date1, date2)).toBeFalsy();
  })

  // (2,3,6) (3,6,11)
  it("both repesent the same map, reset valueOf", function() {
    var a = Immutable.Map({1: 'a', 2: 'b'});
    var b = Immutable.Map({1: 'a', 2: 'b'});
    a.valueOf = 1;
    b.valueOf = 2;
    expect(Immutable.is(a, b)).toBeTruthy();
  });

  // (3,6,12)
  it("each repesents different map, reset valueOf", function() {
    var a = Immutable.Map({1: 'a', 2: 'b'});
    var b = Immutable.Map({1: 'a', 3: 'b'});
    a.valueOf = 1;
    b.valueOf = 2;
    expect(Immutable.is(a, b)).toBeFalsy();
  });
});
