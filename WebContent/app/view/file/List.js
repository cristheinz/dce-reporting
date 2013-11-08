Ext.define('AM.view.file.List' ,{
    extend: 'Ext.Panel',
    //requires: ['Ext.ux.grid.FiltersFeature'],

    alias: 'widget.filelist',
    id: 'appfile',
    //frame: true,
    width: 535,
    //title: 'Sucursais',
    
    //closable: true,
    

    initComponent: function() {
    	var v =  Ext.create('Ext.view.View', {
        	store: 'FileStore',
        	frame: true,
        	autoScroll: true,
        	tpl: [
                  '<tpl for=".">',
                      '<div style="float:left" class="thumb-wrap" id="{name:stripTags}">',
                          '<div class="thumb"><img src="https://cdn1.iconfinder.com/data/icons/CrystalClear/64x64/mimetypes/unknown.png" title="{name:htmlEncode}"></div>',
                          '<span class="x-editable">{shortName:htmlEncode}</span>',
                      '</div>',
                  '</tpl>',
                  '<div class="x-clear"></div>'
            ],
            //multiSelect: true,
            height: 400,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images to display',
            /*plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {}),
                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
            ],*/
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 15)//,
                    //sizeString: Ext.util.Format.fileSize(data.size),
                    //dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
                });
                return data;
            }/*,
            listeners: {
                selectionchange: function(dv, nodes ){
                    var l = nodes.length,
                        s = l !== 1 ? 's' : '';
                    this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
                }
            }*/
        });

    	
    	
        this.items = [v];

        this.callParent(arguments);
    }
});