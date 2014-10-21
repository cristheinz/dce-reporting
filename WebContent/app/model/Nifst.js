Ext.define('AM.model.Nifst', {
	extend: 'Ext.data.Model',
	fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'nif',
        type: 'string'
    }, {
        name: 'sbp',
        type: 'int'
    }, {
        name: 'sec',
        type: 'int'
    }, {
        name: 'cae',
        type: 'string'
    }, {
        name: 'big',
        type: 'int'
    }, {
        name: 'nam',
        type: 'string'
    }]
});