/**
 * Created by Mani on 21-04-2016.
 */
define(['angular', '../consumerModule', '../../core/byPassCompleteList',
    '../../core/byPassPartialList',
    '../../core/main',
    '../routeManager'], function (angular, consumerModule, byPassUrlC, byPassUrlP) {
    return consumerModule.controller('ConsumerController', ['$location', '$scope','$rootScope', '$log', 'Auth', 'LStore',
        function ($location, $scope,$rootScope, $log, Auth, lStore) {
            $log.info("Consumer Controller ...");
            $rootScope.home=false;
            $rootScope.search_top=false;
            $rootScope.logo=false;
            $scope.srch={};
            if($location.path()=='/'){
               $rootScope.home=true;
            }
            var curUser = JSON.parse(lStore.get('user'));
            $rootScope.activeUser=curUser;
            var curRole = null;
            if (curUser == null) {
                if (byPassUrlC.indexOf($location.path()) != -1) {
                    var terminateLoop = false;
                    angular.forEach(function (byPassUrlP, urlp) {
                        if ($location.path().indexOf(urlp) != -1) {
                            terminateLoop = true;
                        }
                    });
                    if (terminateLoop)
                        $location.path('/');
                }
            } else
                Auth.setUser(curUser);
            /**
             * Check whether a user logged in or not and call the corresponding pages
             */
            $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {
                if (!value) {
                    console.log("No Value Disconnect");
                    $scope.user = false;
                    $scope.userStatus = false;
                    if($location.path()=='/')
                        $scope.home=true;
                    //if($location.path()!="/login" && $location.path().indexOf("/resetConsumer")==-1 && $location.path().indexOf("/resetProvider")==-1){$location.path('/');}
                } else if (value) {
                    console.log("Value exists");
                    $scope.user = value.userName;
                    $scope.userStatus = true;
                    $rootScope.activeUser=value;
                    $log.info("Active User :" + value.userName);
                    if ($location.path() == "/" || $location.path() == "" || $location.path() == "/login")
                    $location.path('/home/appointments/upcoming');
                }
            });

            function search() {
                $rootScope.home=false;
                $rootScope.search_top=true;
                $rootScope.logo=true;
                console.log($scope.srch.searchtext);
                $rootScope.searchtext = $scope.srch.searchtext;
                $location.path('/search/'+$scope.srch.searchtext);

            }

            $scope.search=search;
        }])
});