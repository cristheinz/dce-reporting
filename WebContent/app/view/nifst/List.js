Ext.define('AM.view.nifst.List' ,{
    extend: 'Ext.grid.Panel',
    requires: [
               'Ext.selection.CellModel',
               'Ext.grid.*',
               'Ext.data.*',
               'Ext.util.*',
               'Ext.form.*'
           ],
    
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
    	this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 2
        });
    	Ext.apply(this, {
    		plugins: [this.cellEditing],
    		columns: [{
    			header : 'NIF',
    			dataIndex : 'nif',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'Titular',
    			dataIndex : 'nam',
    			menuDisabled: true,
    			editor: {
                    allowBlank: true
                },
    			flex : 2
    		}]/*,
    		selModel: {
                selType: 'cellmodel'
            }*/
    	});
    	
        this.callParent(arguments);
    }
});