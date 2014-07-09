Ext.define('AM.model.Papel', {
	extend: 'Ext.data.Model',
	fields: [{
        name: 'id',
        type: 'int'
    /*}, {
        name: 'prg',
        type: 'string'*/
    }, {
        name: 'nif',
        type: 'string'
    }, {
        name: 'nam',
        type: 'string'
    }, {
        name: 'dti',
        type: 'date',
        dateFormat:'Y-m-d'
    }, {
        name: 'dtf',
        type: 'date',
        dateFormat:'Y-m-d'
    }, {
        name: 'moe',
        type: 'string'
    }, {
        name: 'val',
        type: 'float'
    }]
});