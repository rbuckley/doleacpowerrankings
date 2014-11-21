describe('cbs API service', function() {
   var cbsAPI; 

   beforeEach(module('Doleac.cbsSportsAPI'));

   beforeEach(inject(function (_cbsAPI_) {
      cbsAPI = _cbsAPI_;
   }));

   it('test the tests', function() {
      cbsAPI.test().should.equal('hello api');
   });

   it('should be able to get the relevant info from the url', function() {
      var user_id = cbsAPI.getUserId();
      user_id.should.not.be.null; 
      cbsAPI.getLeagueId().should.not.be.null; 
   });

   describe('owners', function() {

      it('should be able to get a list of owners', function(done) {
         var promise = cbsAPI.getOwners();
         promise.should.be.fulfilled.and.notify(done);
      });
   });
});
