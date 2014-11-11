'use strict';

/**
 * @ngInject
 */
function DbowConfig() {
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
