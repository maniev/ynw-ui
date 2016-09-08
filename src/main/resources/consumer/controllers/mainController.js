/**
 * Created by Mani on 21-04-2016.
 */
define(['angular', '../consumerModule', '../../core/byPassCompleteList','../../core/main','../routeManager'], 
  function (angular, consumerModule, byPassUrlC) {
    return consumerModule.controller('ConsumerController', ['$location', '$scope','$rootScope', '$log', 'Auth', 'LStore','UrlService','UrlConstants',
        function ($location, $scope,$rootScope, $log, Auth, lStore,urlService,urlConstants) {
            $log.info("Consumer Controller ...");
            /*For phone Gap*/
           /* var push = PushNotification.init({
                android: {
                  senderID: "751363753997"
                },
                ios: {
                  alert: "true",
                  badge: "true",
                  sound: "true"
                },
                windows: {}
              });
              push.on('registration', function(data) {
              // alert(data.registrationId);
               $rootScope.componentId=data.registrationId;
                $log.info("Id..."+ $rootScope.componentId);
             });
              push.on('notification', function(data) {
              });
              push.on('error', function(e) {
              });*/

            var curUser = JSON.parse(lStore.get('ynw-consumer'));
            $rootScope.activeUser=curUser;
            if (curUser == null) {
                if (byPassUrlC.indexOf($location.path()) == -1) {$location.path('/login');}
            } else{
              var credentials=JSON.parse(lStore.get('ynw-credentials'));
              if(credentials!=null){
                  urlService.post(urlConstants.CONSUMERLOGINURL, credentials).then(function (response) {
                     lStore.store('ynw-consumer', JSON.stringify(response.data));
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
                    $scope.user = value.userName;
                    $scope.userStatus = true;
                    $rootScope.activeUser=value;
                    $log.info("Active User :" + value.userName);
                    if (byPassUrlC.indexOf($location.path()) != -1) {$location.path('/home/dashboard');}
                }
            });
        }])
});