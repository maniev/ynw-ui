/**
 * Created by Mani on 25-04-2016.
 */
define(['../consumerModule','jquery'], function (consumerModule,$) {
    return consumerModule.controller('SrchResultCtrl', ['$log','$scope','$location','UrlService','UrlConstants','$rootScope','$stateParams',
        function ($log,$scope,$location,urlService,urlConstants,$rootScope,$stateParams) {
        $log.info("Search Result Controller ...");
        var src=this;
        src.serv={};
        $rootScope.home=false;
        $rootScope.search_top=true;
        $rootScope.logo=true;
        var searchText=$stateParams.searchText;
        urlService.get(urlConstants.ACCOUNTURL+"/"+searchText+"/search").then(function (response) {
            //src.srList.push(response.data);
           var bpurl="http://ynw.youneverwait.com/"+response.data+"/businessProfile.json";
           var serviceurl="http://ynw.youneverwait.com/"+response.data+"/services.json";
            urlService.get(bpurl).then(function (response) {
                src.bp=response.data;
             //   src.bp={"businessName":"Anjali Beauty Care","address":"Edathala House, Guruvayur","place":"Guruvayur","providers":null,"serviceSector":{"id":1,"name":null,"serviceSubSectors":null},"serviceSubSector":{"id":1,"name":null},"licence":"FREE","logo":{"keyName":null,"caption":null,"prefix":null,"url":"http://ynw.youneverwait.com/9605551784/gallery/1468567656202.jpg"},"gallery":null,"businessDesc":"Facial, Bleaching, Bridal Makeup etc...","bSchedule":null,"primaryPhoneNo":9605551784,"secondaryPhoneNo":04872556388,"tertiaryPhoneNo":null,"status":"Active"};
            });
            urlService.get(serviceurl).then(function (response) {               
                src.services=response.data;
                src.fields=[{"key":"service","type":"ui-select","templateOptions":{"label":"Select Service","ngOptions": "option[to.valueProp] as option in to.options","options":src.services,"valueProp":"id","labelProp":"name"}}]
            });
        },function (response) {
            alert(JSON.stringify(response));
        });
     }]);
});