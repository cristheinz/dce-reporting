Ext.define('AM.view.batch.Main' ,{
	extend: 'Ext.panel.Panel',
	
    alias: 'widget.batchmain',
    id: 'module_batch',
    closable: true,
    
    title: 'Execuções BATCH',
    iconCls: 'module-icon',
    
    layout: 'border',
    bodyBorder: false,
    
    defaults: {
        collapsible: true,
        split: true
    },
    
    items: [{
    	collapsible: false,
        region: 'center',
        layout: 'fit',
        title: 'JOBs',
        xtype: 'batchjoblist'
    }, {
    	region: 'south',
    	title: 'STEPs',
    	xtype: 'batchsteplist',
    	height: 250,
    	collapsible: true
    }]

});