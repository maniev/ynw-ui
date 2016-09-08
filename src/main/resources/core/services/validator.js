/**
 * Created by Mani on 30-04-2016.
 */
define(['../coreModule'], function (coreModule) {
    return coreModule.service('Validator', function () {
        var validationSevice = {};
        validationSevice.validateEmail=function(email) {

        };
        validationSevice.isNull = function(field){
            if(field==null || field.trim()=='')
                return true;
        };
        validationSevice.isNumber = function(field){
            if(field==null)
                return true;
        };
        return validationSevice;
    })
});