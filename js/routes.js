'use strict';

/**
 * @ngInject
 */
function DbowRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('info', {
      url: '/info',
      templateUrl: '/js/views/info.html'
    })
    .state('work', {
      url: '/work',
      templateUrl: '/js/views/work.html'
    })
    .state('writing', {
      url: '/writing',
      templateUrl: '/js/views/writing.html'
    })
    .state('instapoetry', {
      url: '/instapoetry'
    });

    $urlRouterProvider.otherwise('/info');
}

angular
  .module('dbow')
  .config(DbowRoutes);
