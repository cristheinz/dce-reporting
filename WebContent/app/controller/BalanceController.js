Ext.define('AM.controller.BalanceController', {
    extend: 'AM.controller.AbstractController',
    
    stores: ['BalanceStore'],
    models: ['Balance'],
    views: [
        'balance.List'
    ],

    init: function() {
        this.control({
            'viewport > panel': {
                render: this.onPanelRendered
            }
        });
    },

    onPanelRendered: function() {
        //console.log('The panel was rendered');
    }
});