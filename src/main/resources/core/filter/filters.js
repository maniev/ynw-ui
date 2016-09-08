/**
 * Created by Mani on 20-04-2016.
 */
define(['../coreModule'],function (core) {
    return core.directive('filters', function() {
        return {
           restrict: 'E',
           replace:true,
           templateUrl:'../core/filter/filter_tmpl.html',
           controller:'FilterCtrl'
        };  
    });
});