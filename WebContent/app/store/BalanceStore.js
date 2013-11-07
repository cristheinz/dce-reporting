Ext.define('AM.store.BalanceStore', {
    extend: 'Ext.data.TreeStore',

    model: 'AM.model.Balance',
    proxy: {
        type: 'ajax',
        url: 'data/balancedata.json',
        encode: 'ISO-8859-1'
    },
    folderSort: true
});