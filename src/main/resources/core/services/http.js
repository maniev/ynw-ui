/**
 * Created by Mani on 20-04-2016.
 */
define(['../coreModule'],function (core) {

    return core.factory("UrlService",['$http', function ($http) {
        var urlService = {};

        /**
         * Get a string represents the URL response
         *
         * @param String data
         * @param headersGetter data
         * @returns resp response data
         */
        function transformResponse(data,headersGetter){
            var resp=data;
            if(data.startsWith('"') && data.endsWith('"'))
                resp =data.substring(1,data.length-1);
            if(!isJson(resp))
                return resp;
            return JSON.parse(resp);
        }

        /**
         * Check given string is a valid JSON
         *
         * @param str string to check
         * @returns true/false
         */
        function isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        /**
         * Get a JSON string of operators
         *
         * @param URL path represents the url path
         * @returns JSON response represents url result
         */
        urlService.get = function(path) {
            return $http({"method":'GET',url:path,
                transformResponse: transformResponse});
        };

        /**
         * Remove a Resource
         *
         * @param URL path represents the url path
         * @returns JSON response represents url result
         */
        urlService.deleteR = function(path) {
            return $http({"method":'DELETE',url:path});
        };

        /**
         * Post request handler method
         *
         * @param URL path represents the url path
         * @param JSON data represents the post input
         * @returns JSON response represents url result
         */
        urlService.post=function(path,data){
            return $http({method:'POST',url:path,data:data,transformResponse:transformResponse});
        };

        /**
         * Post request handler method
         *
         * @param URL path represents the url path
         * @param JSON data represents the post input
         * @returns JSON response represents url result
         */
        urlService.postImageWithData=function(path,data){
            return $http.post(path, data, {transformRequest:angular.identity, headers: {'Content-Type':undefined}});
        };

        /**
         * Post request handler method
         *
         * @param URL path represents the url path
         * @param JSON data represents the post input
         * @returns JSON response represents url result
         */
        urlService.patch=function(path,data){
            return $http({method:'PATCH',url:path,data:data});
        };

        /**
         * Put request handler method
         *
         * @param URL path represents the url path
         * @param JSON data represents the post input
         * @returns boolean
         */
        urlService.put=function(path,data){
            return $http({method:'PUT',url:path,data:data});
        };
        return urlService;
    }]);
});