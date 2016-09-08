/**
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule','./aptUpdateController'], function (providerModule) {
    return providerModule.controller('AptViewCtrl', ['$scope', 'UrlService', 'UrlConstants',
        'Constants', '$log', '$stateParams','ModalService',  function ($scope, urlService, urlConstants, constants, $log, $stateParams,modalService) {
	      var av = this;
        $log.info('AppoinmentSetting View Controller');
        var id=$stateParams.id;
        
        av.options={
          formState: {
            readOnly: true
          }
        };

        av.appointmentConfig={};
       urlService.get(urlConstants.ACCOUNTPROFILEURL).then(function (result) {
          
          av.appointmentConfig=result.data;
           av.fields=[{"className":"col-sm-4","template":"<div>Minimum appointment duration(in minutes)</div>"},
                     {"key":"minApmtTime","type":"input","templateOptions":{"type":"text"}},
                     {"className":"col-sm-4","template":"<div>Minimum days before one can book appointment</div>"},
                     {"key":"minLeadTimeOnline","type":"input","templateOptions":{"type":"text"}},
                     {"className":"col-sm-4","template":"<div>Maximum days before one can book appointment</div>"},
                     {"key":"onlineFutureTime","type": "input","templateOptions":{"type":"text"}}                    
            		]
        });
              
             function updateapt() {
                modalService.showModal({
                    templateUrl: "../provider/templates/apt-create.html",
                    width: "70%",
                    controller: "AptUpdateCtrl as au",
                    inputs:{
                        title:"Appointment Settings",
                        appointmentConfig:angular.copy(av.appointmentConfig)
                    }
                }).then(function (modal) {
                    modal.element.modal({backdrop: 'static', keyboard: false});
                    modal.close.then(function (result) {
                        urlService.get(urlConstants.ACCOUNTPROFILEURL).then(function (result) {
                          av.appointmentConfig=result.data;
                        });   
                    });
                });
            }
            $scope.updateapt=updateapt;

       }]);

 });
	
   	