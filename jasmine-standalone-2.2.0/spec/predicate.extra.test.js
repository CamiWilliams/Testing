// Extra: RACC coverage for is() method

describe("ImmutableIsFunction", function() {

  //--------------------------------------------------------------------------------
  //   3 Clauses: if (valueA === valueB || (valueA !== valueA && valueB !== valueB))
  //                          A                     B                  C
  //--------------------------------------------------------------------------------
    //   Major is A
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  T
    //   T  |  F  |  T  |  T
    //   T  |  F  |  F  |  T   <----
    //   F  |  T  |  T  |  T
    //   F  |  T  |  F  |  F
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F
    it("returns true if both objects are equal", function() {
      var val = Immutable.is(4, 4);
      expect(val).toBeTruthy();
    });

    //   Major is A
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  T
    //   T  |  F  |  T  |  T
    //   T  |  F  |  F  |  T
    //   F  |  T  |  T  |  T
    //   F  |  T  |  F  |  F
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F   <----
    it("returns false if one object is a string and the other is a number of the same value", function() {
      var val = Immutable.is(8, "8");
      expect(val).toBeFalsy();
    });

    //   Major is B
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  T
    //   T  |  F  |  T  |  T
    //   T  |  F  |  F  |  T
    //   F  |  T  |  T  |  T
    //   F  |  T  |  F  |  F   <----
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F
    it("returns false if one object is NaN and the other is a number", function() {
      var val = Immutable.is(NaN, 15);
      expect(val).toBeFalsy();
    });

    //   Major is B
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  T
    //   T  |  F  |  T  |  T
    //   T  |  F  |  F  |  T
    //   F  |  T  |  T  |  T
    //   F  |  T  |  F  |  F
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F   <----
    it("returns false both objects are different", function() {
      var val = Immutable.is(16, 23);
      expect(val).toBeFalsy();
    });

    //   Major is C
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  T
    //   T  |  F  |  T  |  T
    //   T  |  F  |  F  |  T
    //   F  |  T  |  T  |  T
    //   F  |  T  |  F  |  F
    //   F  |  F  |  T  |  F   <----
    //   F  |  F  |  F  |  F
    it("returns false one object is a string and the other is NaN", function() {
      var val = Immutable.is("42", NaN);
      expect(val).toBeFalsy();
    });

    //   Major is C
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  T
    //   T  |  F  |  T  |  T
    //   T  |  F  |  F  |  T
    //   F  |  T  |  T  |  T
    //   F  |  T  |  F  |  F
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F   <----
    it("returns false both objects are of the same type but different values", function() {
      var val = Immutable.is("Lost", "is great");
      expect(val).toBeFalsy();
    });

  //--------------------------------------
  //   2 Clauses:  if (!valueA || !valueB)
  //                      A          B
  //--------------------------------------
    //   Major is A
    //   A  |  B  |  P
    //------------------
    //   T  |  T  |  F  <----
    //   T  |  F  |  T
    //   F  |  T  |  T
    //   F  |  F  |  T
    it("returns false if one of the objects is true, the other is 1", function() {
      var val = Immutable.is(true, 1);
      expect(val).toBeFalsy();
    });

    //   Major is A
    //   A  |  B  |  P
    //------------------
    //   T  |  T  |  F
    //   T  |  F  |  T
    //   F  |  T  |  T  <----
    //   F  |  F  |  T
    it("returns false if one of the objects is false, the other is 1", function() {
      var val = Immutable.is(false, 1);
      expect(val).toBeFalsy();
    });

    //   Major is B
    //   A  |  B  |  P
    //------------------
    //   T  |  T  |  F
    //   T  |  F  |  T
    //   F  |  T  |  T
    //   F  |  F  |  T  <----
    it("returns false if one is 0, and the other is false", function() {
      var val = Immutable.is(0, false);
      expect(val).toBeFalsy();
    });

    //   Major is B
    //   A  |  B  |  P
    //------------------
    //   T  |  T  |  F
    //   T  |  F  |  T
    //   F  |  T  |  T  <----
    //   F  |  F  |  T
    it("returns false if one of the objects is 0, the other is true", function() {
      var val = Immutable.is(0, true);
      expect(val).toBeFalsy();
    });

  //--------------------------------------------------------------------------------
  //   2 Clauses:  if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function')
  //                                      A                               B
  //--------------------------------------------------------------------------------
    //   Major is A
    //   A  |  B  |  P
    //------------------
    //   T  |  T  |  T  <----
    //   T  |  F  |  F
    //   F  |  T  |  F
    //   F  |  F  |  F
    it("returns false if one of the objects is a function, the other is a function returning the same thing", function() {
      var valueA = 3;
      var valueB = 4;
      var val = Immutable.is(valueA, valueB);
      expect(val).toBeFalsy();
    });

    //   Major is A
    //   A  |  B  |  P
    //------------------
    //   T  |  T  |  T
    //   T  |  F  |  F
    //   F  |  T  |  F  <----
    //   F  |  F  |  F
    it("returns false if one of the objects is a number and the other is a function", function() {
      var valueA = 1;
      var valueB = function() {return true;};
      valueA.valueOf = 1;
      var val = Immutable.is(1, valueB);
      expect(val).toBeFalsy();
    });

    //   Major is B
    //   A  |  B  |  P
    //------------------
    //   T  |  T  |  T
    //   T  |  F  |  F
    //   F  |  T  |  F  <----
    //   F  |  F  |  F
    it("returns false if one of the objects is a string and the other is a function", function() {
      var valueB = 0;
      valueB.equals = function() {return "4 8 15 16 23 42";};
      var val = Immutable.is("4 8 15 16 23 42", valueB);
      expect(val).toBeFalsy();
    });

    //   Major is B
    //   A  |  B  |  P
    //------------------
    //   T  |  T  |  T
    //   T  |  F  |  F
    //   F  |  T  |  F
    //   F  |  F  |  F  <----
    it("returns false if neither are a function and they are not equal to each other", function() {
      var val = Immutable.is("hello world", true);
      expect(val).toBeFalsy();
    });

  //----------------------------------------------------------------------------------------------------------------------
  //   3 Clauses: if (typeof valueA.equals === 'function' && typeof valueB.equals === 'function' && valueA.equals(valueB))
  //                                        A                                      B                             C
  //----------------------------------------------------------------------------------------------------------------------
    //   Major is A
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T  <----
    //   T  |  T  |  F  |  F
    //   T  |  F  |  T  |  F
    //   T  |  F  |  F  |  F
    //   F  |  T  |  T  |  F
    //   F  |  T  |  F  |  F
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F
    it("returns true both objects are equal functions", function() {
      var valueB = 0;
      valueB.equals = function() {return 1;};
      var valueA = valueB;
      var val = Immutable.is(valueA, valueB);
      expect(val).toBeTruthy();
    });

    //   Major is A
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  F
    //   T  |  F  |  T  |  F
    //   T  |  F  |  F  |  F
    //   F  |  T  |  T  |  F  <----
    //   F  |  T  |  F  |  F
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F
    it("returns true if an object of type function return value and a number are equal", function() {
      var valueB = 1;
      valueB.equals = function() {return 1;};
      var val = Immutable.is(1, valueB);
      expect(val).toBeTruthy();
    });

    //   Major is B
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  F  <----
    //   T  |  F  |  T  |  F
    //   T  |  F  |  F  |  F
    //   F  |  T  |  T  |  F
    //   F  |  T  |  F  |  F
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F
    it("returns false you have two objects of type functions that are not equal", function() {
      var valueB = 1;
      valueB.equals = function() {return 1;};
      var valueA = 0;
      valueA.equals = function() {return 1;};

      var val = Immutable.is(valueA, valueB);
      expect(val).toBeFalsy();
    });

    //   Major is B
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  F
    //   T  |  F  |  T  |  F
    //   T  |  F  |  F  |  F  <----
    //   F  |  T  |  T  |  F
    //   F  |  T  |  F  |  F
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F
    it("returns false you have one objects of type function and one boolean that are both true", function() {
      var valueB = 1;
      valueB.equals = function() {return true;};

      var val = Immutable.is(valueB, true);
      expect(val).toBeFalsy();
    });

    //   Major is C
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  F
    //   T  |  F  |  T  |  F
    //   T  |  F  |  F  |  F
    //   F  |  T  |  T  |  F  <----
    //   F  |  T  |  F  |  F
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F
    it("returns false you have one objects of type function but with equal value", function() {
      var valueB = 1;
      valueB.equals = function() {return 'a';};

      var val = Immutable.is(valueB, 'a');
      expect(val).toBeFalsy();
    });

    //   Major is C
    //   A  |  B  |  C  |  P
    //-----------------------
    //   T  |  T  |  T  |  T
    //   T  |  T  |  F  |  F
    //   T  |  F  |  T  |  F
    //   T  |  F  |  F  |  F
    //   F  |  T  |  T  |  F
    //   F  |  T  |  F  |  F  <----
    //   F  |  F  |  T  |  F
    //   F  |  F  |  F  |  F
    it("returns false you have one objects of type function and one of NaN", function() {
      var valueB = 1;
      valueB.equals = function() {return true;};

      var val = Immutable.is(valueB, NaN);
      expect(val).toBeFalsy();
    });

});
