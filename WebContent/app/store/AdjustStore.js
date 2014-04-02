Ext.define('AM.store.AdjustStore', {
    extend: 'Ext.data.Store',

    /*model: 'AM.model.Balance',
    proxy: {
        type: 'ajax',
        url: 'data/balancedata.json',
        encode: 'ISO-8859-1'
    },
    folderSort: true*/
    
    model: 'AM.model.Adjust',
    autoLoad: false,
    
    /*sortOnLoad: true,
    sorters: { property: 'id', direction : 'DESC' },*/

    proxy: {
        type: 'ajax',
        api: {
        	read : 'adjust/view.action'
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
    
    /*
    root: {
    	text: 'CTAS',
    	cls: null//,
        //expanded: true
    },*/
    
    /*
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