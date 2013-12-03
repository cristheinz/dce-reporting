Ext.define('AM.view.faqst.Ctis' ,{
    extend: 'Ext.grid.Panel',
    
    alias: 'widget.faqstctis',
    layout: 'fit',
    autoScroll: true,
    
    initComponent: function() {
    	
    	Ext.apply(this, {
    		columns: [{
    			header : 'Contas associadas',
    			sortable: false,
                menuDisabled: true,
    			renderer : function(v, cellValues, rec) {
    				//console.log(rec);
    				return rec.get('ct2')+'-'+rec.get('ind');
    			},
    			flex : 1
    		}]
    	});
    	
        this.callParent(arguments);
    }
});