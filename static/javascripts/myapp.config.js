(function () {
  'use strict';

  angular
    .module('myapp.config')
    .config(config);

  config.$inject = ['$locationProvider', 'FacebookProvider'];

  /**
  * @name config
  * @desc Enable HTML5 routing
  */
  function config($locationProvider, $FacebookProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    var myAppId = '';
    $FacebookProvider.init(myAppId);
  }
})();
