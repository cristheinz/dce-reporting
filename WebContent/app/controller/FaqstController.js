Ext.define('AM.controller.FaqstController', {
    extend: 'AM.controller.AbstractController',
    
    stores: ['CtistStore','FaqstStore'],
    models: ['Faqst','Ctist'],
    views: [
        'faqst.List',
        'faqst.Edit',
        'faqst.Ctis'
    ],
    
    refs: [{
    	ref: 'faqstlist',
    	selector: 'faqstlist'
    },{
    	ref: 'faqstedit',
    	selector: 'faqstedit'
    },{
    	ref: 'faqstctis',
    	selector: 'faqstctis'
    }],

    init: function() {
        this.control({
            'faqstlist': {
            	itemdblclick: this.openEditor
            },
            'faqstlist textfield[name=searchbox]': {
            	keyup: this.searchOnList
            },
            'faqstlist button[action=add]': {
            	click: this.addOnList
            },
            'faqstlist button[action=remove]': {
            	click: this.removeOnList
            },
            'faqstlist button[action=refresh]': {
            	click: this.refreshOnList
            },

            'faqstedit button[action=save]': {
                click: this.saveOnEditor
            },
            'faqstedit button[action=cancel]': {
                click: this.cancelOnEditor
            },

            'faqstctis': {
            	itemdblclick: this.removeAssociation
            }
        });
    },
    
    addOnList: function(button) {
    	var rec= Ext.create('AM.model.Faqst',{tag:'Nova FAQ'});
    	var store=this.getFaqstStoreStore();
    	store.add(rec);
    	//store.sync();//está comment pq só grava se modificar o regito
    },
    removeOnList: function(button) {
    	var store=this.getFaqstStoreStore();
    	//console.log(this.getFaqstlist().getSelectionModel().getSelection());
    	var recs=this.getFaqstlist().getSelectionModel().getSelection();
    	recs.forEach(function(rec){
    		//console.log(rec);
    		store.remove(rec);
        	store.sync();
    	});
    	//store.remove(recs);
    	//store.sync();
    },
    refreshOnList: function(button) {
    	var store = this.getFaqstlist().getStore();
    	store.reload();
    },
    
    openEditor: function(grid, record) {
    	if(this.getAccess('moduleFaqst','U')){
            var view = Ext.widget('faqstedit');
            view.down('form').loadRecord(record);
            
            var c = Ext.widget('container',{
            	width: 590,
                height: 230,
                layout: {
                    type: 'hbox',
                    align: 'stretch',
                    padding: 5
                },
                items: [{
                	itemId: 'grid1',
            		xtype: 'faqstctis',
         	    	store: record.ctis(),
         	    	flex: 1,
         	    	margins: '0 5 0 0'
            	},{
            		itemId: 'grid2',
            	    xtype: 'ctistlist',
            	    flex: 1
            	}]
                    
            });
            view.add(c);
    	}
    },

    searchOnList: function(textfield, e, eOpts ){
    	var store = this.getFaqstlist().getStore();
		store.clearFilter();
		if (textfield.value) {
			store.filter({
				property : 'tag',
				value : textfield.value,
				anyMatch : true,
				caseSensitive : false
			});
		}
    },

    saveOnEditor: function(button) {
        var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        
        record.set(values);
        
        //forces commit
        if(record.get('comiss')==0){
        	record.set('comiss',1);
    	}else {
    		record.set('comiss',0);
    	}
        win.close();
        
        /*record.ctis().each(function(rec){
        	rec.setDirty(false);
        });*/
        record.ctis().commitChanges();
        this.getFaqstStoreStore().sync();
    },
    
    cancelOnEditor: function(button) {
        var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord();
        
        for(var i=0;i<record.ctis().getRemovedRecords().length;i++) {
        	record.ctis().add(record.ctis().getRemovedRecords()[i]);
        };
        for(var i=0;i<record.ctis().getUpdatedRecords().length;i++) {
        	record.ctis().remove(record.ctis().getUpdatedRecords()[i]);
        };
        /*
        record.ctis().getRemovedRecords().forEach(function(rec){
        	record.ctis().add(rec);
        });
        
        record.ctis().getUpdatedRecords().forEach(function(rec){
        	record.ctis().remove(rec);
        });*/

        win.close();
        this.getFaqstStoreStore().rejectChanges();
    },
    
    
    removeAssociation: function(grid, record) {
    	var rec=this.getFaqstedit().down('form').getRecord();
    	/*if(rec.get('comiss')==0){
    		rec.set('comiss',1);
    	}else {
    		rec.set('comiss',0);
    	}*/
    	//var store = this.getFaqstctis().getStore();
    	var store = rec.ctis();
    	store.remove(record);
    	//store.commitChanges();
    	//rec.commit();
    }

});