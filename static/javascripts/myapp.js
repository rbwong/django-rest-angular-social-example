(function () {
  'use strict';

  angular
    .module('myapp', [
      'myapp.config',
      'myapp.routes',
      'myapp.authentication',
    ]);

  angular
    .module('myapp.config', ['facebook']);

  angular
    .module('myapp.routes', ['ngRoute']);

  angular
    .module('myapp')
    .run(run);

  run.$inject = ['$http'];

  /**
  * @name run
  * @desc Update xsrf $http headers to align with Django's defaults
  */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }
})();
