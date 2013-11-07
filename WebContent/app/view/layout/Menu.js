Ext.define('AM.view.layout.Menu', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.mainmenu',
    
    layout: 'accordion',
	items: [{
		title: 'Aplica��es',
    	xtype: 'applicationsmenu',
    	layout: 'fit'
    },{
        title: 'Relat�rios',
        xtype: 'reportsmenu',
    	layout: 'fit'
	}]
});