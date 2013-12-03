Ext.define('AM.model.Faqst', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'id',     type: 'int'},
        {name: 'comiss', type: 'int'},
        {name: 'tag',    type: 'string'},
        {name: 'txt',    type: 'string'}
    ],
    
    hasMany: { model: 'AM.model.Ctist', name:'ctis' }

});