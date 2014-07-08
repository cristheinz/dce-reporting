Ext.define('AM.view.papel.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.papeledit',

    title: 'Editar Programa',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'papelform'
            }
        ];

        this.buttons = [{
                text: 'Apagar',
                action: 'delete'
            },'->',{
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