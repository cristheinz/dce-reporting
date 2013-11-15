Ext.define('AM.controller.FileController', {
    extend: 'AM.controller.AbstractController',
    
    models: ['File'],
    stores: ['FileStore'],
    
    views: [
        'file.Browser',
        'file.Upload',
        'file.Grid',
        'file.List'
    ],
    
    refs: [{
        ref: 'upload',
        selector: 'upload'
    },{
    	ref: 'filelist',
    	selector: 'filelist'
    }],

    init: function() {
        this.control({
            'upload button[action=save]': {
                click: this.uploadFile
            },
            'upload button[action=reset]': {
                click: this.resetUploadForm
            },
            'filelist': {
            	/*containerclick: function(grid, e, eOpts){
            		console.log('click!');
            		grid.getSelectionModel().deselectAll();
            	},*/
            	itemclick: this.onFileItemSelect,
            	cellkeydown: this.onFileItemKeyDown,
            	itemdblclick: this.onFileItemDownload
            },
            'filelist textfield[name=filefilter]': {
            	keyup: this.onFileGridNameFilter
            },
            'filelist button[action=refresh]': {
            	click: this.onFileRefresh
            }
        });
    },
    
    uploadFile: function(button) {
    	//var form = button.up('form').getForm();
    	var form = this.getUpload();
        if(form.isValid()){
            form.getForm().submit({
                url: 'file/upload.action',//?user='+AM.user,
                waitMsg: 'Carregando ficheiro...',
                success: function(fp, o) {
                	Ext.Msg.alert('Mensagem', 'Ficheiro importado com sucesso',function(btn){
                		//Ext.ComponentQuery.query('#uploadWindow')[0].close();
                		form.up('window').close();
                	});
                },
                failure: function() {
                	Ext.Msg.alert("Importação Falhou!", Ext.JSON.decode(this.response.responseText).message);
                	//Ext.Msg.alert("Importação Falhou!", "Erro no ficheiro");
                }
            });
        }
    },
    
    resetUploadForm: function(button) {
    	//button.up('form').getForm().reset();
    	this.getUpload().getForm().reset();
    }, 

    onFileGridNameFilter: function(textfield, e, eOpts ){
    	var store = this.getFilelist().getStore();
		store.clearFilter();
		if (textfield.value) {
			store.filter({
				property : 'name',
				value : textfield.value,
				anyMatch : true,
				caseSensitive : false
			});
		}
    },

    onFileItemSelect: function(grid, record){
    	this.getFilelist().down('label[name=filecount]').setText(record.get('name')+' [Delete para apagar, duplo clique para baixar.]');
    	this.getFilelist().down('label[name=totalfilesize]').setText('');
    },

    onFileItemKeyDown: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
    	var store = this.getFilelist().getStore();
    	if(e.getKey()==46) {
    		Ext.MessageBox.confirm('Apagar', 'Vai apagar o ficheiro:<br/><p>'+record.get('name')+
        			'</p><br/>Pretende continuar ?', function(btn){
     		   if(btn === 'yes'){
     			  store.remove(record);
     		   }
     		 });
    	}
    },
    
    onFileItemDownload: function(grid, record) {
    	window.open('file/download.action?id='+record.getId());
    },
    
    onFileRefresh: function (button) {
    	//console.log('refresh!');
    	var store = this.getFilelist().getStore();
    	store.reload();
    }
    
    
    /*onEditFile: function(grid, record) {
		//console.log('Edit file:'+record.getId());
		var view = Ext.widget('fileedit');
    	view.down('form').loadRecord(record);
	},
	
    onDownloadFile: function(grid, rowIndex, colIndex) {
    	var rec = grid.getStore().getAt(rowIndex);
    	window.open('file/download.action?id='+rec.get('id'));
    },

    onDeleteFile: function(grid, rowIndex, colIndex){
    	var rec = grid.getStore().getAt(rowIndex);
    	var store = this.getFileStoreStore();
    	Ext.MessageBox.confirm('Delete', 'Are you sure ?', function(btn){
    		   if(btn === 'yes'){
    			   store.remove(rec);
    		   }
    		 });
    }*/ 
});