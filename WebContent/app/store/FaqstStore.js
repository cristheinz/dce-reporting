Ext.define('AM.store.FaqstStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.Faqst',
    
    proxy: {
        type: 'ajax',
        api: {
        	create: 'faq/create.action',
        	read : 'faq/list.action',
        	update: 'faq/update.action',
        	destroy: 'faq/delete.action'
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
    		type: 'associatedjson',
    		//type: 'json',
    		encode: false,
    		root: 'data',
            writeAllFields: true
    	}
    }

    
});