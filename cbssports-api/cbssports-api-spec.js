describe('cbsAPI', function() {

  beforeEach(module('DoleacPowerRankings'));
   
  it('should contain a cbsAPI service',
     inject(function(cbsAPI) {
        expect(cbsAPI).no.to.equal(null);
  }));

});
