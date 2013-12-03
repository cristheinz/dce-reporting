Ext.define('AM.view.faqst.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.faqstedit',
    
    title: 'Editar FAQ',
    width: 600,
    height: 400,
    resizable: false,
    autoShow: true,
    modal: true,
    closable: false,
    
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                layout: 'form',
                frame: true,
                items: [
                    {
                        xtype: 'textfield',
                        name : 'tag',
                        fieldLabel: 'Palavras-chave'
                    }, {
                        xtype: 'textareafield',
                        name : 'txt',
                        fieldLabel: 'Texto'
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
                action: 'cancel'
                //handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});