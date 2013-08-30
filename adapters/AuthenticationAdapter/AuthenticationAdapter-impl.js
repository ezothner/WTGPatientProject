/*
*  Licensed Materials - Property of IBM
*  5725-G92 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

function onAuthRequired(headers, errorMessage){
	errorMessage = errorMessage ? errorMessage : null;
	
	return {
		authRequired: true,
		errorMessage: errorMessage
	};
}

function submitAuthentication(username, password){
	
	/* 
	 * TODO: Hardcoded values for now.  
	 * We need to change this to get from Patient Profile data store.
	 */
	if (username==="demo" && password === "demo"){

		var userIdentity = {
				userId: username,
				displayName: username, 
				attributes: {
					foo: "bar"
				}
		};

		WL.Server.setActiveUser("AdapterAuthRealm", userIdentity);
		
		return { 
			authRequired: false 
		};
	}

	return onAuthRequired(null, "Invalid login credentials");
}

function getSecretData(){
	return {
		secretData: "A very very very very secret data"
	};
}

function onLogout(){
	WL.Server.setActiveUser("AdapterAuthRealm", null);
	WL.Logger.debug("Logged out");
}

