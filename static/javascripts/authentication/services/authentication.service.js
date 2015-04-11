/**
* Authentication
* @namespace myapp.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('myapp.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http', 'Facebook', 'localStorageService'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http, Facebook, localStorageService) {
    /**
    * @name Authentication
    * @desc The Factory to be returned
    */
    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
      unauthenticate: unauthenticate
    };

    return Authentication;

    ////////////////////

    /**
     * @name getAuthenticatedAccount
     * @desc Return the currently authenticated account
     * @returns {object|undefined} Account if authenticated, else `undefined`
     * @memberOf myapp.authentication.services.Authentication
     */
    function getAuthenticatedAccount() {
      if (!$localStorageService.get('token')) {
        return;
      }

      return JSON.parse(localStorageService.get('token'));
    }

    /**
     * @name isAuthenticated
     * @desc Check if the current user is authenticated
     * @returns {boolean} True is user is authenticated, else false.
     * @memberOf myapp.authentication.services.Authentication
     */
    function isAuthenticated() {
      return !!localStorageService.get('token');
    }

    /**
     * @name login
     * @desc Try to log in with email `email` and password `password`
     * @param {string} email The email entered by the user
     * @param {string} password The password entered by the user
     * @returns {Promise}
     * @memberOf myapp.authentication.services.Authentication
     */
    function login() {
      return Facebook.login(function(response) {}).then(loginSuccessFn, loginErrorFn);

      /**
       * @name loginSuccessFn
       * @desc Set the authenticated account and redirect to index
       */
      function loginSuccessFn(data, status, headers, config) {
        $http({method: 'GET', url: '/auth/convert-token', headers: {
            'Authorization': 'Bearer facebook ' + data.authResponse.accessToken}
        }).success(function(data, status, headers, config) {
          localStorageService.set('token', data);
        }).error(function(data, status, headers, config) {
          console.error('Did not covert token!');
        });
        window.location = '/';
      }

      /**
       * @name loginErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function loginErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }

    /**
     * @name logout
     * @desc Try to log the user out
     * @returns {Promise}
     * @memberOf myapp.authentication.services.Authentication
     */
    function logout() {
      Authentication.unauthenticate();

      window.location = '/';
    }

    /**
     * @name unauthenticate
     * @desc Delete the cookie where the user object is stored
     * @returns {undefined}
     * @memberOf myapp.authentication.services.Authentication
     */
    function unauthenticate() {
      localStorageService.remove('token');
    }

  }
})();
