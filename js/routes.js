'use strict';

/**
 * @ngInject
 */
function DbowRoutes($stateProvider) {
  $stateProvider
    .state('about', {
      templateUrl: '/js/views/about.html'
    })
    .state('projects', {
      templateUrl: '/js/views/projects.html'
    })
    .state('resume', {
      templateUrl: '/js/views/resume.html'
    })
    .state('contact', {
      templateUrl: '/js/views/contact.html'
    });
}

angular
  .module('dbow')
  .config(DbowRoutes);
