Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'AM': 'app'
    }
});
Ext.require('Ext.ux.grid.FiltersFeature');
Ext.require('Ext.ux.GMapPanel');
Ext.application({
    name: 'AM',
    controllers: [
        'Application',
        'BalanceController',
        'BranchController',
        'FileController'
    ],
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