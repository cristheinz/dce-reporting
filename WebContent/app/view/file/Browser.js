Ext.define('AM.view.file.Browser', {
    extend: 'Ext.view.View',
    alias: 'widget.filebrowser',
    
    //uses: 'Ext.data.Store',
    
    singleSelect: true,
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    tpl: [
        // '<div class="details">',
            '<tpl for=".">',
                '<div class="thumb-wrap">',
                	//'<div class="thumb"><img src="https://cdn1.iconfinder.com/data/icons/CrystalClear/64x64/mimetypes/unknown.png" title="{name:htmlEncode}"></div>',
                	//'<div class="thumb"><img src="icons/{fid}.png" title="{name:htmlEncode}"></div>'
                    '<div class="thumb">',
                    (!Ext.isIE6 ? '<img src="icons/i_{ext}.ico" title="{name:htmlEncode}">' : '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'icons/i_{ext}.png\') title="{name:htmlEncode}">'),
                    //'{name} - {fid}',
                    '</div>',
                    '<span>{shortName:htmlEncode}</span>',
                '</div>',
            '</tpl>'
        // '</div>'
    ],
    
    store: 'FileStore',
    //autoScroll: true,
    prepareData: function(data) {
        Ext.apply(data, {
            shortName: Ext.util.Format.ellipsis(data.name, 10)
        });
        return data;
    },
    
    initComponent: function() {
        //this.store = ''
        
        this.callParent(arguments);
        this.store.sort();
    },
    getIcon: function(fid) {
    	return 'icon_csv';
    }
});