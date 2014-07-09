Ext.define('AM.model.Branch', {
    extend: 'Ext.data.Model',
    
    fields: [
             'id',
             'suc', 
             'alf', 
             'txt', 
             {
            	 name: 'dti', 
            	 type: 'date',
                 dateFormat:'Y-m-d'
             }, {
            	 name: 'dtf', 
            	 type: 'date',
                 dateFormat:'Y-m-d'
             }, 
             'zon', 
             'suct',
             'lat',
             'lng'
            ]
});