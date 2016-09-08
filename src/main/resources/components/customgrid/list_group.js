var nvGrid = angular.module('list-group', ['ngAnimate','time_counter']);
nvGrid.controller('ListGroupCtrl',ListGroupCtrl);
nvGrid.directive('apptGroup', function() {
	return {
		restrict: 'E',
		templateUrl: '../base/components/customgrid/appt_group_tmpl.html',
		scope : {title:'@', url : '@', type:'@'},
		replace : false,
		transclude : false,
		controller : ListGroupCtrl
	};
})
nvGrid.directive('providerGroup', function() {
	return {
		restrict: 'E',
		templateUrl: '../base/components/customgrid/provider_group_tmpl.html',
		scope : {title:'@', url : '@'},
		replace : false,
		transclude : false,
		controller : ListGroupCtrl
	};
})
nvGrid.directive('reserveGroup', function() {
	return {
		restrict: 'E',
		templateUrl: '../base/components/customgrid/reserv_group_tmpl.html',
		scope : {title:'@', url : '@', type:'@'},
		replace : false,
		transclude : false,
		controller : ListGroupCtrl
	};
})
nvGrid.directive('serviceGroup', function() {
	return {
		restrict: 'E',
		templateUrl: '../base/components/customgrid/service_group_tmpl.html',
		scope : {title:'@', url : '@', type:'@'},
		replace : false,
		transclude : false,
		controller : ListGroupCtrl
	};
})
function ListGroupCtrl($scope,NVService){
	NVService.getResourceFromUrl($scope.url).then(function(result){
		$scope.items=result.data.list;
		if($scope.type=='past')
			$scope.$parent.past_count=result.data.count;
		else if($scope.type=='upcoming')
			$scope.$parent.upcoming_count=result.data.count;
		else
			$scope.$parent.provider_count=result.data.count;
	});
}