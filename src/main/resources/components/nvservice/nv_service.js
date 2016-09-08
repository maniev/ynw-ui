/**
 * Created by Mani on 09-10-2015.
 */

'use strict';

angular.module('ynw.nvservice', [])
	
	/**
	* Service for server url data handling
	* @params $http http service
	* @returns nvService represents the object holds the methods
	*/	 

    .factory('NVService', function($http){
        var nvService={};

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
        nvService.getResourceFromUrl = function(path) {
            return $http({"method":'GET',url:path});
        };
		
		/**
		 * Remove a Resource
		 *
		 * @param URL path represents the url path
		 * @returns JSON response represents url result
		 */
        nvService.deleteResource = function(path) {
            return $http({"method":'DELETE',url:path});
        };
		
		/**
		 * Post request handler method
		 *
		 * @param URL path represents the url path
		 * @param JSON data represents the post input 
		 * @returns JSON response represents url result 
		 */
		nvService.post=function(path,data){
			return $http({method:'POST',url:path,data:data,transformResponse:transformResponse});
		};
		
		/**
		 * Post request handler method
		 *
		 * @param URL path represents the url path
		 * @param JSON data represents the post input 
		 * @returns JSON response represents url result 
		 */
		nvService.postImageWithData=function(path,data){
			return $http.post(path, data, {transformRequest:angular.identity, headers: {'Content-Type':undefined}});
		};
		
		/**
		 * Post request handler method
		 *
		 * @param URL path represents the url path
		 * @param JSON data represents the post input 
		 * @returns JSON response represents url result 
		 */
		nvService.patch=function(path,data){
			return $http({method:'PATCH',url:path,data:data});
		};
		
		/**
		 * Put request handler method
		 *
		 * @param URL path represents the url path
		 * @param JSON data represents the post input 
		 * @returns boolean
		 */
		nvService.put=function(path,data){
			return $http({method:'PUT',url:path,data:data});
		};
		
		/**
		 * Get a JSON string of operators
		 *
		 * @param String value
		 * @returns Array having values for the input type
		 */
		nvService.getList=function(value){
			if(value=='timePeriod')
				return ["Today","Week","Month"];
			if(value=='doctor')
				return ["Manikandan","Leonora","Nithesh"]
			if(value=='skins')
				return ["skin-blue","skin-green","skin-purple","skin-gradientgreen","skin-predawn"]
			return ["no result"];
		};
		/**
		 * Get a JSON string of operators
		 *
		 * @param String type Type of the setting
		 * @returns JSON which contain operators for the particular type
		 */
		nvService.getOperators=function(type){
			console.log(type);
			if(type=='Date')
				return [{"name":"eq","value":"eq"},{"name":"neq","value":"neq"},{"name":"ge","value":"ge"},{"name":"le","value":"le"}];
			return [{"name":"eq","value":"eq"},{"name":"neq","value":"neq"},{"name":"like","value":"like"}];
		};
		/**
		 * Get a prestored setting
		 *
		 * @param String name Name of of the setting
		 * @returns String The value of the setting | null
		 */
		nvService.get=function(name){
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
		nvService.store=function(name,val){
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
		nvService.remove=function(name){
			if (typeof (Storage) !== "undefined") {
				localStorage.removeItem(name);
			} else {
				window.alert('Please use a modern browser to properly view this template!');
			}
		};
        return nvService;
    })
	
	/**
	* Service for Authentication
	* @returns user user object
	*/
	.factory('Auth',function(){
		var user;
		return{
			setUser : function(aUser){
				user = aUser;
			},
			isLoggedIn : function(){
				return(user)? user : false;
			}
		}
	})