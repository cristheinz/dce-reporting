Ext.define('AM.store.AuthData', {
    extend: 'Ext.data.Store',

    //model: 'AM.model.Branch',
    fields: ['key'],
    /*data: [
        {key: 'CRD76191-appBranch-E'},
        {key: 'CRD76191-appBranch-U'}
        //{user: 'CRD76191', service: 'appBranch', action: 'U'}
    ]*/
    //autoLoad: true,
    //autoSync: true,
    /*filters: [{
    	property: 'txt',
        value: /LISBOA - SALDANHA/
    }],*/

    
    proxy: {
        type: 'ajax',
        api: {
        	read : 'user/auth.action'//?user='+AM.user//Ext.state.Manager.get('username',''),
    	},
        reader: {
            type: 'json',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'key',
            root: 'keys',
            messageProperty: 'message'  // <-- New "messageProperty" meta-data
        }
    }
});