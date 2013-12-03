Ext.define('AM.view.ctist.List' ,{
    extend: 'Ext.grid.Panel',
    
    requires: [
               'Ext.selection.CellModel',
               'Ext.grid.*',
               'Ext.data.*',
               'Ext.util.*',
               'Ext.form.*'
           ],

    alias: 'widget.ctistlist',
    id: 'module_ctist',
    
    store: 'CtistStore',
    layout: 'fit',
    
    tbar: [{
    	iconCls: 'add-icon',
    	action: 'add',
    	tooltip: 'Adicionar'
    },'->',{
    	xtype: 'textfield', 
    	name: 'searchbox',
    	emptyText: 'Procurar',
    	width: 200,
    	enableKeyEvents : true
    }],
    
    initComponent: function() {
    	this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
    	
    	Ext.apply(this, {
    		plugins: [this.cellEditing],
    		columns: [{
    			xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                iconCls: 'moveleft-icon',
                handler: function(grid, rowIndex, colIndex) {
                	var rec=grid.getStore().getAt(rowIndex);
                	var cti=Ext.create('AM.model.Ctist',{id:rec.get('id'),ct2:rec.get('ct2'),ind:rec.get('ind')});
                	this.up('grid').fireEvent('newassociation', grid, cti);
                }
    		},{
    			header : 'Conta',
    			dataIndex : 'ct2',
    			menuDisabled: true,
    			flex : 1,
    			editor: {
                    allowBlank: false
                }
    		}, {
    			header : 'N. Individual',
    			dataIndex : 'ind',
    			menuDisabled: true,
    			flex : 1,
    			editor: {
                    allowBlank: false
                }
    		}],
    		selModel: {
                selType: 'cellmodel'
            }
    	});
    	
    	this.addEvents(
                'newassociation'
        );
        
        this.callParent(arguments);
    }
});