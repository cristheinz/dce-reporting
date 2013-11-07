Ext.define('AM.view.layout.ApplicationsMenu' ,{
    extend: 'Ext.tree.Panel',

    alias: 'widget.applicationsmenu',
    
    
    initComponent: function() {
    	Ext.apply(this, {
    		id: 'menutree',
    		root: {
    	        text: 'Menu',
    	        expanded: true,
    	        children: [{
    	        		id: 'appBalance',
    	                text: 'Balancete',
    	                leaf: true
    	            },{
    	            	id: 'app2',
    	                text: 'Controlo de contas',
    	                leaf: true
    	            },{
    	            	id: 'app3',
    	                text: 'Crédito Vencido',
    	                leaf: true
    	            },{
    	                text: 'Papel comercial',
    	                expanded: true,
    	                children: [{
    	                		id: 'app41',
    	                        text: 'Cliente e emissões',
    	                        leaf: true
    	                    },{
    	                    	id: 'app42',
    	                        text: 'Gerar ficheiro',
    	                        leaf: true
    	                    }]
    	            },{
    	            	id: 'appBranch',
    	                text: 'Sucursais',
    	                leaf: true
    	            }]
    	    }
    	});

        this.callParent(arguments);
    }
});