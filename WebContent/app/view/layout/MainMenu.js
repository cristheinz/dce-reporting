Ext.define('AM.view.layout.MainMenu', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.mainmenu',
    
    layout: 'accordion',
	items: [{
		title: 'Aplicações',
    	xtype: 'module',
    	layout: 'fit'
    },{
        title: 'Relatórios',
        xtype: 'report',
    	layout: 'fit'
	}]
});