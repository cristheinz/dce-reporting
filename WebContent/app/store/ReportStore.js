Ext.define('AM.store.ReportStore', {
    extend: 'Ext.data.TreeStore',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        api: {
        	read : 'report/tree.action'
    	},
        reader: {
            type: 'json',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'
        }
    },

    root: {
    	text: 'DCE',
    	cls: null,
        expanded: true
    }
});