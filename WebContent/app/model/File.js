Ext.define('AM.model.File', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    /*}, {
        name: 'data',
        type: 'string'
    }, {
        name: 'userId',
        type: 'int'*/
    }, {
        name: 'creationDate',
        type: 'date',
        dateFormat:'Y-m-d'
    }, {
        name: 'fid',
        type: 'string'
    }, {
        name: 'title',
        type: 'string'
    }, {
        name: 'dts',
        type: 'date',
        dateFormat:'Y-m-d'
    }, {
        name: 'dtp',
        type: 'date',
        dateFormat:'Y-m-d'
    /*}, {
        name: 'pdata',
        type: 'string'*/
    }, {
        name: 'siz',
        type: 'int'
    }]
});