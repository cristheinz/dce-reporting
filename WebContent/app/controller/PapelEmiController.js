Ext.define('AM.controller.PapelEmiController', {
    extend: 'AM.controller.AbstractController',
    
    stores: ['PapelEmiStore'],
    models: ['PapelEmi'],
    views: [
        'papelEmi.List',
        'papelEmi.Form',
        'papelEmi.New',
        'papelEmi.Edit'
    ],
    
    refs: [{
    	ref: 'papelemilist',
    	selector: 'papelemilist'
    /*},{
    	ref: 'papelemiedit',
    	selector: 'papelemiedit'*/
    }],

    init: function() {
        this.control({
            'papelemilist': {
            	beforerender: this.onRender,
            	itemdblclick: this.onEdit
            },/*
            'papelemilist textfield[name=searchbox]': {
            	keyup: this.searchOnList
            },*/
            'papelemilist button[action=add]': {
            	click: this.addOnList
            },
            'papelemiedit button[action=save]': {
                click: this.onUpdate
            },
            'papelemiedit button[action=delete]': {
                click: this.onDelete
            },
            'papeleminew > nifstlist': {
            	itemdblclick: this.onSelect
            },
            'papeleminew button[action=save]': {
                click: this.onCreate
            }
            
        });
    },
    
    onRender: function() {
    	//Ext.getStore('PapelEmiStore').load();
    },
   
    onEdit: function(grid, record) {
    	if(this.getAccess('modulePapelEmi','U')){
            var view = Ext.widget('papelemiedit');
            view.down('form').loadRecord(record);
    	}
    },
     
    onUpdate: function(button) {
        var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        record.set(values);
        win.close();
        this.getPapelEmiStoreStore().sync();
    },
    onDelete: function(button) {
    	var store = this.getPapelEmiStoreStore();
    	Ext.MessageBox.confirm('Delete', 'Are you sure ?', function(btn){
 		   if(btn === 'yes'){
 			  var win    = button.up('window'),
 		        form   = win.down('form'),
 		        record = form.getRecord();
 		        store.remove(record);
 		        win.close();
 		   }
 		 });
        
    },
    addOnList: function(button) {
    	//console.log(this.getPapelemilist());
    	//console.log(this.getPapelemilist().up('papelmain'));
    	//console.log(this.getPapelemilist().up('papelmain').down('papellist'));
    	//console.log(Ext.getStore('PapelEmiStore').getProxy());
    	//console.log(this.store.proxy.extraParams);
    	//console.log(this.getPapelemilist().title);
    	//console.log(this.getPapelemilist().down('hiddenfield[name=papelid]').value);
    	var nam=this.getPapelemilist().title;
    	
    	var view = Ext.widget('papeleminew');
    	var w=Ext.widget('nifstlist');
    	var store = w.getStore();
    	store.load({
			params: {node: nam.replace('Emissões - ','')}
		});
    	view.add(w);
    	view.down('button[action=save]').hide();
    	
    	view.show();
    },
    onSelect: function(grid, rec) {
    	var id=this.getPapelemilist().down('hiddenfield[name=papelid]').value;
    	if(this.getAccess('modulePapelEmi','U')){
        	var record= Ext.create('AM.model.PapelEmi',{papel: id,nif: rec.get('nif'), nam: rec.get('nam')});
        	var view=grid.up('window');
        	grid.up('panel').hide();
            view.add(Ext.widget('papelemiform'));
            view.down('form').loadRecord(record);
            //view.down('form').down('textfield[name=id]').hide();
            view.down('button[action=save]').show();
            view.show();
    	}
    },
    onCreate: function(button) {
    	//console.log('save!');
    	var win    = button.up('window'),
    	form   = win.down('form'),
    	rec = form.getRecord(),
    	values = form.getValues();
    	rec.set(values);
    	this.getPapelEmiStoreStore().insert(0,rec);
    	win.close();
    }/*,
    
    searchOnList: function(textfield, e, eOpts ){
    	var store = this.getPapellist().getStore();
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
*/
});