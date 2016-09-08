/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./labelCreateController'], function (providerModule) {
    return providerModule.controller('LabelsCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log', 'ModalService','$filter', function ($scope, urlService, urlConstants, constants, $log, modalService,$filter) {
            $log.info('Labels List Controller');
            $scope.labels = {};
            urlService.get(urlConstants.LABELSURL).then(function (result) {
                $scope.labels = result.data;
            })
            function newLabel() {
                modalService.showModal({
                    templateUrl: "../provider/templates/label-create.html",
                    width: "70%",
                    controller: "LabelCreateCtrl as nsc",
                    inputs :{
                        title:"Assign Label"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.LABELSURL).then(function (result) {
                            $scope.labels = result.data;
                        })
                    });
                });
            }
            function deleteLabel(id,index){
                var status=confirm("Do you want to delete this label? : " + id);
                if(status){
                    urlService.deleteR(urlConstants.LABELSURL + '/'+ id).then(function(result){
                        $scope.labels.splice(index, 1);     
                        alert("label  deleted");
                    })   
                }       
            }
            $scope.createLabel = newLabel;
            $scope.deleteLabel = deleteLabel;
        }]);
});