Ext.define('AM.view.nifst.List' ,{
    extend: 'Ext.grid.Panel',
    
    alias: 'widget.nifstlist',
    id: 'module_nifst',
    
    store: 'NifstStore',
    height: 400,
    layout: 'fit',
    
    title: 'Clientes',
    //closable: true,
    
    tbar: [/*{/*
    	iconCls: 'add-icon',
    	action: 'add',
    	tooltip: 'Adicionar'
    },*/
    	'->',{
    	xtype: 'textfield', 
    	name: 'searchbox',
    	emptyText: 'Procurar',
    	width: 200,
    	enableKeyEvents : true
    }],
    
    initComponent: function() {
    	Ext.apply(this, {
    		columns: [{
    			header : 'NIF',
    			dataIndex : 'nif',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'Titular',
    			dataIndex : 'nam',
    			menuDisabled: true,
    			flex : 1
    		}]/*,
    		selModel: {
                selType: 'cellmodel'
            }*/
    	});
    	
        this.callParent(arguments);
    }
});