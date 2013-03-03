describe("Unpakt.Utils.currencyFormat", function() {
  describe("given an integer", function(){
    it("returns a string with 2 places to right of decimal point", function(){
      expect(Unpakt.Utils.currencyFormat(25)).toEqual('25.00');
    });
  });

  describe("given a float with only 1 significant digit to right of dec point", function(){
    it("returns a string with 2 places to right of decimal point", function(){
      expect(Unpakt.Utils.currencyFormat(29.3)).toEqual('29.30');
    });
  });

  describe("given a float with 2 significant digit to right of dec point", function(){
    it("returns a string with 2 places to right of decimal point", function(){
      expect(Unpakt.Utils.currencyFormat(29.35)).toEqual('29.35');
    });
  });

  describe("given a float with more than 2 significant digits to right of dec point", function(){
    it("returns a string with 2 places to right of decimal point", function(){
      expect(Unpakt.Utils.currencyFormat(29.350563)).toEqual('29.35');
    });
  });

  describe("given a string that is parseable into a number", function(){
    it("returns a string with 2 places to right of decimal point", function(){
      expect(Unpakt.Utils.currencyFormat('25.2')).toEqual('25.20');
    });
  });
});