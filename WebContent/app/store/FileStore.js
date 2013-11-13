Ext.define('AM.store.FileStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.File',
    autoLoad: false,
    autoSync: true,

    proxy: {
        type: 'ajax',
        api: {
        	read : 'file/list.action',
        	destroy: 'file/delete.action'
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