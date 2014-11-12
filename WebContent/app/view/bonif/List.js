Ext.define('AM.view.bonif.List' ,{
    extend: 'Ext.grid.Panel',
    
    requires: [
               'Ext.selection.CellModel',
               'Ext.grid.*',
               'Ext.data.*',
               'Ext.util.*',
               'Ext.form.*'
           ],

    alias: 'widget.boniflist',
    id: 'module_bonif',
    
    title: 'Bonificados',
    iconCls: 'module-icon',
    store: 'BonifStore',
    closable: true,
    
    tbar: [{
    	iconCls: 'new-icon',
    	action: 'run',
    	tooltip: 'Gerar ficheiros'
    }],
    features: [{
    	ftype: 'summary'
	}],
    
    initComponent: function() {
    	this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
    	
    	Ext.apply(this, {
    		plugins: [this.cellEditing],
    		columns: [{
    					header : 'Documento',
    					dataIndex : 'doc',
    					flex : 1,
    					summaryType: 'count',
    			        summaryRenderer: function(value, summaryData, dataIndex) {
    			            return 'Saldo:'; 
    			        }
    				}, {
    					text: 'Valor',
    					flex: 1,
    					align: 'right',
    					dataIndex: 'val',
    					//summaryType: 'sum',
    					summaryType: function(records){
    						//console.log(records);
    					    var totals = records.reduce(function(sums, record){
    					    	//console.log(record.data.val);
    					    	var x=0;
    					    	if(record.data.dtl!=null) {
    					    		x=record.data.val;
    					    	}
    					    	if(record.data.dtp!=null) {
    					    		x=x-(record.data.val-record.data.val_i);
    					    	}
    					    	if(record.data.dti!=null) {
    					    		x=x-record.data.val_i;
    					    	}
    					    	
    					      	return [sums[0] + x, 
    					                sums[1] + 0];
    					    }, [0,0]);

    					    //return (totals[0] * totals[1]) / 100;
    					    return totals[0];
    					},
    					renderer: function(v,p,r){
    						return Ext.util.Format.number(v, '0.000,00/i');
    					}
    				}, {
    					text: 'Imposto',
    					flex: 1,
    					align: 'right',
    					dataIndex: 'vali',
    					renderer: function(v,p,r){
    						return Ext.util.Format.number(v, '0.000,00/i');
    					}
    				}, {
    					header : 'Ficheiro',
    					dataIndex : 'fname',
    					flex : 3
    				}, {
    					header : 'Envio',
    					dataIndex : 'dts',
    					flex : 1,
    					xtype : 'datecolumn',
    					format : 'Y-m-d',
    					editor: {
    	                    xtype: 'datefield',
    	                    format: 'Y-m-d'
    	                }
    				}, {
    					header : 'Processamento',
    					dataIndex : 'dtp',
    					flex : 1,
    					xtype : 'datecolumn',
    					format : 'Y-m-d',
    					editor: {
    	                    xtype: 'datefield',
    	                    format: 'Y-m-d'
    	                }
    				}, {
    					header : 'Proc. Imposto',
    					dataIndex : 'dti',
    					flex : 1,
    					xtype : 'datecolumn',
    					format : 'Y-m-d',
    					editor: {
    	                    xtype: 'datefield',
    	                    format: 'Y-m-d'
    	                }
    	                
    				}, {
    					header : 'Liquidação',
    					dataIndex : 'dtl',
    					flex : 1,
    					xtype : 'datecolumn',
    					format : 'Y-m-d',
    					editor: {
    	                    xtype: 'datefield',
    	                    format: 'Y-m-d'
    	                }
    				}, {
    					header : 'Proprietário',
    					dataIndex : 'owner',
    					flex : 1
    				}]
    	});
        this.callParent(arguments);
    }
});