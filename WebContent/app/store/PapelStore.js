Ext.define('AM.store.PapelStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.Papel',
    //autoLoad: true,
    autoSync: true,
    
    proxy: {
        type: 'ajax',
        api: {
        	create: 'papel/create.action',
        	update: 'papel/update.action',
        	destroy: 'papel/delete.action',
        	read : 'papel/list.action'
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