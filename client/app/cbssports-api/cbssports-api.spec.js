describe('cbs API service', function() {
   var cbsAPI; 

   beforeEach(module('Doleac.cbsSportsAPI'));

   beforeEach(inject(function (_cbsAPI_) {
      cbsAPI = _cbsAPI_;
   }));

   it('should be able to get the relevant info from the url', function() {
      expect(true).to.be.true;
   });

   describe('owners', function() {
      it('should have a getOwners function', function() {
         expect(angular.isFunction(cbsAPI.getOwners)).to.be.true;
      });
   });

});
