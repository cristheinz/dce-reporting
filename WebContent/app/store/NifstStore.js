Ext.define('AM.store.NifstStore', {
    extend: 'Ext.data.Store',

    model: 'AM.model.Nifst',
    //autoLoad: true,
    autoSync: true,
    
    proxy: {
        type: 'ajax',
        api: {
        	//create: 'nifst/create.action',
        	update: 'nifst/update.action',
        	//destroy: 'nifst/delete.action',
        	read : 'nifst/search.action'
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
    }/*,

    
    listeners: {
    	beforeload: function (store, operation, eOpts) {
    		if(operation.node.data.id!='root'){
    			//console.log(operation.node.data.anomes);
    			//console.log(operation.node.data.cta);
    			var anomes = operation.node.data.anomes;
                var cta = operation.node.data.cta;
                operation.params.anomes = anomes;
                operation.params.node = cta;
            } else {
            	if(!operation.params.anomes)
            		operation.params.anomes = Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -1),'Ym');
                operation.params.node = "root";
            }
        }
    }*/


    
});