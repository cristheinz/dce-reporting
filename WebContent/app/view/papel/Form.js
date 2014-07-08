Ext.define('AM.view.papel.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.papelform',

    items: [{
    			/*xtype: 'textfield',
    			name : 'prg',
    			//disabled: 'true',
    			fieldLabel: 'Programa'
        	},{*/
    			xtype: 'textfield',
    			name : 'id',
    			disabled: 'true',
    			fieldLabel: 'Programa (ID)'
        	},{
        		xtype: 'textfield',
                name : 'nif',
                disabled: 'true',
                fieldLabel: 'NIF'
        	},{
        		xtype: 'textfield',
                name : 'nam',
                disabled: 'true',
                fieldLabel: 'Nome'
            },{
            	xtype: 'datefield',
                name : 'dti',
                fieldLabel: 'Dti',
                format: 'Y-m-d'
            },{
            	xtype: 'datefield',
                name : 'dtf',
                fieldLabel: 'Dtf',
                format: 'Y-m-d'
            },{
            	xtype: 'textfield',
                name : 'moe',
                fieldLabel: 'Moeda'
            },{
            	xtype: 'numberfield',
                name : 'val',
                fieldLabel: 'Limite'
            }]
});