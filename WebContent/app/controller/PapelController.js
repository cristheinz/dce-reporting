Ext.define('AM.controller.PapelController', {
    extend: 'AM.controller.AbstractController',
    
    stores: ['PapelStore'],
    models: ['Papel'],
    views: [
        'papel.Main',
        'papel.List',
        'papel.Form',
        'papel.New',
        'papel.Edit'
    ],
    
    refs: [{
    	ref: 'papelmain',
    	selector: 'papelmain'
    },{
    	ref: 'papellist',
    	selector: 'papellist'
    },{
    	ref: 'papeledit',
    	selector: 'papeledit'
    }],

    init: function() {
        this.control({
        	'papelmain': {
            	beforerender: this.onMainRender
            },
            'papellist': {
            	beforerender: this.onRender,
            	itemclick: this.onClick,
            	itemdblclick: this.onEdit
            },
            'papellist textfield[name=searchbox]': {
            	keyup: this.searchOnList
            },
            'papellist button[action=add]': {
            	click: this.addOnList
            },
            'papeledit button[action=save]': {
                click: this.onUpdate
            },
            'papeledit button[action=delete]': {
                click: this.onDelete
            },
            'papelnew > nifstlist': {
            	itemdblclick: this.onSelect
            },
            'papelnew button[action=save]': {
                click: this.onCreate
            }
            
        });
    },
    
    onMainRender: function() {
    	//console.log('aaaaaaa');
    	this.getPapelmain().down('papelemilist').hide();
    	
    },
    
    onClick: function(grid, rec){
    	//console.log(rec.get('id'));
    	var id=rec.get('id');
    	var store = Ext.getStore('PapelEmiStore');
    	store.load({
			params: {papelId: id}
		});
    	this.getPapelmain().down('papelemilist').setTitle('Emissões - '+rec.get('nam'));
    	this.getPapelmain().down('papelemilist').down('hiddenfield[name=papelid]').setValue(id);
    	this.getPapelmain().down('papelemilist').show();
    },
    
    onRender: function() {
    	var store=Ext.getStore('PapelStore');
    	store.load();
    	store.clearFilter();
    },
    
    onEdit: function(grid, record) {
    	if(this.getAccess('modulePapel','U')){
            var view = Ext.widget('papeledit');
            view.down('form').loadRecord(record);
            //view.down('form').down('textfield[name=id]').disable();
            //view.down('form').down('textfield[name=nif]').disable();
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
    onDelete: function(button) {
    	var store = this.getPapelStoreStore();
    	Ext.MessageBox.confirm('Delete', 'Are you sure ?', function(btn){
 		   if(btn === 'yes'){
 			  var win    = button.up('window'),
 		        form   = win.down('form'),
 		        record = form.getRecord();
 		        store.remove(record);
 		        //values = form.getValues();
 		        //record.set(values);
 		        win.close();
 		        //this.getPapelStoreStore().sync();
 		   }
 		 });
        
    },
    onCreate: function(button) {
    	//console.log('save!');
        var win    = button.up('window'),
        form   = win.down('form'),
        rec = form.getRecord(),
        values = form.getValues();
        rec.set(values);
        /*var record= Ext.create('AM.model.Papel',{
        	prg: rec.get('nif'),
        	nif: rec.get('nif'), 
        	nam: rec.get('nam'),
        	dti: rec.get('dti'),
        	dtf: rec.get('dtf'),
        	moe: rec.get('moe'),
        	val: rec.get('val')
        });*/
        this.getPapelStoreStore().insert(0,rec);
        win.close();
        //this.getPapelStoreStore().sync();
    },
    
    addOnList: function(button) {
    	var view = Ext.widget('papelnew');
    	var w=Ext.widget('nifstlist');
    	var store = w.getStore();
    	store.load({
			params: {node: 'Aut'}
		});
    	view.add(w);
    	view.down('button[action=save]').hide();
    	
    	view.show();
    	
    	/*Ext.create('Ext.window.Window', {
		    title: 'Novo Programa',
		    maximizable: true,
		    width: 600,
		    layout: 'fit',
		    modal: true,
		    items: {  
		    	xtype: 'nifstlist'
		    }
		}).show();*/
    	//if(this.getAccess('modulePapel','U')){
        	//var record= Ext.create('AM.model.Papel');
            //var view = Ext.widget('papelnew');
            //view.down('form').loadRecord(record);
    	//}
    	//console.log('aaaaaaaaaaa');
    	//var rec= Ext.create('AM.model.Papel');
    	//var store=this.getPapelStoreStore();
    	//store.insert(0,rec);
    },
    onSelect: function(grid, rec) {
    	//console.log(rec.get('nif'));
    	//console.log(rec.get('nam'));
    	if(this.getAccess('modulePapel','U')){
        	//var record= Ext.create('AM.model.Papel',{prg: rec.get('nif'),nif: rec.get('nif'), nam: rec.get('nam')});
        	var record= Ext.create('AM.model.Papel',{nif: rec.get('nif'), nam: rec.get('nam')});
        	//var record= Ext.create('AM.model.Papel');
        	var view=grid.up('window');
        	grid.up('panel').hide();
            //var view = Ext.widget('papelnew');
            view.add(Ext.widget('papelform'));
            view.down('form').loadRecord(record);
            view.down('form').down('textfield[name=id]').hide();
            //view.down('form').down('textfield[name=nif]').disable();
            view.down('button[action=save]').show();
            view.show();
    	}
    },
    
    searchOnList: function(textfield, e, eOpts ){
    	var store = Ext.getStore('PapelStore');
    	//var store = this.getPapellist().getStore();
		store.clearFilter();
		if (textfield.value) {
			store.filter({
				property : 'nam',
				value : textfield.value,
				anyMatch : true,
				caseSensitive : false
			});
		}
    }

});