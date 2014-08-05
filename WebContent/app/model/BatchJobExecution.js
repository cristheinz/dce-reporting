Ext.define('AM.model.BatchJobExecution', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'job',
        type: 'string'
    }, {
        name: 'anomes',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    }, {
        name: 'dti',
        type: 'date',
        dateFormat:'Y-m-d'
    }, {
        name: 'runtime',
        type: 'string'
    }]
});