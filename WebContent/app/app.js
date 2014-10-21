Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'AM': 'app'
    }
});
Ext.require('Ext.ux.grid.FiltersFeature');
Ext.require('Ext.ux.GMapPanel');
Ext.require('AM.AssociatedWriter');
Ext.application({
    name: 'AM',
    controllers: [
        'Application',
        'AdjustController',
        'BalanceController',
        'BatchController',
        'BranchController',
        'CtistController',
        'FaqstController',
        'FileController',
        'PapelController',
        'PapelEmiController',
        'NifstController',
        'ReportController'
    ],
    init : function() {
    	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    	//Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
    	Ext.state.Manager.clear('username');
    	//Ext.state.Manager.set('username','bbb');
    	
    },
    launch: function() {
    	Ext.util.Format.thousandSeparator = '.';
    	Ext.util.Format.decimalSeparator = ',';
    	
        Ext.create('Ext.container.Viewport', {
        	layout: 'fit',
            items: [
                {
                    xtype: 'mainapp'
                }
            ]
        });
    }
});