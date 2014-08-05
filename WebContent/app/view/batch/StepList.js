Ext.define('AM.view.batch.StepList' ,{
    extend: 'Ext.grid.Panel',
    
    alias: 'widget.batchsteplist',
    
    store: 'BatchStepExecutionStore',
    layout: 'fit',
    
    tbar: ['->',{
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
    			hidden: true,
    			flex : 1
    		},{
    			header : 'JOB',
    			dataIndex : 'jobid',
    			menuDisabled: true,
    			hidden: true,
    			flex : 1
    		},{
    			header : 'STEP',
    			dataIndex : 'step',
    			menuDisabled: true,
    			flex : 2
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
    			header : 'Mensagem',
    			dataIndex : 'msg',
    			menuDisabled: true,
    			flex : 4
    		},{
    			header : 'Inicio',
    			dataIndex : 'dti',
    			menuDisabled: true,
    			flex : 1,
    			xtype : 'datecolumn',
    			format : 'H:i:s.u'
    			//renderer: Ext.util.Format.dateRenderer('Y-m-d')
    		},{
    			header : 'Fim',
    			dataIndex : 'dtf',
    			menuDisabled: true,
    			flex : 1,
    			xtype : 'datecolumn',
    			format : 'H:i:s.u'
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