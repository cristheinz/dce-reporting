Ext.define('AM.view.balance.Main' ,{
	extend: 'Ext.panel.Panel',
	
    alias: 'widget.balancemain',
    id: 'module_balance',
    closable: true,
    
    title: 'Balancete',
    iconCls: 'module-icon',
    
    layout: 'border',
    bodyBorder: false,
    
    defaults: {
        collapsible: true,
        split: true
        //bodyPadding: 15
    },
    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: ['->',
           {
        	   iconCls: 'prev-icon', action: 'prev'/*, tooltip: 'Periodo anterior'*/
           },{
        	   name: 'anomes',
           	   xtype: 'textfield',
           	   width: 55,
           	   value: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -1),'Ym')
           },{
        	   iconCls: 'next-icon', action: 'next'/*, tooltip: 'Próximo periodo'*/
           }
        ]
    }],
    tbar: [{
    	iconCls: 'new-icon',
    	action: 'new',
    	tooltip: 'Novo'
    /*},{
    	iconCls: 'open-icon',
    	action: 'open',
    	tooltip: 'Abrir'*/
    /*},'->',{
    	iconCls: 'refresh-icon',
    	action: 'refresh',
    	tooltip: 'Actualizar'*/
    }],


    items: [{
    	collapsible: false,
        region: 'center',
        layout: 'fit',
        xtype: 'balancelist'
    }, {
    	region: 'east',
    	title: 'Ajustes',
    	xtype: 'adjustlist',
    	width: 400,
    	collapsed: true
    }]

});