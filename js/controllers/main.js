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

      var poems = _.map(data.poems, function(poem) {
        var link = poem.url;
        poem = angular.fromJson(poem.content);
        return {
          'drop': poem.title[0],
          'title': poem.title.slice(1),
          'thumbnail': poem.thumbnail_url,
          'link': link
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
