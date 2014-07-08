Ext.define('AM.store.PapelEmiStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.PapelEmi',
    //autoLoad: true,
    autoSync: true,
    
    proxy: {
        type: 'ajax',
        api: {
        	create: 'papelEmi/create.action',
        	update: 'papelEmi/update.action',
        	destroy: 'papelEmi/delete.action',
        	read : 'papelEmi/list.action'
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