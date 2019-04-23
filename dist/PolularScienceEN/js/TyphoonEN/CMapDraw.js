//CMapDraw类
var CMapDraw = function() {
    
    this.map = null;
    this.staticview=null;
    this.titletip=null;
    this.vectorrain = new ol.layer.Vector({
        source: null,
        id:'vectorrain'
    });
    // this.setsingleclickbool=function (bool) {
    //     console.info(bool)
    //     if(bool){
    //         this.is_singleclick=bool
    //     }else {
    //
    //     }
    // }
    this.init = function () {
        var projection = ol.proj.get("EPSG:4326");
        var projectionExtent = projection.getExtent();
        var size = ol.extent.getWidth(projectionExtent) / 256;
        var resolutions = [];
        for (var z = 2; z < 19; ++z) {
            resolutions[z] = size / Math.pow(2, z);
        }

        var view = new ol.View({
            projection: projection,
            center: [113, 15],
            zoom: 5,
            minZoom: 4,
            maxZoom: 23
        });
        this.staticview=view;

        var vector3 = new ol.layer.Tile({
            source: new ol.source.WMTS({
                name: "中国矢量1-4级",
                url: "http://t{0-6}.tianditu.com/vec_c/wmts?tk=9c41fb2fee6116b94fd0e0b3d032b354",
                layer: "vec",
                style: "default",
                matrixSet: "c",
                format: "tiles",
                wrapX: true,
                tileGrid: new ol.tilegrid.WMTS({
                    origin: ol.extent.getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                })
            })
        });
        var vector4 = new ol.layer.Tile({
            source: new ol.source.WMTS({
                name: "中国矢量注记1-4级",
                url: "http://t{0-6}.tianditu.com/cva_c/wmts?tk=9c41fb2fee6116b94fd0e0b3d032b354",
                layer: "cva",
                style: "default",
                matrixSet: "c",
                format: "tiles",
                wrapX: true,
                tileGrid: new ol.tilegrid.WMTS({
                    origin: ol.extent.getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                })
            })
        });
        console.info(this.vectorrain)
        this.map = new ol.Map({
            layers: [vector3, vector4,this.vectorrain],
            target: 'p_3',

            view: view,
            // controls: ol.control.defaults().extend([
            //     new ol.control.MousePosition(
            //         {
            //             target: document.getElementById('zb_x')
            //         }
            //     )
            // ])
        });
        //划警戒线
        var Vigilancesource = new ol.source.Vector({
            features: []
        });


        //创建一个图层
        var Vigilancevector = new ol.layer.Vector({
            source: Vigilancesource,
            id: 'jingjiexian'
        });

        //将绘制层添加到地图容器中
        this.map.addLayer(Vigilancevector);
        var hour24 = new ol.Feature({
            geometry: new ol.geom.LineString([[105, 0],[113, 4.50],[119, 11],[119, 18],[127, 22],[127, 34]]),
            id:'24hour'
        });

        //设置24小时线的样式
        hour24.setStyle(new ol.style.Style({
            //填充色
            lineDash: [1, 2, 3, 4, 5, 6, 7],
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            //边线颜色
            stroke: new ol.style.Stroke({
                color: '#657FFA',
                width: 1.5
            }),
            //形状
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#657FFA'
                })
            })
        }));
        var hour48 = new ol.Feature({
            geometry: new ol.geom.LineString([[105, 0],[120, 0],[132, 15],[132, 34]]),
            id:'48hour'
        });

        //设置24小时线的样式
        hour48.setStyle(new ol.style.Style({
            //填充色
            lineDash: [1, 2, 3, 4, 5, 6, 7],
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            //边线颜色
            stroke: new ol.style.Stroke({
                lineDash: [1, 2, 3, 4, 5, 6, 7],
                color: '#6EB36C',
                width: 1.5
            }),
            //形状
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#6EB36C'
                })
            })
        }));
        Vigilancesource.addFeature(hour24)
        Vigilancesource.addFeature(hour48)

        this.titletip = new ol.Overlay({
            element: document.getElementById("titletip"),

            //是否应该停止事件传播到地图窗口
            stopEvent: false
        });

        this.titletip.setPosition([113, 15]);
        this.map.addOverlay(this.titletip);


        this.map.on('pointermove', function(event){
            this.forEachFeatureAtPixel(event.pixel, function(feature){
                // 为移动到的feature发送自定义的mousemove消息

                // console.info(event.coordinate)
                // if(feature.getProperties().id!='fq_7'&&feature.getProperties().id!='fq_10'&&feature.getProperties().id!='fq_12'){
                //
                // }
                // $("#titletip").show()
                // switch (feature.getProperties().id) {
                //     case 'fq_7':{
                //         this.titletip.setPosition([event.coordinate[0], event.coordinate[1]])
                //     }break;
                //     case 'fq_10':{
                //         this.titletip.setPosition([event.coordinate[0], event.coordinate[1]])
                //     }break;
                //     case 'fq_12':{
                //         this.titletip.setPosition([event.coordinate[0], event.coordinate[1]])
                //     }break;
                // }

            });
            // console.info(event)
        });

        this.map.on('singleclick', function(event){
            console.info(is_singleclick)
                if(is_singleclick){
                    console.info(event.coordinate)
                    toolEN(event.coordinate)

                }
            // console.info(event)
        });
        // this.staticanchor.setPosition([116, 15]);

        // var selectClick = new ol.interaction.Select({
        //     condition: ol.events.condition.click,
        //     multi: true
        // });
        // this.map.addInteraction(selectClick);
        // selectClick.on('select', function (e) {
        //     var features = e.target.getFeatures();
        //     if (features.getLength() > 0) {
        //         var curFeature = features[0];//当前点击要素
        //     }
        // });
    }
}