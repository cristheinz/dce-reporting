Ext.define('AM.view.batch.JobList' ,{
    extend: 'Ext.grid.Panel',
    
    alias: 'widget.batchjoblist',
    
    store: 'BatchJobExecutionStore',
    layout: 'fit',
    selType: 'checkboxmodel',
    
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
    	xtype: 'textfield', 
    	name: 'searchbox',
    	emptyText: 'Procurar',
    	width: 200,
    	enableKeyEvents : true
    },{
    	iconCls: 'refresh-icon',
    	action: 'refresh',
    	tooltip: 'Actualizar'
    }],
    
    initComponent: function() {
    	Ext.apply(this, {
    		columns: [{
    			header : 'ID',
    			dataIndex : 'id',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'JOB',
    			dataIndex : 'job',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'Referencia',
    			dataIndex : 'anomes',
    			menuDisabled: true,
    			flex : 1
    		},{
    			header : 'Estado',
    			dataIndex : 'status',
    			menuDisabled: true,
    			flex : 1,
    			renderer : function(value, meta) {
    				if(value == 'COMPLETED') {
    		            meta.style = "color:green;";
    		        }; 
    		        if(value == 'FAILED') {
    		            meta.style = "color:red;";
    		        }
    		        return value;
    		    }
    		},{
    			header : 'Criado em',
    			dataIndex : 'dti',
    			menuDisabled: true,
    			flex : 1,
    			xtype : 'datecolumn',
    			format : 'Y-m-d'
    			//renderer: Ext.util.Format.dateRenderer('Y-m-d')
    		},{
    			header : 'Tempo de processamento',
    			dataIndex : 'runtime',
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