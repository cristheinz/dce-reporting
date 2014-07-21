Ext.define('AM.view.file.Seis' ,{
	extend: 'Ext.form.Panel',

    alias: 'widget.fileseis',
	//frame: true,
    //bodyPadding: '10 10 0',
    layout: 'form',
    //height: 400,
    
    /*tbar: [{
    	xtype: 'label',
       	html: 'O conteúdo do ficheiro seleccionado será carregado na base de dados.<br/>'
       		+'Os totais das contas agregadoras serão recalculados e os ajustes, caso existam, aplicados.<br/>'
    }],*/

    items: [{
       	xtype: 'textfield',
       	readOnly: true,
       	fieldLabel: 'Ficheiro seleccionado',
       	//text: record.get('name')
       	name : 'name'
    },{
       	xtype: 'hiddenfield',
       	fieldLabel: 'ID',
       	readOnly: true,
       	//value: record.get('id')
       	name : 'id'
    },{
       	xtype: 'numberfield',
       	fieldLabel: 'Nº Colaboradores',
       	name : 'nemp'
    },{
       	xtype: 'numberfield',
       	fieldLabel: 'Nº Sucursais',
       	name : 'nsuc'
    },{
    	xtype: 'combo',
    	fieldLabel: 'Entidade',
    	name: 'bco',
    	store: new Ext.data.SimpleStore({
    		data: [
    			['0046', '0046 - Banco Popular Portugal'],
    			['0835', '0835 - Popular Gestão de Activos']
    		],
    		id: 0,
    		fields: ['value', 'text']
    	}),
    	valueField: 'value',
    	displayField: 'text',
    	triggerAction: 'all',
    	value: '0046',
    	editable: false
    },{
    	xtype: 'combo',
    	fieldLabel: 'Mercado',
    	name: 'mer',
    	store: new Ext.data.SimpleStore({
    		data: [
    			['0999', '0999 - Actividade Global'],
    			['0093', '0093 - Offshore Madeira']
    		],
    		id: 0,
    		fields: ['value', 'text']
    	}),
    	valueField: 'value',
    	displayField: 'text',
    	triggerAction: 'all',
    	value: '0999',
    	editable: false
    },{
    	xtype: 'combo',
    	fieldLabel: 'Estado',
    	name: 'tip',
    	store: new Ext.data.SimpleStore({
    		data: [
    			['1', '1 - Novo'],
    			['2', '2 - Alteração']
    		],
    		id: 0,
    		fields: ['value', 'text']
    	}),
    	valueField: 'value',
    	displayField: 'text',
    	triggerAction: 'all',
    	value: '1',
    	editable: false
    },{
    	xtype: 'datefield',
        name : 'dtr',
        fieldLabel: 'Data Referencia',
        format: 'Y-m-d'
    }],
    
    buttons: [{
    	text: 'OK',
    	action: 'create'
    },{
    	text: 'Cancelar',
    	action: 'cancel'
    }]
});