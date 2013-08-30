/*
*  Licensed Materials - Property of IBM
*  5725-G92 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

var adapterAuthRealmChallengeHandler = WL.Client.createChallengeHandler("AdapterAuthRealm");

adapterAuthRealmChallengeHandler.isCustomResponse = function(response) {
	
	WL.Logger.debug("In AdapterAuthRealmChangeHandler.isCustomerResponse.");
	/*
	if (!response || !response.responseJSON	|| response.responseText === null) {
		return false;
	}
	if (typeof(response.responseJSON.authRequired) !== 'undefined'){
		return true;
	} else {
		return false;
	}
	*/
	return false;
};

adapterAuthRealmChallengeHandler.handleChallenge = function(response){
	var authRequired = response.responseJSON.authRequired;

	WL.Logger.debug("In AdapterAuthRealmChangeHandler.handleChallenge.");

	if (authRequired == true){
		$("#AppDiv").hide();
		$("#AuthDiv").show();
		$("#AuthPassword").empty();
		$("#AuthInfo").empty();

		if (response.responseJSON.errorMessage)
	    	$("#AuthInfo").html(new Date() + " :: " + response.responseJSON.errorMessage);
		
	} else if (authRequired == false){
		$("#AppDiv").show();
		$("#AuthDiv").hide();
		adapterAuthRealmChallengeHandler.submitSuccess();
	}
};


$("#AuthSubmitButton").bind('click', function () {
	var username = $("#AuthUsername").val();
	var password = $("#AuthPassword").val();

	var invocationData = {
		adapter : "AuthenticationAdapter",
		procedure : "submitAuthentication",
		parameters : [ username, password ]
	};

	adapterAuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});
});

$("#AuthCancelButton").bind('click', function () {
	$("#AppDiv").show();
	$("#AuthDiv").hide();
	adapterAuthRealmChallengeHandler.submitFailure();
});
