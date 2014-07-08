Ext.define('AM.view.papel.New', {
    extend: 'Ext.window.Window',
    alias: 'widget.papelnew',

    title: 'Novo Programa',
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