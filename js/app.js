'use strict';

/**
 * @ngInject
 */
function DbowConfig($locationProvider) {
  $locationProvider.html5Mode(true);
}

/**
 * @ngInject
 */
function DbowRun() {
}

angular
  .module('dbow', [
    'ui.router'
  ])
  .config(DbowConfig)
  .run(DbowRun);
