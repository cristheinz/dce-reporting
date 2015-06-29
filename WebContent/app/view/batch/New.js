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
                   	html: 'Antes enviar o pedido de execução deve:<br/>'
                   		+'1. Verificar se os ficheiros de entrada estão carregados na directoria.<br/>'
                   		+'2. Verificar se todos os processos necessários para a execução foram executados.<br/>'
                }],
                items: [
                    {
                    	xtype:'combo',
                        fieldLabel:'Procedure',
                        name:'job',
                        queryMode:'local',
                        store:['bonif','cambi','crvcd','capital','corep','fgd','finrep','perio','posfm2'],
                        displayField:'job',
                        autoSelect:true,
                        forceSelection:true,
                        allowBlank:false 
                    },
                    {
                        xtype: 'numberfield',
                        name : 'anomes',
                        fieldLabel: 'Parametro',
                        allowBlank:false 
                        /*minValue : 199912,
                        maxValue : 999999*/
                    },
                    {
                        xtype: 'textfield',
                        name : 'notify',
                        fieldLabel: 'Notificar',
                        allowBlank:true 
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