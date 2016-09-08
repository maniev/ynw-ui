var nvGrid = angular.module('grid', ['wt.responsive', 'ngAnimate']);
nvGrid.directive('grid', function() {
	return {
		restrict: 'E',
		templateUrl: '../components/customgrid/grid.html',
		scope : {items : '=', cols : '=', actions:'='},
		replace : false,
		transclude : false,
		controller : controller
	};
	function controller($scope) {
		$scope.selectedItems = [];
		$scope.selectedRows=[];
        /**
         * route to parent method
         * @param btn
         */
		$scope.call = function(btn) {
			$scope.$parent[btn.action]();
		};
		$scope.setClickedRow = function (row, index) {
			if($scope.selectedRows.indexOf(index) == -1) {
				$scope.selectedRows.push(index);
				$scope.selectedItems.push(row);
			}else {
				$scope.selectedRows.splice($scope.selectedRows.indexOf(index),1);
				$scope.selectedItems.splice($scope.selectedRows.indexOf(index),1);
			}
			applyFilters($scope.selectedRows.length);
		}

		$scope.isRowSelected = function(index) {
			if($scope.selectedRows.indexOf(index)!=-1)
				return true;
			return false;
		}

		function applyFilters(len) {
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
		};
	}
});

