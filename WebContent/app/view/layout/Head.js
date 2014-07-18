Ext.define('AM.view.layout.Head', {
    extend: 'Ext.container.Container',
    alias: 'widget.head',
    
    id: "app-header",
	layout: {type: "hbox",align: "middle"},
	items: [{
		xtype: "component",
		id: "app-header-title",
		//html: "DCE Reporting",
		html: "DCE Reporting",//" :: developed by <a href='http://swpfa027.gbp.corp.com/portal/page/portal/Intranet/SERVICOS_ACESSO/LISTA_TELEFONICA_RESULTADO?p_depart=&p_depart_desc=&p_balcao=&p_balcao_desc=&p_balcao_cod=&p_nome=&p_funcao=&p_username=CRD76191&p_extensao=&p_ext_tlm=&Submit=Pesquisar' target='_blank'>Christiano Domingues</a>",
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
			text:'Drive pessoal',
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
