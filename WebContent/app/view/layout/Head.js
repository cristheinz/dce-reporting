Ext.define('AM.view.layout.Head', {
    extend: 'Ext.container.Container',
    alias: 'widget.head',
    
    id: "app-header",
	layout: {type: "hbox",align: "middle"},
	items: [{
		xtype: "component",
		id: "app-header-title",
		html: "DCE Reporting",
		flex: 1
	}, {
		xtype: 'button',
		name: 'account',
		scale: 'medium',
		iconCls: 'user-icon',
		text: Ext.state.Manager.get('username',''),
		menu: [{
			text:'Importar ficheiro...',
			iconCls: 'upload-icon',
			action:'upload'
		},{
			text:'Pasta pessoal',
			iconCls: 'folder-icon',
			action:'open'
		}, {
            xtype: 'menuseparator'
        },{
            text:'Sair',
            iconCls: 'signout-icon',
            action:'logout'
        }],
	    margins: '0 15 0 0'
	}]
});
