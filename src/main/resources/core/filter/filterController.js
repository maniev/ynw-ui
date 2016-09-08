/**
 * Created by Mani on 01-05-2016.
 */
define(['../coreModule',], function (coreModule) {
    return coreModule.controller('FilterCtrl', ['$scope','UrlService', 'UrlConstants',
        'Constants','$log', function ($scope, urlService, urlConstants, constants,$log) {
            $log.info('Filter Controller Started');
	        $scope.filterList=[];
            $scope.isCollapsed = false;
        
            /**
             * To add new filter dynamically
             */
            $scope.add = function(){
                if(isValid($scope.filterList))
                    $scope.filterList.push({"name":"","operator":"","value":""});
            }

            /**
             * To remove existing filter dynamically
             */
            $scope.remove = function(index){
                alert(index);
                $scope.filterList.splice(index,1);
            }

            /**
             * To apply filter
             */
            $scope.go= function () {
                if(isValid($scope.filterList))
                alert(JSON.stringify($scope.filterList));
            }

            /**
             * To check filter param valid or not
             */
            function isValid(list){
                var valid=true;
                if(list.length>0){
                    angular.forEach(list, function (lst) {
                        if (lst.name == '' || lst.operator == '' || lst.value == '') {
                            valid= false;
                        }
                    })
                }
                return valid;
            }
    }]);
});
