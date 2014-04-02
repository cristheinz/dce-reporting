Ext.define('AM.model.Adjust', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'anomes',
        type: 'int'
    }, {
        name: 'cta',
        type: 'string'
    }, {
        name: 'ct2',
        type: 'int'
    }, {
        name: 'vald',
        type: 'float'
    }, {
        name: 'valc',
        type: 'float'
    }, {
        name: 'flg',
        type: 'int'
    }]
});