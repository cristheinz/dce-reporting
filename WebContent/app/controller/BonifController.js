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
        this.control({
            'boniflist button[action=run]': {
            	click: this.newFREGU
            },
            'boniflist': {
            	beforeedit: this.beforeEdit
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
    	if(this.getAccess('moduleBonif','U')){
    		var store=this.getBoniflist().getStore();
        	
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
      	    					store.load();
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