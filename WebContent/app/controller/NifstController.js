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
    	Ext.getStore('NifstStore').load();
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
		//store.clearFilter();
		if (textfield.value.length > 2) {
			/*store.filter({
				property : 'name',
				value : textfield.value,
				anyMatch : true,
				caseSensitive : false
			});*/
			store.load({
				params: {node: textfield.value}
			});
		}
    }

});