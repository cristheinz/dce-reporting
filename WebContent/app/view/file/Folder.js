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
    	        		expandable: false,
    	                text: 'Ficheiros Importados'//,
    	                //iconCls: 'module-icon',
    	                //leaf: true
    	            },{
    	            	id: 'listfregu',
    	            	expandable: false,
    	                text: 'Ficheiros Regularização'//,
    	                //iconCls: 'module-icon',
    	                //leaf: true
    	            },{
    	            	id: 'listseis',
    	            	expandable: false,
    	                text: 'Posição Analitica'//,
    	                //iconCls: 'module-icon',
    	                //leaf: true
    	            },{
    	            	id: 'listoths',
    	            	expandable: false,
    	                text: 'Outros ficheiros gerados'//,
    	                //iconCls: 'module-icon',
    	                //leaf: true
    	            }]
    	    }
    	});

        this.callParent(arguments);
    }
});