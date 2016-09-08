/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./sgUpdateController'], function (providerModule) {
    return providerModule.controller('SGViewCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log', '$stateParams','ModalService',  function ($scope, urlService, urlConstants, constants, $log, $stateParams,modalService) {
            var lm = this;
            $log.info('Service Group View Controller');
            var id=$stateParams.id;
            lm.options={
                formState: {
                    readOnly: true
                }
            };
           

            lm.sGInfo = {};
            urlService.get(urlConstants.PROVIDERSERVICEGROUPURL+"/"+id).then(function (response) {

                lm.sGInfo=response.data;
            });

            lm.fields = [{
                "key": "name","type": "input","className":"col-md-3",
                "templateOptions": {"type": "text", "label": "Group Name"}
            }]
            
            function updateSG() {
                modalService.showModal({
                    templateUrl: "../provider/templates/sg-create.html",
                    width: "70%",
                    controller: "SGUpdateCtrl as sgc",
                    inputs:{
                        sGInfo:angular.copy(lm.sGInfo),
                        title:"Update Service Group"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.PROVIDERSERVICEGROUPURL+"/"+id).then(function (response) {
                            lm.sGInfo=response.data;
                        });
                    });
                });
            }
            $scope.updateSG=updateSG;

        }]);
});