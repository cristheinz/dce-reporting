Ext.define('AM.view.papelEmi.List' ,{
    extend: 'Ext.grid.Panel',
    
    alias: 'widget.papelemilist',
    //id: 'module_papelEmi',
    
    store: 'PapelEmiStore',
    layout: 'fit',
    
    //collapsible: true,   // make collapsible
    //split: true,          // enable resizing
    
    //title: 'Papel Comercial - Emissões',
    //closable: true,
    
    tbar: [{
    	iconCls: 'add-icon',
    	action: 'add',
    	tooltip: 'Adicionar'
    },{
    	xtype: 'hiddenfield',
    	name: 'papelid'
    /*
    },'->',{
    	xtype: 'textfield', 
    	name: 'searchbox',
    	emptyText: 'Procurar',
    	width: 200,
    	enableKeyEvents : true*/
    }],
    
    initComponent: function() {
    	Ext.apply(this, {
    		columns: [{
    			header : 'ID',
    			dataIndex : 'emi',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'NIF',
    			dataIndex : 'nif',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'Nome',
    			dataIndex : 'nam',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'Sucursal',
    			dataIndex : 'suc',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'Inicio',
    			dataIndex : 'dti',
    			menuDisabled: true,
    			flex : 1,
    			renderer: Ext.util.Format.dateRenderer('Y-m-d')
    		},{
    			header : 'Vencimento',
    			dataIndex : 'dtf',
    			menuDisabled: true,
    			flex : 1,
    			renderer: Ext.util.Format.dateRenderer('Y-m-d')
    		},{
    			header : 'Valor',
    			dataIndex : 'val',
    			menuDisabled: true,
    			align: 'right',
                renderer: function(v,p,r){
                	return Ext.util.Format.number(v, '0.000,00/i');
                },
    			flex : 1
    		}]/*,
    		selModel: {
                selType: 'cellmodel'
            }*/
    	});
    	
        this.callParent(arguments);
    }
});