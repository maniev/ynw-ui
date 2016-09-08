/**
 * Created by Mani on 02-01-2016.
 */

angular.module('nvPagination', [])

    /**
     * Directive used for Generating Pagination, will accept the parameters bigTotalItems, maxSize, bigCurrentPage
     * bigTotalItems -- total number of rows
     * maxSize --  how many page number we want to show at one time
     * */
    .directive('nvPaginate', function () {
        return {
            restrict:'EA',
            replace:true,
            scope:{bigTotalItems:'=',maxSize:'='},
            templateUrl:'components/pagination/pagination_tmpl.html',
            controller: function ($scope) {

                /**
                 * Call the pageChanged function of parent which accepts the selected page number
                 * */
                $scope.pageChanged=function() {
                    $scope.$parent.pageChanged($scope.bigCurrentPage);
                }
            }
        }
    })


