Ext.define('AM.view.layout.MainMenu', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.mainmenu',
    
    layout: 'accordion',
	items: [{
		title: 'Aplica��es',
    	xtype: 'module',
    	layout: 'fit'
    },{
        title: 'Relat�rios',
        xtype: 'report',
    	layout: 'fit'
	}]
});