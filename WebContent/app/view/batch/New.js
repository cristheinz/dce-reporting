Ext.define('AM.view.batch.New', {
    extend: 'Ext.window.Window',
    alias: 'widget.batchnew',

    title: 'Executar Novo Batch',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                bodyPadding: '10 10 0',
                //layout: 'form',
                frame: false,
                width: 450,
                tbar: [{
                	xtype: 'label',
                   	html: 'Antes enviar o pedido de execu��o deve:<br/>'
                   		+'1. Verificar se os ficheiros de entrada est�o carregados na directoria.<br/>'
                   		+'2. Verificar se todos os processos necess�rios para a execu��o foram executados.<br/>'
                }],
                items: [
                    {
                    	xtype:'combo',
                        fieldLabel:'Procedure',
                        name:'job',
                        queryMode:'local',
                        store:['capital','corep','fgd','posfm'],
                        displayField:'job',
                        autoSelect:true,
                        forceSelection:true,
                        allowBlank:false 
                    },
                    {
                        xtype: 'numberfield',
                        name : 'anomes',
                        fieldLabel: 'Ano e mes',
                        allowBlank:false ,
                        minValue : 199912,
                        maxValue : 999999
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Executar',
                action: 'run'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});