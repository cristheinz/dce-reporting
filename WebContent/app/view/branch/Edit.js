Ext.define('AM.view.branch.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.branchedit',

    title: 'Editar sucursal',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'suc',
                        disabled: 'true',
                        fieldLabel: 'Suc'
                    },
                    {
                        xtype: 'textfield',
                        name : 'txt',
                        disabled: 'true',
                        fieldLabel: 'Txt'
                    },
                    {
                        xtype: 'datefield',
                        name : 'dtf',
                        fieldLabel: 'Dtf',
                        format: 'Y-m-d'
                    },
                    {
                        xtype: 'numberfield',
                        name : 'suct',
                        fieldLabel: 'SucT'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
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