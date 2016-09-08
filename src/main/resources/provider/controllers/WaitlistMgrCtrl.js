/**
 * Created by Mani on 01-05-2016.
 */
 define(['../providerModule'], function (providerModule) {
    return providerModule.controller('WaitlistMgrCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log', function ($scope, urlService, urlConstants, constants,$log) {
            $log.info('wm started');
            var wm = this;
             wm.wmInfo = {};
            wm.fields=[
                    {"className":"col-md-12",
                    "fieldGroup":[
                        {"key":"isWaitListEnabled","type":"radioType","templateOptions":{"options":[{"name":"Yes","value":"yes"},{"name":"No","value":"no"}],"label":"Waitlist enabled","required":true}}
                    ]},

                    {"className":"col-md-12",
                    "fieldGroup":[
                        {"key":"isPartySizeApl","type":"radioType","templateOptions":{"options":[{"name":"Yes","value":"yes"},{"name":"No","value":"no"}],"label":"Is party size applicatble for your business?","required":true}}
                    ]},
                    {"className":"col-md-7","key":"maxPartySize","type":"input","templateOptions": {"type":"input","label":"Maximum party size","required":true}},
                    {"className":"col-md-7","key":"requestTime","type":"input","templateOptions":{"type":"input","label":"Last online waitlist request time","required":true}},
                    {"className":"col-md-12",
                    "fieldGroup":[
                        {"key":"waitingTimeCalc","type":"radioType","templateOptions":{"options":[{"name":"Yes","value":"Yes"},{"name":"No","value":"No"}],"label":"Consider party size for waiting time calculation","required":true}}
                    ]},
                    {"className":"col-md-8","key":"maxCustomers","type":"input","templateOptions":{"type":"text","label":"Number of simultaneous customers","required":true}}
            ]

            wm.submit=function(){
              alert(JSON.stringify(wm.wmInfo));
            }
          $scope.close = function(result){
                close(result,500);
            }
    }]);
});
