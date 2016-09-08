/**ur
 * Created by Mani on 01-05-2016.
 */
define(['../providerModule'], function (providerModule) {
    return providerModule.controller('BusinessProfileImgUpdateCtrl', ['$scope', '$timeout', '$element', 'UrlService', 'UrlConstants',
        'Constants', '$log','profileInfo','close', 'title',function ($scope, $timeout, $element, urlService, urlConstants, constants, $log, profileInfo, close, title) {
            $log.info('BusinessProfileImgUpdateCtrl');
            alert('BusinessProfileImgUpdateCtrl');
            var bp = this;
            bp.title = title;
                   
            bp.upload=function () {
                var fd = new FormData();
                console.dir(imageList);
                var propertyList={};
                propertyList.propertiesMap=propertyMap;
                angular.forEach(imageList,function (file,index) {
                    fd.append("files",file);
                })
                console.dir(JSON.stringify(propertyList));
                fd.append('properties', new Blob([JSON.stringify(propertyList)],{type: "application/json"}));
                urlService.postImageWithData(urlConstants.ACCOUNTGALLERYURL,fd).then(function(response){
                    $scope.success = true;
                    $scope.danger = false;
                    $scope.message = constants.IMAGE_UPLOAD_SUCCESS;
                     $timeout(function () {
                       $element.modal('hide');
                        close(null, 500)},3000);
                },function(response){
                    $scope.success = false;
                    $scope.danger = true;
                    $scope.message = response.data;
                });
            }
            bp.remove=function (imgIndex) {
                $('.preview'+imgIndex).remove();
                $scope.curLen-=1;
                imageList.splice(imgIndex,1);
                //propertiesList.splice(imgIndex,1);
            } 
            $scope.length=0;
            $scope.curLen=0;
            var imageList=[];
            var propertyMap=new Object(); 
           $scope.addImages=function () {
                var properties={"caption":"gallery"};                          
                $scope.length+=bp.myFiles.length; 
                angular.forEach(bp.myFiles,function (file) {
                    imageList.push(file);
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(e){     
                        $('.preview'+$scope.curLen).prepend('<img class="thumbnail" src="'+ e.target.result +  '"/>');
                        propertyMap[$scope.curLen]=properties;
                        $scope.curLen+=1;
                    } 
                })
           }
            $scope.range = function(min, max, step){
                step = step || 1;
                var input = [];
                for (var i = min; i < max; i += step) input.push(i);
                return input;
              };
            
    	   
	        $scope.close = function (result){
                close(result, 500);
            }	
	        
        }]);
});