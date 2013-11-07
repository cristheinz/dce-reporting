Ext.define('AM.model.Branch', {
    extend: 'Ext.data.Model',
    
    fields: ['id','suc', 'alf', 'txt', {name: 'dti', type: 'date'}, {name: 'dtf', type: 'date'}, 'zon', 'suct','lat','lng']
});