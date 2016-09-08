/**
 * Created by Mani on 16-10-2015.
 */


'use strict';

angular.module('filter', ['ui.bootstrap'])
    .controller('filterCtrl', ['$scope','NVService', function ($scope, NVService) {
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
    }]).controller('filterIPCtrl',function($scope,NVService){
		$scope.type="";
		
		function setValues(fltr) {			
			$scope.fltr.value="";
			$scope.operators=[];
			$scope.valueList=""
			angular.forEach($scope.filters, function(filter,index){
				if(filter.value==fltr.name){
					$scope.type=filter.type;
					$scope.operators=NVService.getOperators(filter.type);	
					console.log(JSON.stringify($scope.operators));
					$scope.valueList = NVService.getList(fltr.name);
				}
			});				
		}
		$scope.setValues=setValues;
	})
    .directive('filters', function ($compile) {
        return {
            restrict:'E',
            replace:true,
            templateUrl:'components/filter/filter_tmpl.html'
        }
    }).directive('filterInput',function(){
		return {
			restrict:'E',
			templateUrl:'components/filter/filter_input_tmpl.html'
		}
	});