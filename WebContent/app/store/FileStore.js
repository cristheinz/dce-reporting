Ext.define('AM.store.FileStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.File',
    
    autoLoad: false,
    autoSync: true,
    
    sortOnLoad: true,
    sorters: { property: 'creationDate', direction : 'DESC' },

    proxy: {
        type: 'ajax',
        api: {
        	read : 'file/list.action',
        	update: 'file/update.action',
        	destroy: 'file/delete.action'
    	},
        reader: {
            type: 'json',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'
        },
    	writer: {
    		type: 'json',
    		encode: false,
    		root: 'data',
    		allowSingle: true,
            writeAllFields: true
    	}
    }
    
});