Ext.define('AM.model.BatchStepExecution', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'jobid',
        type: 'int'
    }, {
        name: 'step',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    }, {
        name: 'msg',
        type: 'string'
    }, {
        name: 'dti',
        type: 'date',
        dateFormat:'H:i:s.u'
    }, {
        name: 'dtf',
        type: 'date',
        dateFormat:'H:i:s.u'
    }, {
        name: 'runtime',
        type: 'string'
    }]
});