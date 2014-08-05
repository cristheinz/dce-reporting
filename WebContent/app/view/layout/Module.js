Ext.define('AM.view.layout.Module' ,{
    extend: 'Ext.tree.Panel',

    alias: 'widget.module',
    rootVisible: false,
    useArrows: true,

    initComponent: function() {
    	Ext.apply(this, {
    		//id: 'menutree',
    		root: {
    	        text: 'M�dulos',
    	        expanded: true,
    	        children: [{
    	        		id: 'moduleBalance',
    	                text: 'Balancete',
    	                iconCls: 'module-icon',
    	                leaf: true
    	            },{
    	        		id: 'moduleBatch',
    	                text: 'Execu��es BATCH',
    	                iconCls: 'module-icon',
    	                leaf: true
    	            },{
    	            	id: 'module2',
    	                text: 'Controlo de Contas',
    	                iconCls: 'module-icon',
    	                leaf: true
    	            },{
    	            	id: 'module3',
    	                text: 'Cr�dito Vencido',
    	                iconCls: 'module-icon',
    	                leaf: true
    	            },{
    	            	id: 'moduleFaqst',
    	                text: 'FAQ Balc�es',
    	                iconCls: 'module-icon',
    	                leaf: true
    	            },{
    	            	id: 'modulePapel',
    	                text: 'Papel Comercial',
    	                iconCls: 'module-icon',
    	                leaf: true
    	            /*},{
    	                text: 'Papel comercial',
    	                expanded: true,
    	                children: [{
    	                		id: 'module41',
    	                        text: 'Cliente e emiss�es',
    	                        iconCls: 'module-icon',
    	                        leaf: true
    	                    },{
    	                    	id: 'module42',
    	                        text: 'Gerar ficheiro',
    	                        iconCls: 'module-icon',
    	                        leaf: true
    	                    }]*/
    	            },{
    	            	id: 'moduleBranch',
    	                text: 'Sucursais',
    	                iconCls: 'module-icon',
    	                leaf: true
    	            }]
    	    }
    	});

        this.callParent(arguments);
    }
});