Ext.define('AM.store.BonifStore', {
    extend: 'Ext.data.Store',
    
    id : 'bonifStore',
    model: 'AM.model.Bonif',
    autoLoad: false,
    autoSync: true,

    proxy: {
        type: 'ajax',
        api: {
        	read : 'bonif/view.action',
            update: 'bonif/update.action'
            //destroy: 'bonif/delete.action'
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