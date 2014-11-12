Ext.define('AM.model.Bonif', {
    extend: 'Ext.data.Model',
    
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'doc',
        type: 'string'
    }, {
        name: 'val',
        type: 'float'
    }, {
        name: 'vali',
        type: 'float'
    }, {
        name: 'fname',
        type: 'string'
    }, {
    	name: 'dts', 
   	 	type: 'date',
        dateFormat:'Y-m-d'
    }, {
    	name: 'dtp', 
   	 	type: 'date',
        dateFormat:'Y-m-d'
    }, {
    	name: 'dti', 
   	 	type: 'date',
        dateFormat:'Y-m-d'
    }, {
    	name: 'dtl', 
   	 	type: 'date',
        dateFormat:'Y-m-d'
    }, {
        name: 'owner',
        type: 'string'
    }]
});