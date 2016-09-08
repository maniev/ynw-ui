 /**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./vacationCreateController'], function (providerModule) {
    return providerModule.controller('VacationsCtrl', ['$scope','$rootScope','UrlService', 'UrlConstants',
        'Constants','$log', 'ModalService', function ($scope, $rootScope, urlService, urlConstants, constants,$log, modalService) {
            $log.info('Vacations Controller Started');
            $scope.vacations = [];
            urlService.get(urlConstants.VACATIONSURL).then(function (result) {
                var tempVcList = result.data;
                angular.forEach(tempVcList, function (vc) {
                    vc.timespec.endDate = $filter('date')(vc.timespec.endDate, "dd-MM-yyyy");
                    vc.timespec.startDate = $filter('date')(vc.timespec.startDate, "dd-MM-yyyy");
                    $scope.vacations.push(vc);      
                    
                })
                $scope.vacations =tempVcList;  
            }) 

            function newVacation() {
                modalService.showModal({
                    templateUrl: "../provider/templates/vacation-create.html",
                    width: "70%",
                    controller: "VacationCreateCtrl as nvc",
                    inputs:{
                        title:"Create Unavailability"
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.VACATIONSURL).then(function (result) {
                            $scope.vacations = result.data;
                        })
                    });
                });
            }
            function deleteVacation(id,index){
                var status=confirm("Do you want to delete this vacation? : " + id);
                if(status){
                    urlService.deleteR(urlConstants.VACATIONSURL + '/'+ id).then(function(result){
                        $scope.vacations.splice(index, 1);     
                        alert("vacation  deleted");
                    })   
                }       
            }
            $scope.createVacation = newVacation;
            $scope.deleteVacation = deleteVacation;
    }]);
});