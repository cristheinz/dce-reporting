Ext.define('AM.controller.AbstractController', {
    extend: 'Ext.app.Controller',
    
    stores: ['AuthData'],
    
    getAccess: function(service, action) {
    	var key = service+"-"+action;
    	//alert(key+';'+Ext.getStore('AuthData').find('key',key));
		if(Ext.getStore('AuthData').find('key',key)>=0)
			return true;
		alert("Não autorizado.");
		return false;
	}/*,
    
    init: function() {
    }*/
});