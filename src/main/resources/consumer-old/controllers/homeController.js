/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerHomeCtrl', ['$scope', '$rootScope','$state', '$location', function ($scope, $rootScope, $state, $location) {
        /*$scope.menus = [{
            "text": "My Appointments",
            "href": "home.appointments.upcoming",
            "root": "home.appointments"
        }, {"text": "My Providers", "href": "home.providers", "root": "home.providers"}];
        $scope.isActive = function (root) {
            return $state.includes(root);
        };*/

        $rootScope.home=false;
        $rootScope.search_top=false;
        $rootScope.logo=true;
        $scope.$location = $location;
    }]);
});