describe("Range", function() {
  it("when start < 0, end >=0, step === undefined", function() {
    var range = Immutable.Range(-5, 5);
    expect(range.toString()).toBe("Range [ -5 ... 5 ]");

  });
})
