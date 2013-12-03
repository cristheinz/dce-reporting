Ext.define('AM.controller.CtistController', {
    extend: 'AM.controller.AbstractController',
    
    stores: ['CtistStore'],
    models: ['Ctist'],
    views: [
        'ctist.List'
    ],
    
    refs: [{
    	ref: 'ctistlist',
    	selector: 'ctistlist'
    }],

    init: function() {
        this.control({
            'ctistlist': {
            	beforerender: this.onRender,
            	//viewready: this.onReady,
            	//itemdblclick: this.createAssociation
            	newassociation: this.createAssociation
            },
            'ctistlist textfield[name=searchbox]': {
            	keyup: this.searchOnList
            },
            'ctistlist button[action=add]': {
            	click: this.addOnList
            }
            
        });
    },
    
    onRender: function() {
    	Ext.getStore('CtistStore').load();
    },
    
    addOnList: function(button) {
    	var rec= Ext.create('AM.model.Ctist');
    	var store=this.getCtistStoreStore();
    	store.add(rec);
    	//store.sync();//está comment pq só grava se modificar o regito
    },
    
    /*onReady: function( grid, eOpts ){
    	var faq= this.getCtistlist().up('window').down('form').getRecord();
    	var faqstr= faq.ctis();
    	grid.store.each(function(rec){
    		if(faqstr.getById(rec.getId())){
    			grid.selModel.select(rec, true, true);
    		}
    		
    	});
    },*/
    
    createAssociation: function(grid, record) {
    	var rec= this.getCtistlist().up('window').down('form').getRecord();
    	/*if(rec.get('comiss')==0){
    		rec.set('comiss',1);
    	} else {
    		rec.set('comiss',0);
    	}*/
    	var store= rec.ctis();
    	if(!store.getById(record.getId())){
    		store.add(record);
    		store.last().setDirty();
    		//store.commitChanges();
    		//rec.commit();
    	}
    },

    searchOnList: function(textfield, e, eOpts ){
    	var store = this.getCtistlist().getStore();
		store.clearFilter();
		if (textfield.value) {
			store.filter({
				property : 'ct2',
				value : textfield.value,
				anyMatch : true,
				caseSensitive : false
			});
		}
    }

});