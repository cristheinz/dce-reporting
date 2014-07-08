Ext.define('AM.model.PapelEmi', {
	extend: 'Ext.data.Model',
	fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'papel',
        type: 'int'
    }, {
        name: 'emi',
        type: 'string'
    }, {
        name: 'nif',
        type: 'string'
    }, {
        name: 'nam',
        type: 'string'
    }, {
        name: 'suc',
        type: 'int'
    }, {
        name: 'dti',
        type: 'date'
    }, {
        name: 'dtf',
        type: 'date'
    }, {
        name: 'val',
        type: 'float'
    }]
});