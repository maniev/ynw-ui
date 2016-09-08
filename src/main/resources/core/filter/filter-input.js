/**
 * Created by Mani on 20-04-2016.
 */
define(['../coreModule'],function (core) {
    return core.directive('filterInput', function() {
        return {
           restrict: 'E',
           replace:true,
           templateUrl:'../core/filter/filter_input_tmpl.html',
           controller:'FilterInputCtrl'
        };  
    });
});