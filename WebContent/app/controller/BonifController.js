Ext.define('AM.controller.BonifController', {
    extend: 'AM.controller.AbstractController',
    
    stores: ['BonifStore'],
    models: ['Bonif'],
    views: [
        'bonif.List'
    ],
    
    refs: [{
    	ref: 'boniflist',
    	selector: 'boniflist'
    }],

    init: function() {
    	this.getBonifStoreStore().addListener('write',this.doSomething, this);
        this.control({
            'boniflist button[action=run]': {
            	click: this.newFREGU
            },
            'boniflist textfield[name=saldo]': {
            	beforerender: this.onChange,
            	change: this.onChange
            },
            'boniflist': {
            	beforeedit: this.beforeEdit/*,
            	validateedit: this.validate*/
            }
        });
    },
    
    doSomething: function(){
    	var saldo = this.getBoniflist().down('textfield[name=saldo]');
    	saldo.fireEvent('change',saldo);
    },
    
	/*
    validate: function(editor, e, opts){
    	var saldo = Ext.ComponentQuery.query('textfield[name=saldo]')[0];
    	//var saldo = this.getBoniflist().down('textfield[name=saldo]');
    	var tot=saldo.value.replace('.','').replace(',','.')*1;
    	var record=e.record;
    	
    	if(record.data.dtl!=null) {
    		tot=tot+record.data.val;
    	}
    	if(record.data.dtp!=null) {
    		tot=tot-(record.data.val-record.data.vali);
    	}
    	if(record.data.dti!=null) {
    		tot=tot-record.data.vali;
    	}
    	
    	saldo.setValue(tot.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1 ').replace('.',',').split(' ').join('.'));
    	
    },*/
    
    onChange: function( t, newValue, oldValue, eOpts ) {
    	var store=Ext.getStore('BonifStore');
    	store.load({
    		callback: function(records) {
    			var tot=0;
    			Ext.each(records, function(record) {
    				if(record.data.dtl!=null) {
			    		tot=tot+record.data.val;
			    	}
			    	if(record.data.dtp!=null) {
			    		tot=tot-(record.data.val-record.data.vali);
			    	}
			    	if(record.data.dti!=null) {
			    		tot=tot-record.data.vali;
			    	}
    			});
            	t.setValue(tot.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1 ').replace('.',',').split(' ').join('.'));
    		}
		});
    },
    
    beforeEdit: function(editor, e) {
    	if(!this.getAccess('moduleBonif','U')){
    		e.cancel=true;
    	}
    	if(e.record.get('fname')=='' && (e.field=='dts'||e.field=='dtp'||e.field=='dti')) {
    		e.cancel=true;
    	}
    	if(e.record.get('vali')==0 && e.field=='dti') {
    		e.cancel=true;
    	}
    	
    },
    
    newFREGU: function(button) {
    	var saldo = this.getBoniflist().down('textfield[name=saldo]');
    	if(this.getAccess('moduleBonif','U')){
    		//var store=this.getBoniflist().getStore();
        	
        	Ext.MessageBox.confirm('Alerta','Serão gerados ficheiros de regularização para os documentos em aberto.<br/>Estes ficheiros residirão na sua drive pessoal. Pretende continuar?', function(btn){
      		   if(btn === 'yes'){
     			 var form = Ext.create('Ext.form.Panel',{
      				 timeout: 600//tempo em segundos, isto dá 10min é o tempo de espera da waitMsg
      			  });
      			if(form.isValid()){
      	    		form.getForm().submit({
      	    			url: 'file/bonif-fregu/new.action',
      	    			waitMsg: 'Gerando ficheiro...',
      	    			success: function(fp, o) {
      	    				Ext.Msg.alert('Mensagem', 'Ficheiro gerado com sucesso.',function(btn){
      	    					//aqui faz refresh da lista!!!
      	    					//store.load();
      	    					saldo.fireEvent('change',saldo);
      	    				});
      	    			},
      	    			failure: function() {
      	    				Ext.Msg.alert("Erro ao gerar ficheiro!", Ext.JSON.decode(this.response.responseText).message);
      	    			}
      	    		});
      	    	}
      			   
      		   }
        	});
    	}
    	
    	

    }

});