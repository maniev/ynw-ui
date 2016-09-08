/**
 * Created by Mani on 21-04-2016.
 */
define(['angular', '../providerModule', '../../core/byPassCompleteList',
    '../../core/main','../routeManager'], function (angular, providerModule, byPassUrlC, byPassUrlP) {
    return providerModule.controller('ProviderController', ['$location', '$scope', '$rootScope', '$log', 'Auth', 'LStore','UrlConstants','UrlService',
        function ($location, $scope, $rootScope, $log, Auth, lStore,urlConstants,urlService) {
            $log.info("ProviderController ...");
            var curUser = JSON.parse(lStore.get('ynw-provider'));
            $rootScope.activeUser=curUser;
            if (curUser == null) {
                if (byPassUrlC.indexOf($location.path()) == -1) {$location.path('/login');}
            } else{
              var credentials=JSON.parse(lStore.get('ynw-credentials'));
              if(credentials!=null){
                  urlService.post(urlConstants.PROVIDERLOGINURL, credentials).then(function (response) {
                     lStore.store('ynw-provider', JSON.stringify(response.data));
                      Auth.setUser(response.data);
                  }, function (response) {
                      $scope.loginError = response.data;
                      return false;
                  })
              } else{Auth.setUser(curUser);}
            }
            /**
             * Check whether a user logged in or not and call the corresponding pages
             */
            $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {
                if (!value) {
                    console.log("No Value Disconnect");
                    $scope.user = false;
                    $scope.userStatus = false;
                    if (byPassUrlC.indexOf($location.path()) == -1) {$location.path('/login');}
                } else if (value) {
                    urlService.get(urlConstants.ACCOUNTSCHEDULEURL).then(function (response) {
                        $rootScope.businessScheduleP=response.data;
                    })
                    $scope.user = value.userName;
                    $scope.userStatus = true;
                    $rootScope.activeUser=value;
                    $log.info("Active User :" + value.userName);
                    if (byPassUrlC.indexOf($location.path()) != -1) {$location.path('/home/waitlist');}
                }
            });
        }]);
});