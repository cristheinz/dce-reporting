Ext.define('AM.controller.NifstController', {
    extend: 'AM.controller.AbstractController',
    
    stores: ['NifstStore'],
    models: ['Nifst'],
    views: [
        'nifst.List'
    ],
    
    refs: [{
    	ref: 'nifstlist',
    	selector: 'nifstlist'
    }],

    init: function() {
        this.control({
            'nifstlist': {
            	beforerender: this.onRender/*,
            	itemdblclick: this.onEdit*/
            },
            'nifstlist textfield[name=searchbox]': {
            	keyup: this.searchOnList
            /*},
            'papellist button[action=add]': {
            	click: this.addOnList
            },
            'papeledit button[action=save]': {
                click: this.onUpdate*/
            }
            
        });
    },
    
    onRender: function() {
    	//Ext.getStore('NifstStore').load();
    },
/*    
    onEdit: function(grid, record) {
    	if(this.getAccess('modulePapel','U')){
            var view = Ext.widget('papeledit');
            view.down('form').loadRecord(record);
            view.down('form').down('textfield[name=prg]').disable();
            view.down('form').down('textfield[name=nif]').disable();
    	}
    },
    
    onUpdate: function(button) {
        var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        record.set(values);
        win.close();
        this.getPapelStoreStore().sync();
    },
    
    addOnList: function(button) {
    	if(this.getAccess('modulePapel','U')){
        	var record= Ext.create('AM.model.Papel');
            var view = Ext.widget('papelnew');
            view.down('form').loadRecord(record);
    	}
    	//console.log('aaaaaaaaaaa');
    	//var rec= Ext.create('AM.model.Papel');
    	//var store=this.getPapelStoreStore();
    	//store.insert(0,rec);
    },*/
    
    searchOnList: function(textfield, e, eOpts ){
    	var store = this.getNifstlist().getStore();
    	//console.log(textfield.value.length);
    	if(textfield.value.length == 0) {
    		store.load({
    			params: {node: 'Aut'}
    		});
    	} else {
        	var intValue = parseInt(textfield.value);
        	//console.log(textfield.value.length%3);
        	//console.log(intValue == Number.NaN);
            if (intValue%1 === 0) {
            	if (textfield.value.length == 9) {
        			store.load({
        				params: {node: textfield.value}
        			});
        		}
            } else {
            	if (textfield.value.length%3 == 0) {
        			store.load({
        				params: {node: textfield.value}
        			});
        		}
            }
    	}
    }

});