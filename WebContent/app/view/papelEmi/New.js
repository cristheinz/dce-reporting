Ext.define('AM.view.papelEmi.New', {
    extend: 'Ext.window.Window',
    alias: 'widget.papeleminew',

    title: 'Nova Emissão',
    maximizable: true,
    width: 600,
    layout: 'fit',
    modal: true,
    //autoShow: true,

    initComponent: function() {
        
        this.buttons = [{
                text: 'Gravar',
                action: 'save'
            },{
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);
    }
});