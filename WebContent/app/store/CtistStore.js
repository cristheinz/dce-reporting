Ext.define('AM.store.CtistStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.Ctist',
    //autoLoad: true,
    autoSync: true,
    
    proxy: {
        type: 'ajax',
        api: {
        	create: 'cti/create.action',
        	read : 'cti/list.action',
        	update: 'cti/update.action'
        	//destroy: 'cti/delete.action'
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