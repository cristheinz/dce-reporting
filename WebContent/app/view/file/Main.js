Ext.define('AM.view.file.Main' ,{
	extend: 'Ext.panel.Panel',
	alias: 'widget.filemain',
	
	layout: 'border',
    bodyBorder: false,
    height: 400,
    
    items: [{
    	//collapsible: false,
        region: 'center',
        //layout: 'fit',
        //title: 'Programas',
        xtype: 'filelist'
    }, {
    	region: 'west',
    	xtype: 'filefolder',
    	title: 'Pastas',
    	/*items: [{
    		xtype: 'button',
    		text: 'Carregamentos',
    		action: 'listall'
    	},{
        	xtype: 'button',
        	text: 'Ficheiros de Regularização',
        	action: 'listfregu'
    	}],*/
    	//layout: 'fit',
    	//xtype: 'papelemilist',
    	width: 200,
    	//height: 250,
    	collapsible: true/*,
    	collapsed: true*/
    }]
});