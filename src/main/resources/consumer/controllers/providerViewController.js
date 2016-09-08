/**
 * Created by Mani on 01-05-2016.
 */
define(['../consumerModule','./addWLController'], function (consumerModule) {
    return consumerModule.controller('ConsumerProviderViewCtrl',['$scope','UrlService','UrlConstants','$log','ModalService','$stateParams', 
    	function ($scope,urlService,urlConstants,$log,modalService, $stateParams) {
        var src=this;
        src.serv={};
        var searchText=$stateParams.searchText;
        urlService.get(urlConstants.ACCOUNTURL+"/"+searchText+"/search").then(function (response) {
            //src.srList.push(response.data);
           var bpurl="http://ynw.youneverwait.com/"+response.data+"/businessProfile.json";
           var serviceurl="http://ynw.youneverwait.com/"+response.data+"/services.json";
            urlService.get(bpurl).then(function (response) {
                src.bp=response.data;
             //   src.bp={"businessName":"Anjali Beauty Care","address":"Edathala House, Guruvayur","place":"Guruvayur","providers":null,"serviceSector":{"id":1,"name":null,"serviceSubSectors":null},"serviceSubSector":{"id":1,"name":null},"licence":"FREE","logo":{"keyName":null,"caption":null,"prefix":null,"url":"http://ynw.youneverwait.com/9605551784/gallery/1468567656202.jpg"},"gallery":null,"businessDesc":"Facial, Bleaching, Bridal Makeup etc...","bSchedule":null,"primaryPhoneNo":9605551784,"secondaryPhoneNo":04872556388,"tertiaryPhoneNo":null,"status":"Active"};
            });
            urlService.get("http://ynw.youneverwait.com/" + response.data +"/gallery.json").then(function(result){
					$scope.photos=result.data;
			},function(response){
				$scope.gallery=null;
			})
            urlService.get(serviceurl).then(function (response) {               
                src.services=response.data;
                src.fields=[{"key":"service","type":"ui-select","templateOptions":{"label":"Select Service","ngOptions": "option[to.valueProp] as option in to.options","options":src.services,"valueProp":"id","labelProp":"name"}}]
            });
        },function (response) {
            alert(JSON.stringify(response));
        });
		// initial image index
		$scope._Index = 0;
		// if a current image is the same as requested image
		$scope.isActive = function (index) {
			return $scope._Index === index;
		};
		// show prev image
		$scope.showPrev = function () {
			$scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
		};
		// show next image
		$scope.showNext = function () {
			$scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
		};
		// show a certain image
		$scope.showPhoto = function (index) {
			$scope._Index = index;
		};

		$scope.showAddToWL=function (serviceInfo,providerInfo) {
			modalService.showModal({
                    templateUrl:"../consumer/templates/add-wl.html",
                    controller:"AddtoWLCtrl as wlac",
                    inputs:{
                        'title':'Add to Waitlist',
                        'serviceInfo':serviceInfo,
                        'providerInfo':providerInfo
                    }
            }).then(function(modal){
                modal.element.modal({backdrop: 'static',keyboard: false });
                modal.close.then(function(result) {

                });
            });
		}
    }]);
});