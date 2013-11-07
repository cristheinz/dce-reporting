Ext.define('AM.view.layout.Menu', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.mainmenu',
    
    layout: 'accordion',
	items: [{
		title: 'Aplicações',
    	xtype: 'applicationsmenu',
    	layout: 'fit'
    },{
        title: 'Relatórios',
        xtype: 'reportsmenu',
    	layout: 'fit'
	}]
});