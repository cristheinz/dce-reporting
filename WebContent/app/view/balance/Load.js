Ext.define('AM.view.balance.Load' ,{
	extend: 'Ext.form.Panel',

    alias: 'widget.balanceload',
	frame: true,
    bodyPadding: '10 10 0',
    layout: 'form',
    frame: false,
    height: 400,
    timeout: 900,//tempo em segundos, isto d� 15min � o tempo de espera da waitMsg
    
    tbar: [{
    	xtype: 'label',
       	html: 'O conte�do do ficheiro seleccionado ser� carregado na base de dados.<br/>'
       		+'Os totais das contas agregadoras ser�o recalculados e os ajustes, caso existam, aplicados.<br/>'
    }],

    items: [{
       	xtype: 'textfield',
       	readOnly: true,
       	fieldLabel: 'Ficheiro seleccionado',
       	//text: record.get('name')
       	name : 'name'
    },{
       	xtype: 'textfield',
       	fieldLabel: 'ID',
       	readOnly: true,
       	//value: record.get('id')
       	name : 'id'
    }],
    
    buttons: [{
    	text: 'Voltar',
    	action: 'back'
    },{
    	text: 'Iniciar',
    	action: 'run'
    }]
});