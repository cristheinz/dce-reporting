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
    autoSave: false,
    
    /*sortOnLoad: true,
    sorters: { property: 'id', direction : 'DESC' },*/

    proxy: {
        type: 'ajax',
        api: {
        	read : 'adjust/view.action',
        	create: 'adjust/create.action',
        	update: 'adjust/update.action',
            destroy: 'adjust/delete.action'
    	},
        reader: {
            type: 'json',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'
        },
    	writer: {
    		type: 'json',
    		encode: false,
    		root: 'data',
            writeAllFields: true,
            allowSingle: false/*isto faz com que no json seja sempre enviado um array para o server 
            						{data:[{id:0},{id:99}]} 
            					mesmo se for só um registo vai assim:
            						{data:[{id:99}]} 
            					caso contrario ficaria:
            						{data:{id:99}}
            					*/ 
    	}
    }
    
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