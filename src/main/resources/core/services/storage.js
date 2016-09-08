/**
 * Created by Mani on 20-04-2016.
 */
define(['../coreModule'],function (core) {

    function cacheService(){
        var storageService = {};

        /**
         * Get a prestored setting
         *
         * @param String name Name of of the setting
         * @returns String The value of the setting | null
         */
        storageService.get=function(name){
            if (typeof (Storage) !== "undefined") {
                return localStorage.getItem(name);
            } else {
                window.alert('Please use a modern browser to properly view this template!');
            }
        };
        /**
         * Store a new settings in the browser
         *
         * @param String name Name of the setting
         * @param String val Value of the setting
         * @returns String val Supplied value
         */
        storageService.store=function(name,val){
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem(name, val);
            } else {
                window.alert('Please use a modern browser to properly view this template!');
            }
            return val;
        };
        /**
         * Remove a settings from the browser
         *
         * @param String name Name of the setting to remove from localstorage
         */
        storageService.remove=function(name){
            if (typeof (Storage) !== "undefined") {
                localStorage.removeItem(name);
            } else {
                window.alert('Please use a modern browser to properly view this template!');
            }
        };

        return storageService;
    }

    return core.factory("LStore",cacheService);

});