Ext.define('AM.store.Branches', {
    extend: 'Ext.data.Store',

    model: 'AM.model.Branch',
    /*data: [
        {suc: '1', txt: 'Rua Augusta'},
        {suc: '2', txt: 'Saldanha'}
    ]*/
    autoLoad: false,
    //autoSync: true,
    /*filters: [{
    	property: 'txt',
        value: /LISBOA - SALDANHA/
    }],*/

    proxy: {
        type: 'ajax',
        api: {
        	//read: 'data/branches.json',
        	//update: 'data/updateBranches.json'
        	read : 'branch/view.action',
       		//create : 'branch/create.action',
            update: 'branch/update.action'
            //destroy: 'branch/delete.action'
    	},
        reader: {
            type: 'json',
            /*root: 'branches',
            successProperty: 'success'*/
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'branches',
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