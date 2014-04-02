Ext.define('AM.store.CtvstStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.Ctvst',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        api: {
        	read : 'ctvst/view.action'
    	},
        reader: {
            type: 'json',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'
        }
    }
    
});