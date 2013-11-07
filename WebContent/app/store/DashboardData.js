Ext.define('AM.store.DashboardData', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    fields: [{name: 'data1', type: 'number'},
             {name: 'data2', type: 'number'},
             {name: 'data3', type: 'number'},
             {name: 'data4', type: 'number'},
             {name: 'data5', type: 'number'}, 'name'],

    proxy: {
        type: 'ajax',
        api: {
        	read : 'posfmb/view.action?anomes=201309'
    	},
        reader: {
            type: 'json',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'name',
            root: 'dash',
            messageProperty: 'message'  // <-- New "messageProperty" meta-data
        }
    }

});