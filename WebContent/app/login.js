Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'AM': 'app'
    }
});
Ext.application({
    name: 'AM',
    controllers: [
        'Authentication'
    ],
    launch: function() {
    	Ext.create('AM.view.authentication.Login',{ 
            //renderTo: Ext.getBody()
            renderTo: 'loginTarget'
        });
    }
});