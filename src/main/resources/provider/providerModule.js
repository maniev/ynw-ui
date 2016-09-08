/**
 * Created by Mani on 27-04-2016.
 */
define(['angular','angular-wysiwyg','../core/coreModule'],function (angular) {
    var providerModule;
    try{
        providerModule=angular.module('provider');
    }catch(exception){
        providerModule=angular.module('provider',['core','angularUtils.directives.uiBreadcrumbs','wysiwyg.module']);
        providerModule.run(['$log', function ($log) {
            $log.info('Provider Module Created');
        }]);
    }
    return providerModule;
});