Ext.define('AM.store.BatchJobExecutionStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.BatchJobExecution',
    //autoLoad: true,
    autoSync: true,
    
    sortOnLoad: true,
    sorters: { property: 'id', direction : 'DESC' },
    
    proxy: {
        type: 'ajax',
        api: {
        	destroy: 'admin/deleteJobExecutionEntry.action',
        	read : 'admin/listExecutedJobs.action'
    	},
        reader: {
            type: 'json',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'  // <-- New "messageProperty" meta-data
        },
    	writer: {
    		type: 'json',
    		encode: false,
    		root: 'data',
            writeAllFields: true
    	}
    }

    
});