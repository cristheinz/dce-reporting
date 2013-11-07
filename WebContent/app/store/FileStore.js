Ext.define('AM.store.FileStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.File',
    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
        	read : 'user/files.action'//?user='+AM.user
    	},
        reader: {
            type: 'json',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'files',
            messageProperty: 'message'  // <-- New "messageProperty" meta-data
        }/*,
    	writer: {
    		type: 'json',
    		encode: false,
    		root: 'data',
            writeAllFields: true
    	}*/
    }
});