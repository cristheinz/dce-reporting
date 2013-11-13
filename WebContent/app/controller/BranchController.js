Ext.define('AM.controller.BranchController', {
    //extend: 'Ext.app.Controller',
    extend: 'AM.controller.AbstractController',
    
    stores: ['BranchStore'],
    models: ['Branch'],
    views: [
        'branch.List',
        'branch.Edit'
    ],

    init: function() {
        //console.log('Initialized Branches Controller! This happens before the Application launch function is called');
        this.control({
            /*'viewport > panel': {
                render: this.onPanelRendered
            },*/
            'branchlist': {
                itemdblclick: this.editBranch
            },
            'branchedit button[action=save]': {
                click: this.updateBranch
            }
        });
    },

    /*onPanelRendered: function() {
        console.log('The panel was rendered');
    },*/

    editBranch: function(grid, record) {
    	if(this.getAccess('moduleBranch','U')){
            //console.log('Double clicked on ' + record.get('txt'));
            var view = Ext.widget('branchedit');
            view.down('form').loadRecord(record);
    	}
    },

    updateBranch: function(button) {
        //console.log('clicked the Save button');
        var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        record.set(values);
        win.close();
        // synchronize the store after editing the record
        //this.getBranchesStore().save(record);
        this.getBranchStoreStore().sync();
    }
});