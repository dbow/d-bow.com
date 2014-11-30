'use strict';

/**
 * @ngInject
 */
function MainCtrl($scope, $http, $sce, $state) {
  $http
    .get('/posts')
    .success(function(data, status, headers, config) {
      var posts = _.map(data.posts, function(post) {
        return {
          'title': post.title,
          'link': post['post_url'],
          'body': $sce.trustAsHtml(post.body)
        }
      });
      $scope.posts = posts;
    })
    .error(function(data, status, headers, config) {
      // TODO(dbow): Handle error.
    });

  $http
    .get('/instapoems')
    .success(function(data, status, headers, config) {
      var poems = _.map(data.poems, function(poem) {
        poem = angular.fromJson(poem);
        var getLink = /\/\/instagram.com\/p\/([A-Za-z0-9_\-]+)\//;
        return {
          'drop': poem.title[0],
          'title': poem.title.slice(1),
          'thumbnail': poem.thumbnail_url,
          'link': getLink.exec(poem.html)[1]
        };
      });
      $scope.poems = poems;
    })
    .error(function(data, status, headers, config) {
      // TODO(dbow): Handle error.
    });
}

angular
  .module('dbow')
  .controller('MainCtrl', MainCtrl);
