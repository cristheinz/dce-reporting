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
    	ref: 'filelist',
    	selector: 'balancefiles > filelist'
    },{
    	ref: 'balanceload',
    	selector: 'balanceload'
    },{
    	ref: 'balancemain',
    	selector: 'balancemain'
    }],

    init: function() {
        this.control({
            'balancemain textfield[name=anomes]': {
                beforerender: this.onChange,
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

            'balancefiles > filelist': {
            	itemdblclick: this.onFileItemSelect,
            	afterrender: this.onMainRendered
            },
            
            'balanceload button[action=run]': {
            	click: this.onLoad
            },
            'balanceload button[action=back]': {
            	click: this.onBack
            }
        });
    },
    
    onMainRendered: function() {
    	this.getFilelist().columns[2].setVisible(false);
    	this.getFilelist().columns[3].setVisible(false);
    	this.getFilelist().columns[4].setVisible(false);
    	this.getFilelist().columns[5].setVisible(false);
    	this.getFilelist().columns[6].setVisible(false);
    },
    
    onBack: function(button) {
    	var win=this.getBalancefiles();
    	win.setTitle('Selecionar balancete');
    	var fl=win.down('panel');
    	var form=button.up('form');
    	form.hide();
    	fl.show();
    	
    	
    },
    
    onLoad: function(button) {
    	var anomes = this.getBalancemain().down('textfield[name=anomes]');
    	var form = this.getBalanceload();
        if(form.isValid()){
            form.getForm().submit({
                url: 'balan/load.action',
                waitMsg: 'Carregando balancete...',
                success: function(fp, o) {
                	Ext.Msg.alert('Mensagem', 'Balancete caregado com sucesso',function(btn){
                		form.up('window').close();
                		anomes.fireEvent('change',anomes);
                	});
                },
                failure: function() {
                	Ext.Msg.alert("Carregamento Falhou!", Ext.JSON.decode(this.response.responseText).message);
                }
            });
        }
    },
    
    onChange: function( t, newValue, oldValue, eOpts ) {
    	if(t.value.length==6) {
    		
    		var total=this.getBalancelist().down('textfield[name=saldo]');
    		var totalext=this.getBalancelist().down('textfield[name=saldoext]');
    		
    		//var store=Ext.getStore('BalanceStore');*/
    		
    		var store = Ext.create('Ext.data.TreeStore', {
    			model: 'AM.model.Balance',
    		    proxy: {
    		        type: 'ajax',
    		        api: {
    		        	read : 'balan/tree.action'
    		    	},
    		        reader: {
    		            type: 'json',
    		            totalProperty: 'total',
    		            successProperty: 'success',
    		            idProperty: 'cta',
    		            root: 'data',
    		            messageProperty: 'message'
    		        }
    		    }
    		});
    		store.load({
        		params: {
        			anomes : t.value,
        			node : '999'
        		},
        		callback: function(records) {
        			var totext=0;
        			Ext.each(records, function(rec) {
        				//console.log(rec.get('cta'));
        				if(rec.get('cta')==9999 && rec.get('leaf')==0)
        					totext+=rec.get('valc')-rec.get('vald');
        				//console.log(totext);
        			});
        			totalext.setValue(totext);
        		}
    		});
        	Ext.getStore('BalanceStore').load({
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
        			var totext=totalext.value*1;
        			Ext.each(records, function(rec) {
        				if(rec.get('cta')<90 && rec.get('leaf')==0)
        					tot+=rec.get('valc')-rec.get('vald');
        				if(rec.get('cta')>=90 && rec.get('leaf')==0)
        					totext+=rec.get('valc')-rec.get('vald');
        			});
                	total.setValue(tot.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1 ').replace('.',',').split(' ').join('.'));
                	totalext.setValue(totext.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1 ').replace('.',',').split(' ').join('.'));
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
    
    onNew: function(button) {
    	if(this.getAccess('moduleBalance','U')){
    		var store=Ext.getStore('FileStore');
        	store.load({
        		params: {
        			fid: 'BALAN'
        			}
        	});
        	Ext.widget('balancefiles');
    	}
    },
    
    onFileItemSelect: function(grid, record){
    	var fl=grid.up('panel');
    	var win=this.getBalancefiles();
    	var siz=win.getSize();
    	fl.hide();
    	win.setSize(siz);
    	win.setTitle('Iniciar carregamento do balancete');
    	var form=this.getBalanceload();
    	form.show();
    	form.loadRecord(record);
    	win.add(form);
    }
    
});