Ext.define('AM.controller.BalanceController', {
    extend: 'AM.controller.AbstractController',
    
    models: ['Balance'],
    stores: ['BalanceStore','CtvstStore'],
    views: [
        'balance.List',
        'balance.Files',
        'balance.Load',
        'balance.Main'
    ],
    refs: [{
    	ref: 'balancelist',
    	selector: 'balancelist'
    },{
    	ref: 'balancefiles',
    	selector: 'balancefiles'
    },{
    	ref: 'balanceload',
    	selector: 'balanceload'
    },{
    	ref: 'balancemain',
    	selector: 'balancemain'
    /*},{
    	ref: 'filelist',
    	selector: 'balancefiles filelist'*/
    }],

    init: function() {
        this.control({
            /*'balancelist': {
                beforerender: this.onPanelRendered
            },*/
            'balancemain textfield[name=anomes]': {
                beforerender: this.onChange,
                //blur: this.onPanelRendered,
                //specialkey: this.onPanelRendered,
                change: this.onChange
            },
            'balancemain button[action=new]': {
            	click: this.onNew
            } ,
            'balancemain button[action=next]': {
            	click: this.onNext
            },
            'balancemain button[action=prev]': {
            	click: this.onPrev
            },
            
            /*'balancefiles button[action=select]': {
            	click: this.onSelect
            },*/
            'balancefiles > filelist': {
            	itemdblclick: this.onFileItemSelect
            },
            
            'balanceload button[action=run]': {
            	click: this.onLoad
            },
            'balanceload button[action=back]': {
            	click: this.onBack
            }
        });
    },
    
    onBack: function(button) {
    	//console.log('aaaaa');
    	var win=this.getBalancefiles();
    	win.setTitle('Selecionar balancete');
    	var fl=win.down('panel');
    	var form=button.up('form');
    	form.hide();
    	fl.show();
    	
    	
    },
    
    onLoad: function(button) {
    	var form = this.getBalanceload();
        if(form.isValid()){
            form.getForm().submit({
                url: 'balan/load.action',
                waitMsg: 'Carregando balancete...',
                success: function(fp, o) {
                	Ext.Msg.alert('Mensagem', 'Balancete caregado com sucesso',function(btn){
                		form.up('window').close();
                	});
                },
                failure: function() {
                	Ext.Msg.alert("Carregamento Falhou!", Ext.JSON.decode(this.response.responseText).message);
                }
            });
        }
    },
    
    onChange: function( t, newValue, oldValue, eOpts ) {
    	//console.log(t.value);
    	//console.log(t.value.length);
    	if(t.value.length==6) {
    		
    		var total=this.getBalancelist().down('textfield[name=saldo]');
    		
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
        		},
        		callback: function(records) {
        			var tot=0;
        			Ext.each(records, function(rec) {
        				//console.log(rec.get('cta'));
        				if(rec.get('cta')<90)
        				tot+=rec.get('valc')-rec.get('vald');
        				//console.log(tot);
        				//console.log(rec.get('vald')+";"+rec.get('valc'));
        			});
                	total.setValue(tot.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1 ').replace('.',',').split(' ').join('.'));
                	//                           .replace(/\d  (?=(\d{3})+\.)/g, '$&,').toLocaleString());
        		}
    		});
        	var store2=Ext.getStore('AdjustStore');
        	store2.load({
        		params: {
        			anomes : t.value
        		}
    		});
        	var store3=Ext.getStore('CtvstStore');
        	store3.load({
        		params: {
        			anomes : t.value
        		}
    		});
        	//this.getBalancemain().setTitle('Balancete - '+t.value);
        	
        	
    	}
    },
    
    onNext: function(b){
    	var t = this.getBalancemain().down('textfield[name=anomes]');
    	var v = t.value;
    	var myDate = new Date(v.substr(0,4),v.substr(4,2)-1,1);
    	var d = Ext.Date.format(Ext.Date.add(myDate, Ext.Date.MONTH, 1),'Ym');
    	t.setValue(d);
    },
    onPrev: function(b){
    	var t = this.getBalancemain().down('textfield[name=anomes]');
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
    	if(this.getAccess('moduleBalance','U')){
    		var store=Ext.getStore('FileStore');
        	store.load({
        		params: {
        			fid: 'BALAN'
        			}
        	});
        	Ext.widget('balancefiles');
    	}
    	
    	/*store.on('load',function(){
    		store.filter({
				property : 'fid',
				value : 'BALAN'
			});
    	});*/
    	/*var panel=Ext.create('AM.view.file.List',{
    		store: store,
    		//features: [],
    		//tbar: []
    	});
    	panel.down('label[name=filecount]').hide();
    	panel.down('label[name=totalfilesize]').hide();*/
    	
    	
    	
    	/*
    	Ext.create('Ext.window.Window', {
		    title: 'Selecionar ficheiro',
		    //maximizable: false,
		    modal: true,
		    width: 600,
		    layout: 'fit',
		    //items: panel,
		    items: [{
		    	xtype: 'filelist'
		    }],
		    fbar:[{
		          text: 'OK',
		          handler: function(button, e){
		        	  //console.log('click');
		        	  var grid=button.up('window').down('grid');
		        	  var rec=grid.getSelectionModel().getSelection();
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
		}).show();*/
    },
    
    /*onSelect: function(button) {
    	var grid=button.up('window').down('grid');
	    var rec=grid.getSelectionModel().getSelection();
	    if(rec.length>0) {
	    	var id=rec[0].getId();
	        console.log('id:'+id);
	        //do stuff on server side: load BalanceStore w/param file=id
	        button.up('window').close();
	    } else {
	    	alert('Favor selecionar um ficheiro');
	    }
    },*/
    
    onFileItemSelect: function(grid, record){
    	//this.getFilelist().down('label[name=filecount]').setText(record.get('name')+' [Delete para apagar, duplo clique para baixar.]');
    	//this.getFilelist().down('label[name=totalfilesize]').setText('');
    	//console.log(record.get('name'));
    	//alert('Selecionou o ficheiro: '+record.get('name'));
    	//console.log(this.getFilelist());
    	//console.log(grid.up('panel'));

    	//this.getFilelist().suspendEvent('itemclick');
    	//this.getFilelist().clearListeners();
    	//Ext.EventManager().stopPropagation(?);
    	//console.log(e);
    	//e.stopPropagation();
    	/*var win=grid.up('window');
    	win.close();*/
    	//this.getBalancefiles().suspendEvents(true);
    	//var fl=this.getBalancefiles().down('panel');
    	
    	var fl=grid.up('panel');
    	var win=this.getBalancefiles();
    	var siz=win.getSize();
    	
    	//console.log(fl);
    	fl.hide();
    	//win.remove(fl);
    	win.setSize(siz);
    	win.setTitle('Iniciar carregamento do balancete');
    	/*var form=Ext.create('Ext.form.Panel',{
    		frame: true,
    	    bodyPadding: '10 10 0',
    	    items: [{
    	    	xtype: 'label',
    	    	text: record.get('name')
    	    },{
    	    	xtype: 'textfield',
    	    	value: record.get('id')
    	    }]
    	});*/
    	//var form=Ext.widget('balanceload');
    	var form=this.getBalanceload();
    	form.show();
    	form.loadRecord(record);
    	win.add(form);
    	//win.down('button[action=select]').show();

    	//this.getBalancefiles().close();
    	
    	
    }
    
});