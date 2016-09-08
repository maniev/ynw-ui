/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule'], function (consumerModule) {
    return consumerModule.controller('ConsumerHomeCtrl', ['$scope', '$rootScope','$state', '$location', function ($scope, $rootScope, $state, $location) {
        $scope.$location = $location;
    }]);
});