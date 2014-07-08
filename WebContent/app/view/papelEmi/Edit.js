Ext.define('AM.view.papelEmi.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.papelemiedit',

    title: 'Editar Emiss�o',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'papelemiform'
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