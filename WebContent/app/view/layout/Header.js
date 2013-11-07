Ext.define('AM.view.layout.Header', {
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
		icon: 'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/man-24-20.png',
		text: Ext.state.Manager.get('username',''),
		menu: [{
			text:'Importar ficheiro...',
			icon: 'https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519673-179_Upload-16.png',
			action:'upload'
		},{
			text:'Pasta pessoal',
			icon: 'https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519946-006_Folder-16.png',
			action:'open'
		}, {
            xtype: 'menuseparator'
        },{
            text:'Sair',
            icon: 'https://cdn1.iconfinder.com/data/icons/duesseldorf/16/sign-out.png',
            action:'logout'
        }],
	    margins: '0 15 0 0'
	}]
});
