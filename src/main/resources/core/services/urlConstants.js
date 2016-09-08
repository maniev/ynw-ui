/**
 * Created by Mani on 25-04-2016.
 */
define(['../coreModule'], function (core) {
    return core.service('UrlConstants', function () {
        var urlHandler = {};

        urlHandler.BASE = '../';   
        
        urlHandler.ACCOUNTURL = urlHandler.BASE + 'v1/rest/accounts';
        urlHandler.PROVIDERURL= urlHandler.BASE + 'v1/rest/providers';
        urlHandler.CONSUMERURL= urlHandler.BASE + "v1/rest/consumers";

        urlHandler.GETACCOUNTSTATUSURL=urlHandler.ACCOUNTURL+"/";
        urlHandler.CONSUMERLOGINURL = urlHandler.BASE + 'v1/rest/consumers/login';
        urlHandler.CONSUMERSIGNUPURL = urlHandler.CONSUMERURL;
        urlHandler.CONSUMERRESETURL = urlHandler.BASE + "v1/rest/consumers/login/reset/";
        urlHandler.PROVIDERSIGNUPURL = urlHandler.BASE + 'v1/rest/accounts';
        urlHandler.PROVIDERLOGINURL = urlHandler.BASE + 'v1/rest/providers/login';
        urlHandler.ACCOUNTGALLERYURL = urlHandler.ACCOUNTURL + '/gallery';
        urlHandler.ACCOUNTGALLERYDELURL = urlHandler.ACCOUNTGALLERYURL + '/';
        urlHandler.PROVIDERRESETURL = urlHandler.BASE + "v1/rest/providers/login/reset/";
       	urlHandler.PROVIDERSERVICEURL = urlHandler.BASE + "v1/rest/accounts/services";
        urlHandler.PROVIDERSERVICEDELURL = urlHandler.PROVIDERSERVICEURL + '/';
        urlHandler.PROVIDERACCOUNTURL = urlHandler.BASE + 'v1/rest/providers/account';
        urlHandler.GETACCOUNTCONFIG = urlHandler.ACCOUNTURL + "/settings/apm/conf";
        urlHandler.ACCOUNTDESCURL = urlHandler.ACCOUNTURL + "/businessDesc";
        urlHandler.ACCOUNTSCHEDULEURL = urlHandler.ACCOUNTURL + "/bSchedule";
        urlHandler.SPURL = urlHandler.BASE + 'v1/rest/providers/user';
        urlHandler.PROVIDERSERVICEGROUPURL= urlHandler.PROVIDERSERVICEURL + "/sGroup";
        urlHandler.PROVIDERGETSERVICEBYGROUPURL=urlHandler.PROVIDERSERVICEURL + "/byGroup";
        urlHandler.APPMTSETTINGSURLS = urlHandler.ACCOUNTURL + "/appmtSettings";
        urlHandler.ACCOUNTPROFILEURL = urlHandler.ACCOUNTURL + '/bProfile';
        urlHandler.CONSUMERCHANGEPWDURL = urlHandler.CONSUMERLOGINURL + "/chpwd";
        urlHandler.PROVIDERCHANGEPWDURL = urlHandler.PROVIDERLOGINURL + "/chpwd";
        urlHandler.SLURL= urlHandler.BASE + "v1/rest/accounts/settings/apm/location";
        urlHandler.DISCOUNTURL = urlHandler.ACCOUNTURL + '/discount';
        urlHandler.VACATIONSURL = urlHandler.PROVIDERURL +'/unavailability';
        urlHandler.LABELSURL = urlHandler.ACCOUNTURL + '/label';
        urlHandler.LABELASSIGNURL = urlHandler.ACCOUNTURL + '/customers/label';
        urlHandler.ADDCONSUMERURL=urlHandler.ACCOUNTURL  + "/customers";
        urlHandler.SERVICEPROVIDERS = urlHandler.BASE + 'v1/rest/accounts/providers';
        urlHandler.ALERTURL = urlHandler.ACCOUNTURL + '/alerts';
        urlHandler.ALERTCONF= urlHandler.ACCOUNTURL + '/alerts/conf';
        urlHandler.HOLIDAYSURL = urlHandler.ACCOUNTURL + '/holidays';
	    urlHandler.APPOINTMENT=urlHandler.ACCOUNTURL +'/settings/apm/appmtSettings';


       urlHandler.GETWAITLISTURL=urlHandler.CONSUMERURL + "/wailtlist";
       //urlHandler.FAVPROVIDERSURL= urlHandler.CONSUMERURL + '/accounts';
        urlHandler.WAITLISTURL="../consumer/data/waitlist.json";
        urlHandler.FAVPROVIDERSURL='../consumer/data/providerlist.json';
        urlHandler.WAITLISTDELAYURL=urlHandler.CONSUMERURL + "/wailtlist";

        return urlHandler;
    })
});