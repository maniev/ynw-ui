/**
 * Created by Mani on 27-04-2016.
 */
define(['angular','../core/coreModule'],function (angular) {
    var consumerModule;
    try{
        consumerModule=angular.module('consumer');
    }catch(exception){
        consumerModule=angular.module('consumer',['core']);
        consumerModule.run(['$log', function ($log) {
            $log.info('Consumer Module Created');
        }]);
    }
    return consumerModule;
});