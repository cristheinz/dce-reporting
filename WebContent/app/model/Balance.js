Ext.define('AM.model.Balance', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'cta',
        type: 'string'
    }, {
        name: 'nam',
        type: 'string'
    }, {
        name: 'deb',
        type: 'float'
    }, {
        name: 'cre',
        type: 'float'
    }, {
        name: 'done',
        type: 'boolean'
    }]
});