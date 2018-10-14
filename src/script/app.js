var app = angular.module('myApp', ['ui.router','ngAnimate','ngCookies','angularFileUpload']);


app.run(['$rootScope', '$log', '$transitions', '$state','$cookies', function ($rootScope, $log, $transitions, $state,$cookies) {

    $transitions.onStart({to: '*'}, function (transition) {
        $rootScope.config = $cookies.getObject('config') ? $cookies.getObject('config') : null;
    });
    $rootScope.pageClass = '';
    $transitions.onSuccess({to: '*'}, function (transition) {
        $rootScope.title = transition.to().title;
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.pageClass = '';
    });

    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        $log.error('The request state was not found: ' + unfoundState);
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        $log.error('An error occurred while changing states: ' + error);

    });
}]);
