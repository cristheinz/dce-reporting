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
		//iconCls: 'user-icon',
		icon: 'icons/man-24-20.png',
		//icon: 'http://swpfa027.gbp.corp.com/portal/pls/portal/banco.ficheiro_download_2param?p_tab=listatelef_colab&p_col_blob=foto&p_col_mime=foto_mimetype&p_col_ref=num_colab&p_val_ref=1182&p_col_ref2=id_sociedade&p_val_ref2=1',
		iconCls: 'user-'+Ext.String.format(document.getElementById("user").value),
		//text: Ext.state.Manager.get('username'),
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
