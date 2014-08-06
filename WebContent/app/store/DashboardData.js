Ext.define('AM.store.DashboardData', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    sorters: { property: 'name', direction : 'ASC' },
    
    fields: [{name: 'data1', type: 'number'},
             {name: 'data2', type: 'number'},
             {name: 'data3', type: 'number'},
             {name: 'data4', type: 'number'},
             {name: 'data5', type: 'number'}, 'name'],

    proxy: {
        type: 'ajax',
        api: {
        	read : 'posfmb/view.action?anomes='+Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -1),'Ym')
    	},
        reader: {
            type: 'json',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'name',
            root: 'data',
            messageProperty: 'message'  // <-- New "messageProperty" meta-data
        }
    }

});