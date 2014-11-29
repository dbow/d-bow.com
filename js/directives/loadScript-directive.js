/**
 * @ngInject
 */
function LoadScript() {
  return {
    restrict: 'E',
    template: '<script></script>',
    replace: true,
    link: function () {
    }
  };
}

angular
  .module('dbow')
  .directive('loadScript', LoadScript);

