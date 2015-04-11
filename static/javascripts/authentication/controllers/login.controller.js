/**
* LoginController
* @namespace myapp.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'Authentication', 'Facebook'];

  /**
  * @namespace LoginController
  */
  function LoginController($location, $scope, Authentication, Facebook) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.facebookReady = false;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf myapp.authentication.controllers.LoginController
    */
    function activate() {
      $scope.$watch(
        function() {
          return Facebook.isReady();
        },
        function(newVal) {
          if (newVal) {
            vm.facebookReady = true;
          }
        }
      );
    }

    /**
    * @name login
    * @desc Log the user in
    * @memberOf myapp.authentication.controllers.LoginController
    */
    function login() {
      Authentication.login();
    }

    /**
    * @name logout
    * @desc Log the user out
    * @memberOf myapp.authentication.controllers.LoginController
    */
    function logout() {
      Authentication.logout();
    }
  }
})();
