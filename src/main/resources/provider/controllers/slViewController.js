/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./slUpdateController'], function (providerModule) {
    return providerModule.controller('SLViewCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log', '$stateParams','ModalService',  function ($scope, urlService, urlConstants, constants, $log, $stateParams,modalService) {
            var lm = this;
            $log.info('Service Location View Controller');
            var id=$stateParams.id;
            lm.options={
                formState: {
                    readOnly: true
                }
            };
            lm.fields = [{
                "key": "location","type": "input","className":"col-md-3",
                "templateOptions": {"type": "text", "label": "Location Name"}
            }]

            lm.sLInfo = {};
            urlService.get(urlConstants.SLURL+"/"+id).then(function (response) {
                lm.sLInfo=response.data;
            });
           
            function updateSL() {
                modalService.showModal({
                    templateUrl: "../provider/templates/sl-create.html",
                    width: "70%",
                    controller: "SLUpdateCtrl as slc",
                    inputs:{
                        sLInfo:angular.copy(lm.sLInfo),
                        title:"Update Service Location"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.SLURL+"/"+id).then(function (response) {
                            lm.sLInfo=response.data;
                        });
                    });
                });
            }
            $scope.updateSL=updateSL;

        }]);
});