/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('AddDelayCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log','title','close', '$timeout','$element',function ($scope, urlService, urlConstants, constants, $log, title, close,$timeout,$element) {
            $log.info('WaitList Create Controller');

            var wl = this;
            wl.title = title;
            wl.wlInfo = {};
            wl.checkedServicesList=[];
            wl.serviceDelays=[{"id":1,"name":"Service One","delay":30},{"id":2,"name":"Service Two","delay":20}]
            wl.fields=[
                {"className":"col-md-3","template":"<br/><p><b>Set Delay : </b></p>"},
                {"className":"col-md-2 ","key":"hours","type":"input","templateOptions":{"type":"number","pattern": "^[1-9][0-9]*$","label":"Hours"}},
                {"className":"col-md-2 ","key":"mins","type":"input","templateOptions":{"type":"number","pattern": "^[1-9][0-9]*$","label":"Minutes"}},
                {"template":"<div class='clearfix'></div>"},
                {"className":"col-md-12","key": "isSend", "type": "checkbox", "templateOptions": {"label": "Send message to current Waitlist customers"}},
                {"className":"col-md-12","key":"message","type": "textarea","templateOptions":{"rows":3},hideExpression: "!model.isSend"}
                ];

            wl.addToCheckedList=function (isServiceSelected, selectedServiceDelay) {
                var selectedIndex = wl.checkedServicesList.indexOf(selectedServiceDelay.name);//checking whether Day already selected
                if (selectedIndex == -1)
                  wl.checkedServicesList.push(selectedServiceDelay.name);
                else 
                  wl.checkedServicesList.splice(selectedIndex, 1);
                console.log(wl.checkedServicesList);
            }

            wl.selectAllToggle=function (isAllSelected) {
                wl.checkedServicesList=[];
                if(isAllSelected){                    
                    angular.forEach(wl.serviceDelays,function (service) {
                        wl.checkedServicesList.push(service.name);
                    });
                    console.log(wl.checkedServicesList);
                }
            }

            wl.submit = function () {
                urlService.post(urlConstants.LABELSURL+"/"+lm.labelInfo.label).then(function (response) {
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.LABEL_CREATE_SUCCESS;
                    lm.labelInfo={};
                }, function (response) {
                    $scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
                });
            }
            $scope.close = function (result) {
                 $timeout(function () {
                    $element.modal('hide');
                    close(null, 500)},500);
            }

        }]);
});