(function() {
'use strict';

angular.module('Common.navbar').controller("NavbarCtrl", NavbarCtrl);

NavbarCtrl.$inject=['$scope', '$location'];

function NavbarCtrl($scope, $location) {
   $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
   };
}
})();
