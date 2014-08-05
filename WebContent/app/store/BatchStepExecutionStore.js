Ext.define('AM.store.BatchStepExecutionStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.BatchStepExecution',
    //autoLoad: true,
    //autoSync: true,
    
    sortOnLoad: true,
    sorters: { property: 'dtf', direction : 'DESC' },
    
    proxy: {
        type: 'ajax',
        api: {
        	read : 'admin/listExecutedSteps.action'
    	},
        reader: {
            type: 'json',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'  // <-- New "messageProperty" meta-data
        }
    }

    
});