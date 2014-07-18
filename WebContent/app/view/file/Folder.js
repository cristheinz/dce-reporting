Ext.define('AM.view.file.Folder' ,{
    extend: 'Ext.tree.Panel',

    alias: 'widget.filefolder',
    rootVisible: false,
    useArrows: true,
    singleExpand: true,

    initComponent: function() {
    	Ext.apply(this, {
    		//id: 'menutree',
    		root: {
    	        text: 'Pastas',
    	        expanded: true,
    	        children: [{
    	        		id: 'listall',
    	        		expanded: true,
    	                text: 'Ficheiros Importados'//,
    	                //iconCls: 'module-icon',
    	                //leaf: true
    	            },{
    	            	id: 'listfregu',
    	                text: 'Ficheiros Regularização'//,
    	                //iconCls: 'module-icon',
    	                //leaf: true
    	            },{
    	            	id: 'listseis',
    	                text: 'Posição Analitica'//,
    	                //iconCls: 'module-icon',
    	                //leaf: true
    	            /*},{
    	                text: 'Papel comercial',
    	                expanded: true,
    	                children: [{
    	                		id: 'module41',
    	                        text: 'Cliente e emissões',
    	                        iconCls: 'module-icon',
    	                        leaf: true
    	                    },{
    	                    	id: 'module42',
    	                        text: 'Gerar ficheiro',
    	                        iconCls: 'module-icon',
    	                        leaf: true
    	                    }]*/
    	            }]
    	    }
    	});

        this.callParent(arguments);
    }
});