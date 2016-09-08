/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./labelUpdateController'], function (providerModule) {
    return providerModule.controller('LabelViewCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log', '$stateParams','ModalService','$filter', function ($scope, urlService, urlConstants, constants, $log, $stateParams,modalService,$filter) {
            var lm = this;
            $log.info('Labels View Controller');
            var id=$stateParams.id;
            lm.options={
                formState: {
                    readOnly: true
                }
            };
            lm.labelInfo = {};
            alert(urlConstants.LABELSURL+"/"+id);
            urlService.get(urlConstants.LABELSURL+"/"+id).then(function (response) {
                lm.labelInfo=response.data;
                lm.labelInfo.createdDate=$filter('date')(response.data.createdDate, "dd-MMM-yyyy");
                lm.labelInfo.noOfCustomers=0;
            });
            lm.fields = [{
                "key": "label","type": "input","className":"col-md-3",
                "templateOptions": {"type": "text", "label": "Name"}
            },{
                "key": "createdDate","type": "input","className":"col-md-3",
                "templateOptions": {"type": "text", "label": "Created Date"}
            },{
                "key": "noOfCustomers","type": "input","className":"col-md-6",
                "templateOptions": {"type": "text", "label": "No. of Customers"}
            }]

           
            function updateLabel() {
                modalService.showModal({
                    templateUrl: "../provider/templates/label-create.html",
                    width: "70%",
                    controller: "LabelUpdateCtrl as nsc",
                    inputs:{
                        labelInfo:angular.copy(lm.labelInfo),
                        title:"Update Label"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.LABELSURL+"/"+id).then(function (response) {
                            lm.labelInfo=response.data;
                            lm.labelInfo.createdDate=$filter('date')(response.data.createdDate, "dd-MMM-yyyy");
                            lm.labelInfo.noOfCustomers=0;
                        });
                    });
                });
            }
            $scope.updateLabel=updateLabel;

        }]);
});