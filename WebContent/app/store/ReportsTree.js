Ext.define('AM.store.ReportsTree', {
    extend: 'Ext.data.TreeStore',

    autoLoad: false,

    /*proxy: {
    	type: 'ajax',
    	url: 'report/tree.action'
	},*/
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
            root: 'tree',
            messageProperty: 'message'  // <-- New "messageProperty" meta-data
        }
    },

    root: {
    	text: 'DCE',
    	cls: null,
        expanded: true
    }
});