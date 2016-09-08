/**
 * Created by Mani on 20-04-2016.
 */
define(['../coreModule'],function (core) {

    /**
     * Service for Authentication
     * @returns user user object
     */
    function authService(){
        var user;
        return{
            setUser : function(aUser){
                user = aUser;
            },
            isLoggedIn : function(){
                return(user)? user : false;
            }
        }
    }

    return core.factory('Auth',authService);
});