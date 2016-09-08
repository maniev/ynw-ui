var nvGrid = angular.module('nvGrid', ['ngGrid']);

/**
 * Directive to implement a grid accepts the parameters items, cols, selectedItems, customOptions and actions
 * items -- grid column values
 * cols -- grid columns
 * selectedItems -- used for getting selected values
 * customOptions --  we can add custom options
 * actions -- grid page tool bar items object
 */
nvGrid.directive('nvGrid', function($compile) {
	return {
		restrict: 'E',
		templateUrl: 'components/nvgrid/nv-grid.html',
		scope : {items : '=', cols : '=', selectedItems : '=', customOptions : '=', actions:'='}, 
		replace : false,
		transclude : false,
		controller : controller
	};
	function controller($scope, $attrs) {
		$scope.selectedItems = []; // selected row items

		var customOptions = $scope.customOptions; 
		
		var fixedOptions = {columnDefs:'cols',data:'items'};
		var defaultOptions = {selectedItems:$scope.selectedItems,showSelectionCheckbox:true,showFooter:false,enablePaging:false}; 
		$scope.options = {};
		angular.extend($scope.options, defaultOptions); 
		angular.extend($scope.options, customOptions);
		angular.extend($scope.options, fixedOptions);

		var events = {
			afterSelectionChange: function (rowItem) {
				$scope.applyFilters();
			}
		}
		/**
		* Method to redirect a call to its parent
		 * btn is an object which contain the buttons information in nv grid toolbar
		*/

		$scope.call = function(btn) {
			$scope.$parent[btn.action]();
		}

		/**
		 * Method for enabling and disabling the nv grid toolbar items
		 */
		$scope.applyFilters = function() {
			var len = $scope.selectedItems.length;
			if (len == 1) {
				$(".single").removeClass('disabled');
				$(".multi").removeClass('disabled');
			} else if (len > 1) {
				$(".single").addClass('disabled');
				$(".multi").removeClass('disabled');
			} else {
				$(".single").addClass('disabled');
				$(".multi").addClass('disabled');
			}
		}
		angular.extend($scope.options, events);
	};
});	 

