Ext.define('AM.controller.AdjustController', {
    extend: 'AM.controller.AbstractController',
    
    stores: ['AdjustStore'],
    models: ['Adjust'],
    views: [
        'adjust.List',
        'ctvst.List'
    ],
    
    refs: [{
    	ref: 'adjustlist',
    	selector: 'adjustlist'
    }],

    init: function() {
        this.control({
            'adjustlist': {
            	//viewready: this.onRender,
            	selectionchange: this.onSelect
            },
            /*'adjustlist textfield[name=searchbox]': {
            	keyup: this.searchOnList
            },*/
            'adjustlist button[action=add]': {
            	click: this.addOnList
            },
            'adjustlist button[action=remove]': {
            	click: this.onDelete
            },
            'adjustlist button[action=apply]': {
            	click: this.onApply
            },
            'adjustlist ctvstlist': {
            	select: this.setCtv
            }

            
        });
    },
    
    setCtv: function(combo, records, eOpts ){
    	var rec=combo.up('grid').getSelectionModel().getSelection()[0];
    	var value = records[0].get('ctv');
    	//console.log(rec.get('ct2'));
    	//console.log(value);
    	//console.log(rec.get('cta')+';'+rec.get('ct2'));
    	
    	if(value.indexOf(".") != -1) {
    		var split = value.split('.');
    		rec.set('cta', split[0]);
    		rec.set('ct2', split[1]);
    	} else {
    		rec.set('cta', '0');
    		rec.set('ct2', value);
    	}
    	//console.log(rec.get('cta')+';'+rec.get('ct2'));
    	//console.log(combo.isDirty());
    },
    
    onRender: function() {
    	/*var v=this.getAdjustlist();
    	var store=this.getAdjustlist().getStore();
    	store.on('datachanged',function(){
    		v.down('button[action=apply]').show();
    	});
    	console.log('asdfsdafdsf');*/
    	//Ext.getStore('AdjustStore').load();
    },

    onSelect: function(smodel, selected, eOpts){
    	//console.log(smodel.getSelection().length);
    	var rbtn=this.getAdjustlist().down('button[action=remove]');
    	if(selected[0]) {
    		rbtn.show();
    	} else {
    		rbtn.hide();
    	}
    	
    },
    
    addOnList: function(button) {
    	if(this.getAccess('moduleBalance','U')){
    		var anomes=button.up('balancemain').down('textfield[name=anomes]').value;
        	var rec= Ext.create('AM.model.Adjust',{anomes: anomes});
        	rec.setDirty();
        	var store=this.getAdjustStoreStore();
        	store.add(rec);
        	//store.insert(0,rec);
    	}
    },
    
    onDelete: function(button){
    	if(this.getAccess('moduleBalance','U')){
        	var store = this.getAdjustlist().getStore();
        	var sel=this.getAdjustlist().getSelectionModel().getSelection();
        	for(var i=0;i<sel.length;i++) {
        		//console.log(sel[i]);
        		store.remove(sel[i]);
        		//store.commitChanges();
        	}
    	}
    },
    
    onApply: function(button){
    	if(this.getAccess('moduleBalance','U')){
        	var store = this.getAdjustlist().getStore();
        	var panel=this.getAdjustlist().up('panel');
        	var t = panel.down('textfield[name=anomes]').value;
        	var anomes=panel.down('textfield[name=anomes]');
        	
        	if(!(store.getNewRecords().length > 0 || store.getUpdatedRecords().length > 0 || store.getRemovedRecords().length > 0)) {
        		Ext.Msg.alert("Alerta!", "Não houve qualquer alteração nos ajustes.");
        	} else {
        	Ext.MessageBox.confirm('Aplicar ajustes para '+t, 'Os ajustes anteriores serão anulados e estes serão aplicados. Pretende continuar?', function(btn){
     		   if(btn === 'yes'){
     			  store.save();//faz sync da store
     			  //e executa a procedure dos ajustes: aqui tem que criar um form manual c/anomes de parametro!!
     			  var form = Ext.create('Ext.form.Panel',{
     				 timeout: 300//tempo em segundos, isto dá 5min é o tempo de espera da waitMsg
     			  });
     			  if(form.isValid()){
     	            form.getForm().submit({
     	                url: 'adjust/adjust.action?anomes='+t,
     	                waitMsg: 'Aplicando ajustes ao balancete...',
     	                success: function(fp, o) {
     	                	anomes.fireEvent('change',anomes);
     	                	Ext.Msg.alert('Mensagem', 'Balancete ajustado com sucesso',function(btn){
     	                		//console.log(panel);
     	                		/*
     	                		Ext.getStore('BalanceStore').load({
     	                			params: {
     	                				anomes : t,
     	                				node : 'root'
     	                			},
     	                			root: {
     	                				text: 'CTAS',
     	                				cls: null,
     	                				expanded: true
     	                			}
     	                		});*/
     	                	});
     	                },
     	                failure: function() {
     	                	Ext.Msg.alert("O Ajuste Falhou!", Ext.JSON.decode(this.response.responseText).message);
     	                }
     	            });
     			  }
     		   }
     		 });
        	}
    	}
    }
    
    /*searchOnList: function(textfield, e, eOpts ){
    	var store = this.getAdjustlist().getStore();
		store.clearFilter();
		if (textfield.value) {
			store.filter({
				property : 'ct2',
				value : textfield.value,
				anyMatch : true,
				caseSensitive : false
			});
		}
    }*/

});