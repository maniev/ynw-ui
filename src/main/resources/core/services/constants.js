/**
 * Created by Mani on 25-04-2016.
 */
define(['../coreModule'], function (coreModule) {
    return coreModule.service('Constants', function () {
        var constants = {};

        constants.NOUSERINSESSION = "no user in session";
        constants.RESET_SUCCESS_MSG = "Password has been changed successfully.";
        constants.FORGOT_NOTIFICAITON_MSG = "An reset link has been sent to your email id";
        constants.ACTIVATION_NOTIFY_MSG="An activation link has been sent to your email id.";
        constants.ACCOUNT_VERIFY_SUCCESS="Your account has been successfully verified.";
        constants.SETPASSWORD_SUCCESS="Your password has been set successfully.";

        constants.LABEL_CREATE_SUCCESS="Label created successfully.";
        constants.LABEL_UPDATE_SUCCESS="Label updated successfully.";
        constants.LABEL_DELETE_SUCCESS="Label removed successfully.";
        constants.SERVICE_CREATE_SUCCESS="Service created successfully.";
        constants.SERVICE_UPDATE_SUCCESS="Service updated successfully.";
        constants.SERVICEGRP_CREATE_SUCCESS="Service Group created successfully.";
        constants.SERVICEGRP_UPDATE_SUCCESS="Service Group updated successfully.";
        constants.SERVICELOC_CREATE_SUCCESS="Service Location created successfully.";
        constants.SERVICELOC_UPDATE_SUCCESS="Service Location updated successfully.";
        constants.APM_DISCOUNT_CREATE_SUCCESS="Discount created successfully.";
        constants.APM_DISCOUNT_UPDATE_SUCCESS="Discount updated successfully.";
        constants.CONSUMER_ADD_SUCCESS="Consumer added successfully.";
        constants.ALERT_ADD_SUCCESS="Alert added successfully.";
        constants.PROFILE_CREATE_SUCCESS="Business profile created successfully.";
        constants.APM_profile_UPDATE_SUCCESS="Business profile updated successfully ";
        constants.IMAGE_UPLOAD_SUCCESS="Images uploaded successfully.";
        constants.HOLIDAY_CREATE_SUCCESS="Holiday created successfully";
		constants.HOLIDAY_UPDATE_SUCCESS="Holiday updated successfully";
		constants.UNAVAILABILITY_CREATE_SUCCESS="Unavailability created successfully";
        constants.UNAVAILABILITY_UPDATE_SUCCESS="Unavailability updated successfully";
	
		constants.APPOINTMENT_UPDATE_SUCCESS="Appointment updated successfully";
		constants.OTP_NOTIFY_MSG="OTP has been sent to your email";
        constants.WL_DEL_SUCCESS="Waitlist cancelled successfully";
		
        constants.EMAILREQUIRED = "email Required";
        constants.EMAILMISMATCH = "email mismatch";
        constants.PASSWORDREQUIRED = "password Required";
        constants.PASSWORDMISMATCH = "password mismatch";

        return constants;
    })
});