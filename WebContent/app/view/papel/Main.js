Ext.define('AM.view.papel.Main' ,{
	extend: 'Ext.panel.Panel',
	
    alias: 'widget.papelmain',
    id: 'module_papel',
    closable: true,
    
    title: 'Papel Comercial',
    iconCls: 'module-icon',
    
    layout: 'border',
    bodyBorder: false,
    
    defaults: {
        collapsible: true,
        split: true
        //bodyPadding: 15
    },
    
    /*dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: ['->',
           {
        	   iconCls: 'prev-icon', action: 'prev'
           },{
        	   name: 'anomes',
           	   xtype: 'textfield',
           	   width: 55,
           	   value: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -1),'Ym')
           },{
        	   iconCls: 'next-icon', action: 'next'
           }
        ]
    }],
    tbar: [{
    	iconCls: 'new-icon',
    	action: 'new',
    	tooltip: 'Novo'
    }],*/


    items: [{
    	collapsible: false,
        region: 'center',
        layout: 'fit',
        title: 'Programas',
        xtype: 'papellist'
    }, {
    	region: 'south',
    	title: 'Emissões',
    	xtype: 'papelemilist',
    	//width: 400,
    	height: 250,
    	collapsible: true
    	//collapsed: true
    }]

});