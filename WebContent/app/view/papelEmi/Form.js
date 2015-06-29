Ext.define('AM.view.papelEmi.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.papelemiform',

    items: [{
    			/*xtype: 'textfield',
    			name : 'prg',
    			//disabled: 'true',
    			fieldLabel: 'Programa'
        	},{*/
    			xtype: 'textfield',
    			name : 'papel',
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
    			xtype: 'numberfield',
    			name : 'emi',
    			//disabled: 'true',
    			fieldLabel: 'Emissão (ID)'
        	},{
        		xtype: 'textfield',
                name : 'suc',
                fieldLabel: 'Sucursal'
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
            	xtype: 'numberfield',
                name : 'val',
                fieldLabel: 'Valor'
        	},{
        		xtype: 'textfield',
                name : 'isin',
                //disabled: 'true',
                fieldLabel: 'ISIN'
            }]
});