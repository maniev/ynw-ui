/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./vacationUpdateController'], function (providerModule) {
    return providerModule.controller('VacationViewCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log', '$stateParams','ModalService','$filter', function ($scope, urlService, urlConstants, constants, $log, $stateParams,modalService,$filter) {
            $log.info('Vacation View Controller');
            var lm = this;
            var id=$stateParams.id;
            lm.options={
                formState: {
                    readOnly: true
                }
            };
            lm.vacationInfo = {};
            urlService.get(urlConstants.VACATIONSURL+"/"+id).then(function (response) {
                lm.vacationInfo=response.data;
                lm.vacationInfo.startDate=$filter('date')(response.data.timespec.startDate, "dd-MMM-yyyy");
                lm.vacationInfo.endDate=$filter('date')(response.data.timespec.endDate, "dd-MMM-yyyy");
                lm.vacationInfo.noOfCustomers=0;
            });
            lm.fields = [{
                "key": "providerId","type": "input","className":"col-md-3",
                "templateOptions": {"type": "text", "label": "Staff Id"}
            },{
                "key": "startDate","type": "input","className":"col-md-3",
                "templateOptions": {"type": "text", "label": "Start date"}
            },{
                "key": "endDate","type": "input","className":"col-md-6",
                "templateOptions": {"type": "text", "label": "End date"}
            }]

           
            function updateVacation() {
                
                modalService.showModal({
                    templateUrl: "../provider/templates/vacation-create.html",
                    width: "70%",
                    controller: "VacationUpdateCtrl as nvc",
                    inputs:{
                        vacationInfo:angular.copy(lm.vacationInfo),
                        title:"Update Vacation"
                    }
                }).then(function (modal) {
                	
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.VACATIONSURL+"/"+id).then(function (response) {
                            lm.vacationInfo=response.data;
                            lm.vacationInfo.createdDate=$filter('date')(response.data.createdDate, "dd-MMM-yyyy");
                            
                            lm.vacationInfo.noOfCustomers=0;
                        });
                    });
                });
            }
            $scope.updateVacation=updateVacation;
        }]);
});