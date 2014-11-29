'use strict';

/**
 * @ngInject
 */
function MainCtrl($scope, $http, $sce, $state) {
  $http
    .get('/posts')
    .success(function(data, status, headers, config) {
      var posts = _.map(data.posts, function(post) {
        return $sce.trustAsHtml(
          '<h2>' + post.title + '</h2>' + post.body);
      });
      $scope.posts = posts;
    })
    .error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  $http
    .get('/instapoems')
    .success(function(data, status, headers, config) {
      var poems = _.map(data.poems, function(poem) {
        return $sce.trustAsHtml(angular.fromJson(poem).html);
      });
      $scope.poems = poems;
    })
    .error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  $scope.viewingInstapoetry = function() {
    return $state.is('instapoetry');
  };
}

angular
  .module('dbow')
  .controller('MainCtrl', MainCtrl);
