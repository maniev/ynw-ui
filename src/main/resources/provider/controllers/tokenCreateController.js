/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('TokenCreateCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log','title','close', 'width', '$timeout','$element',function ($scope, urlService, urlConstants, constants, $log, title, close, width, $timeout,$element) {
            $log.info('Token Create Controller');

            var wl = this;
            wl.title = title;
            wl.width=width;
            wl.services={}
            wl.customer={"name":"Mani","mobile":"9605551784","email":"manikandan@netvarth.com"}

            wl.customerfields=[
                {"className":"col-md-4","key":"name","type":"input","templateOptions":{"type":"text","label":"Name of the customer"}},
                {"className":"col-md-4","key":"mobile","type":"input","templateOptions":{"type":"text","label":"Mobile"}},
                {"className":"col-md-4","key":"email","type":"input","templateOptions":{"type":"text","label":"Email"}}];
            wl.customerfields.options={
              formState: {
                readOnly: true
              }
            };
            urlService.get(urlConstants.PROVIDERSERVICEURL).then(function(result){
                wl.services=result.data;
                wl.servicefields=[
                    {"className":"col-md-8","key":"service","type":"simple-select","templateOptions":{"label":"Service","ngOptions": "option[to.valueProp] as option in to.options","options":wl.services,
                        "valueProp":"id","labelProp":"name"}},
                    {"className":"col-md-4","key":"partysize","type":"input","templateOptions":{"type":"number","label":"Party Size"}},
                    {"className":"col-md-12","key":"notes","type":"textarea","templateOptions":{"rows":2, "label":"Notes"}}];
                wl.servicefields_RO=[
                    {"className":"col-md-12","key":"serviceduration","type":"input","templateOptions":{"type":"text","label":"Service Duration"}},
                    {"className":"col-md-12","key":"waitlistno","type":"input","templateOptions":{"type":"text","label":"Current No. of customer waitlisted"}},
                    {"className":"col-md-12","key":"waittime","type":"input","templateOptions":{"type":"text","label":"Approximate waiting time"}}];
                wl.servicefields_RO.options={
                  formState: {
                    readOnly: true
                  }
                };
            },function (response) {
                        
            });
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