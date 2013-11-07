Ext.define('AM.view.layout.ReportsMenu' ,{
    extend: 'Ext.tree.Panel',

    alias: 'widget.reportsmenu',
    store: 'ReportsTree',
    initComponent: function() {
    	/*Ext.apply(this, {
    		//id: 'menutree',
    		root: {
    	        text: 'Menu',
    	        expanded: true,
    	        children: [{
    	        	text: 'Listagens',
	                expanded: true,
	                children: [{
	                		text: 'Sucursais',
	                		id: 'http://10.84.4.118:8181/birt/frameset?__report=PCplafonds.rptdesign&amp;p0=&__format=pdf',
	                		leaf: true
	                    },{
	                        text: 'Outro relatório',
	                    	//id: 'app42',
	                        leaf: true
	                    }]
    	                
				},{
    	        	text: 'Mapas Mensais',
	                expanded: true,
	                children: [{
	                		text: 'YYYY',
	                		//leaf: true,
	                		children: [{
		                		text: 'YYYYMM',
		                		//leaf: true,
		                		children: [{
			                		text: 'Pack',
			                		//leaf: true,
			                		children: [{
				                		text: 'Report',
				                		leaf: true
				                    }]
			                    }]
		                    }]
	                    }]
    	                
				},{
    	        	text: 'Outros Relatorios',
	                expanded: true,
	                children: [{
	                        text: 'relatorio',
	                    	//id: 'app42',
	                        leaf: true
	                    }]
    	                
				}]
            }
   	    });*/

        this.callParent(arguments);
	}
});