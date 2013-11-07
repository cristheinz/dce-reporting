Ext.define('AM.view.file.Upload' ,{
	extend: 'Ext.form.Panel',

    alias: 'widget.upload',
    id: 'appupload',
    //title: 'Importar ficheiro...',
    width: 500,
    frame: true,
    bodyPadding: '10 10 0',
    
    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'side',
        labelWidth: 50
    },
    
    items: [/*{
        xtype: 'textfield',
        fieldLabel: 'Name'
    },*/{
    	/*
        xtype: 'filefield',
        id: 'form-file',
        emptyText: 'Selecionar um ficheiro',
        fieldLabel: 'Ficheiro',
        name: 'file-path',
        buttonText: '',
        buttonConfig: {
            iconCls: 'upload-icon'
        }*/
    	xtype: 'filefield',
    	name: 'file',
        fieldLabel: 'Ficheiro',
        buttonText: '',
        buttonConfig: {
            iconCls: 'upload-icon'
        }
    }],

    buttons: [{
        text: 'Save',
        action: 'save'
    },{
        text: 'Reset',
        action: 'reset'
    }]
    
});