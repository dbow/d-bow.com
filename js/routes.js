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
      url: '/instapoetry',
      templateUrl: '/js/views/instapoetry.html',
      onEnter: function() {
        if (window.instgrm &&
            window.instgrm.Embeds &&
            window.instgrm.Embeds.process) {
          window.setTimeout(function() {
            window.instgrm.Embeds.process();
          }, 100);
        }
      }
    });

    $urlRouterProvider.otherwise('/info');
}

angular
  .module('dbow')
  .config(DbowRoutes);
