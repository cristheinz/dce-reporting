Ext.define('AM.controller.BalanceController', {
    extend: 'AM.controller.AbstractController',
    
    models: ['Balance'],
    stores: ['BalanceStore'],
    views: [
        'balance.List'
    ],
    refs: [{
    	ref: 'balancelist',
    	selector: 'balancelist'
    }],

    init: function() {
        this.control({
            /*'balancelist': {
                beforerender: this.onPanelRendered
            },*/
            'balancelist textfield[name=anomes]': {
                render: this.onChange,
                //blur: this.onPanelRendered,
                //specialkey: this.onPanelRendered,
                change: this.onChange
            },
            'balancelist button[action=new]': {
            	click: this.onNew
            } ,
            'balancelist button[action=next]': {
            	click: this.onNext
            },
            'balancelist button[action=prev]': {
            	click: this.onPrev
            }
        });
    },
    
    onChange: function( t, newValue, oldValue, eOpts ) {
    	//console.log(t.value.length);
    	if(t.value.length==6) {
    		var store=Ext.getStore('BalanceStore');
        	store.load({
        		params: {
        			anomes : t.value,
        			node : 'root'
        		},
        		root: {
        			text: 'CTAS',
        			cls: null,
        			expanded: true
        		}
    		});
        	this.getBalancelist().setTitle('Balancete - '+t.value);
    	}
    },
    
    onNext: function(b){
    	var t = this.getBalancelist().down('textfield[name=anomes]');
    	var v = t.value;
    	var myDate = new Date(v.substr(0,4),v.substr(4,2)-1,1);
    	var d = Ext.Date.format(Ext.Date.add(myDate, Ext.Date.MONTH, 1),'Ym');
    	t.setValue(d);
    },
    onPrev: function(b){
    	var t = this.getBalancelist().down('textfield[name=anomes]');
    	var v = t.value;
    	var myDate = new Date(v.substr(0,4),v.substr(4,2)-1,1);
    	var d = Ext.Date.format(Ext.Date.add(myDate, Ext.Date.MONTH, -1),'Ym');
    	t.setValue(d);
    },
    
    /*onPanelRendered: function(v) {
    	//console.log(v);
    	var store=Ext.getStore('BalanceStore');
    	store.load({
    		params: {
    			anomes : v.value,
    			node : 'root'
    		},
    		root: {
    			text: 'CTAS',
    			cls: null,
    			expanded: true
    		}
		});
    	this.getBalancelist().setTitle('Balancete - '+v.value);
        //console.log('The panel was rendered');
    },*/
    
    onNew: function(button) {
    	//console.log('Click new!');
    	var store=Ext.getStore('FileStore');
    	store.on('load',function(){
    		store.filter({
				property : 'fid',
				value : 'BALAN'
			});
    	});
    	var panel=Ext.create('AM.view.file.List',{
    		store: store,
    		features: [],
    		tbar: []
    	});
    	panel.down('label[name=filecount]').hide();
    	panel.down('label[name=totalfilesize]').hide();
    	
    	Ext.create('Ext.window.Window', {
		    title: 'Selecionar ficheiro',
		    //maximizable: false,
		    modal: true,
		    width: 600,
		    layout: 'fit',
		    items: panel,
		    fbar:[{
		          text: 'OK',
		          handler: function(button, e){
		        	  //console.log('click');
		        	  var rec=panel.getSelectionModel().getSelection();
		        	  //console.log(rec.length);
		        	  if(rec.length>0) {
		        		  var id=rec[0].getId();
		        		  console.log('id:'+id);
		        		  //do stuff on server side: load BalanceStore w/param file=id
		        		  this.up('window').close();
		        	  } else {
		        		  alert('Favor selecionar um ficheiro');
		        	  }
		        	  
		          }
		    }]
		}).show();
    }
    
});