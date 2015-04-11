(function () {
  'use strict';

  angular
    .module('myapp.authentication', [
      'myapp.authentication.controllers',
      'myapp.authentication.directives',
      'myapp.authentication.services'
    ]);

  angular
    .module('myapp.authentication.controllers', ['facebook']);

  angular
    .module('myapp.authentication.directives', []);

  angular
    .module('myapp.authentication.services', ['ngCookies', 'LocalStorageModule']);
})();
