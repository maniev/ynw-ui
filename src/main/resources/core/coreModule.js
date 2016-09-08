/**
 * Created by Mani on 27-04-2016.
 */
define(['angular','angular-ui-route','angular-modal-service','ui-bootstrap','./formlyModule'],function (angular) {
    var coreModule;
    try{
        coreModule=angular.module('core');
    }catch(exception){
        coreModule=angular.module('core',['ui.router','angularModalService','ui.bootstrap','formlyM']);
        coreModule.run(['$log', function ($log) {
            $log.info('Core Module Created');
        }]);
    }
    return coreModule;
});