Ext.define('AM.controller.BatchController', {
    extend: 'AM.controller.AbstractController',
    
    models: ['BatchJobExecution','BatchStepExecution'],
    stores: ['BatchJobExecutionStore','BatchStepExecutionStore'],
    views: [
        'batch.Main',
        'batch.New',
        'batch.JobList',
        'batch.StepList'
    ],
    
    refs: [{
    	ref: 'batchmain',
    	selector: 'batchmain'
    },{
    	ref: 'batchnew',
    	selector: 'batchnew'
    },{
    	ref: 'batchjoblist',
    	selector: 'batchjoblist'
    },{
    	ref: 'batchsteplist',
    	selector: 'batchsteplist'
    }],

    init: function() {
        this.control({
        	'batchmain': {
            	beforerender: this.onMainRender
            },
            'batchnew button[action=run]': {
            	click: this.onRun
            },
            'batchjoblist': {
            	beforerender: this.onRender,
            	selectionchange: this.onSelectJob
            },
            'batchjoblist textfield[name=searchbox]': {
            	keyup: this.searchOnList
            },
            'batchjoblist button[action=add]': {
            	click: this.addOnList
            },
            'batchjoblist button[action=remove]': {
            	click: this.onRemoveJobFromList
            },
            'batchjoblist button[action=refresh]': {
            	click: this.onRefreshJobList
            },
            'batchsteplist button[action=refresh]': {
            	click: this.onRefreshStepList
            },
            'batchsteplist textfield[name=searchbox]': {
            	keyup: this.searchOnStepList
            }
            
        });
    },
    
    onMainRender: function() {
    	this.getBatchsteplist().hide();
    },
    
    onRun: function(button) {
    	var store=this.getBatchjoblist().getStore();
    	var form=this.getBatchnew().down('form');
    	var record = form.getValues();
    	//console.log(record.job+';'+record.anomes);
    	if(form.isValid()){
            form.getForm().submit({
                url: 'admin/run'+record.job+'.action',
                waitMsg: 'A enviar pedido...',
                success: function(fp, o) {
                	/*Ext.Msg.alert('Mensagem', 'Pedido aceite.<br />O processamento está a ser executado.',function(btn){
                		form.up('window').close();
                	});*/
                	form.up('window').close();
                	store.reload();
                },
                failure: function() {
                	Ext.Msg.alert("Pedido Falhou!", Ext.JSON.decode(this.response.responseText).message);
                }
            });
        }
    },
    
    onRemoveJobFromList: function(button) {
    	var store = this.getBatchjoblist().getStore();
    	var sel=this.getBatchjoblist().getSelectionModel().getSelection();
    	for(var i=0;i<sel.length;i++) {
    		store.remove(sel[i]);
    		store.commitChanges();//isto garante que vai 1 a 1 para o server!
    	}
    	this.getBatchsteplist().hide();
    },
    
    onSelectJob: function(smodel, selected, eOpts){
    	var steps=this.getBatchsteplist();
    	var rbtn=this.getBatchjoblist().down('button[action=remove]');
    	rbtn.show();
    	if(selected.length>1) {
    		steps.hide();
    	} else {
    		if(selected[0]) {
    			var id=selected[0].get('id');
            	var store = Ext.getStore('BatchStepExecutionStore');
            	store.load({
            		params: {jobid: id}
            	});
            	store.clearFilter();
            	steps.setTitle('STEPS do JOB '+selected[0].get('job')+' #'+id);
            	steps.show();
    		} else {
    			rbtn.hide();
    			steps.hide();
    		}
    	}
    },
    
    onRender: function() {
    	var store=Ext.getStore('BatchJobExecutionStore');
    	store.load();
    	store.clearFilter();
    },

    addOnList: function(button) {
    	var view = Ext.widget('batchnew');
    	view.show();
    },
    searchOnList: function(textfield, e, eOpts ){
    	var store = Ext.getStore('BatchJobExecutionStore');
		store.clearFilter();
		if (textfield.value) {
			store.filter({
				property : 'job',
				value : textfield.value,
				anyMatch : true,
				caseSensitive : false
			});
		}
    },
    
    onRefreshJobList: function(button) {
    	var store = Ext.getStore('BatchJobExecutionStore');
    	store.reload();
    	store.clearFilter();
    },
    
    onRefreshStepList: function(button) {
    	var store = Ext.getStore('BatchStepExecutionStore');
    	store.reload();
    	store.clearFilter();
    },

    searchOnStepList: function(textfield, e, eOpts ){
    	var store = Ext.getStore('BatchStepExecutionStore');
		store.clearFilter();
		if (textfield.value) {
			store.filter({
				property : 'step',
				value : textfield.value,
				anyMatch : true,
				caseSensitive : false
			});
		}
    }

});