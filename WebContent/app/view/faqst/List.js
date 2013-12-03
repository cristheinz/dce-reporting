Ext.define('AM.view.faqst.List' ,{
    extend: 'Ext.grid.Panel',

    alias: 'widget.faqstlist',
    id: 'module_faqst',
    
    title: 'FAQ Balcões',
    iconCls: 'module-icon',
    store: 'FaqstStore',
    closable: true,
    
    selType: 'checkboxmodel',
    
    tbar: [{
    	iconCls: 'add-icon',
    	action: 'add',
    	tooltip: 'Nova FAQ'
    },{
    	iconCls: 'remove-icon',
    	action: 'remove',
    	tooltip: 'Apagar items seleccionados'
    },'->',{
    	xtype: 'textfield', 
    	name: 'searchbox',
    	emptyText: 'Procurar',
    	width: 200,
    	enableKeyEvents : true
    },{
    	iconCls: 'refresh-icon',
    	action: 'refresh',
    	tooltip: 'Actualizar'
    }],
    
    initComponent: function() {
        this.columns = [{
			header : 'Palavras-chave',
			dataIndex : 'tag',
			flex : 1
		}, {
			header : 'Descrição',
			dataIndex : 'txt',
			flex : 1
		/*}, {
			header : 'flg',
			dataIndex : 'comiss',
			flex : 1*/
		}, {
			header : 'Rubricas associadas',
			sortable: false,
            menuDisabled: true,
			renderer : function(v, cellValues, rec) {
				var s="";
				rec.ctis().each(function(cti) {
		    		s+=cti.get('ct2')+'-'+cti.get('ind')+"; ";
		    	});
				return s;
			},
			flex : 1
		}];
        
        this.callParent(arguments);
    }
});