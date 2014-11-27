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
    .state('resume', {
      url: '/resume',
      templateUrl: '/js/views/resume.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: '/js/views/contact.html'
    });

    $urlRouterProvider.otherwise('/info');
}

angular
  .module('dbow')
  .config(DbowRoutes);
