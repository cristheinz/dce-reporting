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
            	itemdblclick: this.onEditFile,
            	itemdownloadbuttonclick: this.onDownloadFile,
            	itemdeletebuttonclick: this.onDeleteFile
            }/*,
            'filelist [action=download]': {
                click: this.downloadFile
            }*/
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

    onEditFile: function(grid, record) {
    	//console.log('Edit file:'+record.getId());
    	/*var view = Ext.widget('fileedit');
        view.down('form').loadRecord(record);*/
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
    }
});