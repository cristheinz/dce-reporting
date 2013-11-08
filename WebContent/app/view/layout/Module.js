Ext.define('AM.view.layout.Module' ,{
    extend: 'Ext.tree.Panel',

    alias: 'widget.module',

    initComponent: function() {
    	Ext.apply(this, {
    		//id: 'menutree',
    		root: {
    	        text: 'M�dulos',
    	        expanded: true,
    	        children: [{
    	        		id: 'moduleBalance',
    	                text: 'Balancete',
    	                leaf: true
    	            },{
    	            	id: 'module2',
    	                text: 'Controlo de contas',
    	                leaf: true
    	            },{
    	            	id: 'module3',
    	                text: 'Cr�dito Vencido',
    	                leaf: true
    	            },{
    	                text: 'Papel comercial',
    	                expanded: true,
    	                children: [{
    	                		id: 'module41',
    	                        text: 'Cliente e emiss�es',
    	                        leaf: true
    	                    },{
    	                    	id: 'module42',
    	                        text: 'Gerar ficheiro',
    	                        leaf: true
    	                    }]
    	            },{
    	            	id: 'moduleBranch',
    	                text: 'Sucursais',
    	                leaf: true
    	            }]
    	    }
    	});

        this.callParent(arguments);
    }
});