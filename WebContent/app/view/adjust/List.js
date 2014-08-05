Ext.define('AM.view.adjust.List' ,{
    extend: 'Ext.grid.Panel',
    
    requires: [
               'Ext.selection.CellModel',
               'Ext.grid.*',
               'Ext.data.*',
               'Ext.util.*',
               'Ext.form.*'
           ],

    alias: 'widget.adjustlist',
    //id: 'module_ctist',
    
    store: 'AdjustStore',
    layout: 'fit',
    multiSelect: true,
    //enableKeyEvents: true,
    
    tbar: [{
    	iconCls: 'add-icon',
    	action: 'add',
    	tooltip: 'Adicionar'
    },{
    	iconCls: 'remove-icon',
    	action: 'remove',
    	hidden: true,
    	tooltip: 'Apagar'
    },'->',{
    	text: 'Aplicar ajustes',
    	action: 'apply',
    	hidden: false
    /*},'->',{
    	xtype: 'textfield', 
    	name: 'searchbox',
    	emptyText: 'Procurar',
    	width: 200,
    	enableKeyEvents : true*/
    }],
    
    initComponent: function() {
    	this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 2
        });
    	
    	Ext.apply(this, {
    		plugins: [this.cellEditing],
    		columns: [{
    			header : 'Conta Valor',
    			//dataIndex : 'cta',
    			menuDisabled: true,
    			flex : 1,
    			renderer: function(v, cellValues, rec) {
    				//console.log(rec.dirty);
    				if(rec.dirty)
    					cellValues.css+=' x-grid-dirty-cell';
    				return rec.get('ct2')=='1' ? rec.get('cta')+'.'+rec.get('ct2') : rec.get('ct2')=='0' ? '' : rec.get('ct2');
    			},
    			editor: {
    				xtype: 'ctvstlist'
                    //allowBlank: false
                }
    		/*}, {
    			header : 'Conta (ES)',
    			dataIndex : 'ct2',
    			menuDisabled: true,
    			flex : 1,
    			editor: {
                    allowBlank: false
                }*/
    		}, {
    			header : 'Débito',
    			dataIndex : 'vald',
    			menuDisabled: true,
    			align: 'right',
    			renderer: function(v,p,r){
                	return Ext.util.Format.number(v, '0.000,00/i');
                },
    			flex : 1,
    			editor: {
                    allowBlank: false
                }
    		}, {
    			header : 'Crédito',
    			dataIndex : 'valc',
    			menuDisabled: true,
    			align: 'right',
    			renderer: function(v,p,r){
                	return Ext.util.Format.number(v, '0.000,00/i');
                },
    			flex : 1,
    			editor: {
                    allowBlank: false
                }
    		}]
    		//selType: 'checkboxmodel',
    		/*selModel: {
                selType: 'cellmodel'
            }*/
    	});
    	
    	/*this.addEvents(
                'newassociation'
        );*/
        
        this.callParent(arguments);
    }
});