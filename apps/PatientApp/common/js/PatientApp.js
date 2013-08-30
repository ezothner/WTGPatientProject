/**
* @license
* Licensed Materials - Property of IBM
* 5725-G92 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

var currentView = "";

function wlCommonInit(){
	require([ "layers/core-web-layer", "layers/mobile-ui-layer", "dojo/_base/fx" ], dojoInit);

	/*
	 * Application is started in offline mode as defined by a connectOnStartup property in initOptions.js file.
	 * In order to begin communicating with Worklight Server you need to either:
	 * 
	 * 1. Change connectOnStartup property in initOptions.js to true. 
	 *    This will make Worklight framework automatically attempt to connect to Worklight Server as a part of application start-up.
	 *    Keep in mind - this may increase application start-up time.
	 *    
	 * 2. Use WL.Client.connect() API once connectivity to a Worklight Server is required. 
	 *    This API needs to be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 *    Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	WL.Logger.debug("In wlCommonInit()");

    WL.Client.connect({
		onSuccess: onConnectSuccess,
		onFailure: onConnectFailure});
		
		require(["dojo/dom", "dojo/on","dijit/registry"], function(dom, on, registry){
			on(dom.byId("update"), "click", function () {
				registry.byId("myProfileView").performTransition("Home", -1, "slide");			
			});
			on(dom.byId("logout"), "click", function () {
				registry.byId("Home").performTransition("loginView", -1, "slide");			
			});
			
		});
}

function onConnectSuccess(){
	WL.Logger.debug("Server connected successfully.");
	}
function onConnectFailure(){
	WL.Logger.error("Server connection error.");
}

function dojoInit() {
		
	require([ "dojo/ready", "dojo/parser", "dojox/mobile", "dojo/dom", "dojo/_base/fx", "dojo/on", "dojo/dom-style", "dojo/domReady!", "dijit/registry", "dojox/mobile/ScrollableView", "dojox/mobile/TabBar", "dojox/mobile/TabBarButton", "dojox/mobile/View", "dojox/mobile/Heading", "dojox/mobile/Accordion", "dojox/mobile/ContentPane", "dojox/mobile/Button", "dojox/mobile/ScrollablePane", "dojox/mobile/ListItem", "dojox/mobile/RoundRectList", "dojox/mobile/RoundRect", "dojox/mobile/TextBox", "dojox/mobile/GridLayout", "dojox/mobile/Pane", "dojox/mobile/EdgeToEdgeList", "dojox/mobile/Switch", "dojox/mobile/Slider", "dojox/mobile/RoundRectCategory", "dojox/mobile/CheckBox", "dojox/mobile/RadioButton", "dojox/mobile/SwapView", "dojox/mobile/PageIndicator", "dojox/mobile/TextArea", "dojox/mobile/Badge" ], function(ready) {
		ready(function(dojo) {
			
			WL.Logger.debug("In dojoInit()");
			
			// Using default style
	        //var badge1 = new Badge({value:"10"});
	        //win.body().appendChild(badge1.domNode);
			// hideLoader(dojo);
		     currentView = dijit.registry.byId("AppDiv");

			WL.Logger.debug("Before Subscribe dojoInit()");

		  //   dojo.subscribe("/dojox/mobile/afterTransitionIn", afterTransitionIn);
		  //   dojo.subscribe("/dojox/mobile/afterTransitionOut", afterTransitionOut);
		     
		     
		   //  var startMapWidget = new js.custom.widgets.GoogleMap({id: "mapWidget", reqtype: "atm"});
		   //  dojo.byId("loader").appendChild(startMapWidget.domNode);  
		});
	});
}
function getSecretData(){
	
	WL.Logger.debug("In getSecretData()");

	var invocationData = {
			adapter : "AuthenticationAdapter",
			procedure: "getSecretData",
			parameters: []
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: getSecretDataOK, 
		onFailure: getSecretDataFAIL
	});
}

function getSecretDataOK(response){
	
	WL.Logger.debug("In getSecretDataOK().");

	$("#ResponseDiv").html(JSON.stringify(response.invocationResult));
}

function getSecretDataFAIL(response){
	WL.Logger.debug("In getSecretDataFAIL().");

	$("#ResponseDiv").html(JSON.stringify(response.invocationResult));
}

function hideLoader(dojo){

	WL.Logger.debug("In hideLoader().");

	
//	dojo.fadeOut(
//			{node : "loader",
//		duration : 350
//	}).play();
	
//    dojo.fadeOut({
//        node:"loader",
//        onEnd: function(){
//        	dojo.style("loader", "display", "none");
//        }
//     }).play();
    document.getElementById("AppDiv").style.display = "";
}