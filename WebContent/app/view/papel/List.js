Ext.define('AM.view.papel.List' ,{
    extend: 'Ext.grid.Panel',
    
    alias: 'widget.papellist',
    //id: 'module_papel',
    
    store: 'PapelStore',
    layout: 'fit',
    
    //title: 'Papel Comercial',
    //closable: true,
    
    tbar: [{
    	iconCls: 'add-icon',
    	action: 'add',
    	tooltip: 'Adicionar'
    },{
    	iconCls: 'new-icon',
    	action: 'run',
    	tooltip: 'Gerar ficheiro'
    },'->',{
    	xtype: 'textfield', 
    	name: 'searchbox',
    	emptyText: 'Procurar',
    	width: 200,
    	enableKeyEvents : true
    }],
    
    initComponent: function() {
    	Ext.apply(this, {
    		columns: [{
    			header : 'ID',
    			dataIndex : 'id',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'Titular',
    			dataIndex : 'nam',
    			menuDisabled: true,
    			flex : 3
    		},{
    			header : 'Vencimento',
    			dataIndex : 'dtf',
    			menuDisabled: true,
    			flex : 1,
    			xtype : 'datecolumn',
    			format : 'Y-m-d'
    			//renderer: Ext.util.Format.dateRenderer('Y-m-d')
    		},{
    			header : 'Moeda',
    			dataIndex : 'moe',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'Limite',
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