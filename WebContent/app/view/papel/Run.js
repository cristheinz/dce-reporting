Ext.define('AM.view.papel.Run', {
    extend: 'Ext.window.Window',
    alias: 'widget.papelrun',

    title: 'Gerar ficheiro Papel Comercial',
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
                /*tbar: [{
                	xtype: 'label',
                   	html: 'Antes enviar o pedido de execução deve:<br/>'
                   		+'1. Verificar se os ficheiros de entrada estão carregados na directoria.<br/>'
                   		+'2. Verificar se todos os processos necessários para a execução foram executados.<br/>'
                }],*/
                items: [
                    {
                        xtype: 'numberfield',
                        name : 'anomes',
                        fieldLabel: 'Ano e mes',
                        value: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -1),'Ym'),
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