/**
 * Created by Mani on 25-04-2016.
 */
define(['../consumerModule','jquery'], function (consumerModule,$) {
    return consumerModule.controller('SrchCtrl', ['$log','$scope','$location','$rootScope',function ($log,$scope,$location,$rootScope) {
        $log.info("Resize Search Controller ...");
        var sc=this;
        $rootScope.home=true;
        $rootScope.search_top=false;
        $rootScope.logo=false;
        $scope.searchText=$rootScope.search;
        function search() {
            $rootScope.search=$scope.searchText;
            $location.path('/search/'+$scope.searchText);
        }
        sc.search=search;
     }]);
});