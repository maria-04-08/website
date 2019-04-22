//台风圈，画圈的
CTyphoonArea = function() {
    this.SE = null;//东南象限半径(km)
    this.NE = null;//东北象限半径(km)
    this.NW = null;//西北象限半径(km)
    this.SW = null;//西南象限半径(km)
    this.SEval = null;//东南象限半径(km)
    this.NEval = null;//东北象限半径(km)
    this.NWval = null;//西北象限半径(km)
    this.SWval = null;//西南象限半径(km)
    this.centerX = null;//中心坐标经度
    this.cennterY = null;//中心坐标纬度
    this.Map = null;
    this.layer = null;
    this.Source = null;
    this.PowerLvl = 7;//风圈级别：7\10\12级
    this.styleFunc = function (PowerLvl) {
        console.info(this.PowerLvl)
        switch (this.PowerLvl) {
        case 7://七级风圈样式
            return new ol.style.Style({

                fill: new ol.style.Fill({
                    color: 'rgba(0, 176, 15, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#00B00F',
                    width: 1
                }),
                image: new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({
                        color: '#00B00F'
                    })
                })
            });
        case 10://10级风圈样式
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(248,213,0,0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#F8D500',
                    width: 1
                }),
                image: new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({
                        color: '#F8D500'
                    })
                })
                });
        case 12://12级风圈样式
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 0, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#FF0000',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({
                        color: '#FF0000'
                    })
                })
            });
            // default:
            //     return new ol.style.Style({
            //         fill: new ol.style.Fill({
            //             color: 'rgba(255, 0, 0, 0.2)'
            //         }),
            //         stroke: new ol.style.Stroke({
            //             color: '#ffcc33',
            //             width: 2
            //         }),
            //         image: new ol.style.Circle({
            //             radius: 4,
            //             fill: new ol.style.Fill({
            //                 color: '#ff0000'
            //             })
            //         })
            //     });
        }
        
    };
    //初始化构造函数
    this.Ini = function(data,map,name) {
        console.info(this.PowerLvl)
        if(this.PowerLvl==7){
            this.SE = data.Cir7_SE/80;
            this.NE = data.Cir7_NE/80;
            this.NW =data.Cir7_NW/80;
            this.SW = data.Cir7_SW/80;
            this.SEval = data.Cir7_SE;//东南象限半径(km)
            this.NEval = data.Cir7_NE;//东北象限半径(km)
            this.NWval = data.Cir7_NW;//西北象限半径(km)
            this.SWval = data.Cir7_SW;//西南象限半径(km)
            this.Map = map;
            // this.layer=layer;
            // this.layer = Map.getLayer("tyhphoonAreaLayer");
            // if (this.layer == null) {

            this.Source= new ol.source.Vector({

            });

            this.layer = new ol.layer.Vector({
                id:"tyhphoonAreaLayer"+name,
                source:this.Source
                // style: this.styleFunc(this.PowerLvl)
            });
            this.Map.addLayer(this.layer);
        }
        if(this.PowerLvl==10){
            this.SE = data.Cir10_SE/80;
            this.NE = data.Cir10_NE/80;
            this.NW =data.Cir10_NW/80;
            this.SW = data.Cir10_SW/80;
            this.SEval = data.Cir10_SE;//东南象限半径(km)
            this.NEval = data.Cir10_NE;//东北象限半径(km)
            this.NWval = data.Cir10_NW;//西北象限半径(km)
            this.SWval = data.Cir10_SW;//西南象限半径(km)
        }
        if(this.PowerLvl==12){
            this.SE = data.Cir12_SE?data.Cir12_SE/80:0;
            this.NE = data.Cir12_NE?data.Cir12_NE/80:0;
            this.NW =data.Cir12_NW?data.Cir12_NW/80:0;
            this.SW = data.Cir12_SW?data.Cir12_SW/80:0;
            this.SEval = data.Cir12_SE;//东南象限半径(km)
            this.NEval = data.Cir12_NE;//东北象限半径(km)
            this.NWval = data.Cir12_NW;//西北象限半径(km)
            this.SWval = data.Cir12_SW;//西南象限半径(km)
        }
        this.centerX = data.Lon;
        this.centerY = data.Lat;

        // }
    }
    this.Add = function() {
        var wkt = "POLYGON((";
        var wkt0 = "", _interval = 6;
        for (var i = 0; i < 360 / _interval; i++) {
            var _r = 0;
            var _ang = i * _interval;
            if (_ang > 0 && _ang <= 90) {
                _r = this.NE;
            }
            else if (_ang > 90 && _ang <= 180) {
                _r = this.NW;
            }
            else if (_ang > 180 && _ang <= 270) {
                _r = this.SW;
            }
            else {
                _r = this.SE;
            }

            var x = this.centerX + _r * Math.cos(_ang * 3.14 / 180);
            var y = this.centerY + _r * Math.sin(_ang * 3.14 / 180);

            wkt = wkt + "" + x + " " + y + ", ";
            if (i === 0) {
                wkt0 = "" + x + " " + y + "";
            }
        }
        wkt = wkt + wkt0 + "))";

        var features = new Array();
        var wktformat = new ol.format.WKT();

        features.push(wktformat.readFeature(wkt));
        features.push(wktformat.readFeature("POINT(" + this.centerX + " " + this.centerY + ")"));

        features[0].set('id','fq_'+this.PowerLvl)
        features[0].set('title','fq_'+this.PowerLvl)
        features[0].setStyle(this.styleFunc(this.PowerLvl))
        console.info(features[0].getProperties())
        this.Source.addFeatures(features);
        //var source = new ol.source.Vector({
        //    features: features
        //});
        //layer.setSource(source);
    }
    this.ClearAll = function() {
        this.layer.removeAllFeatures();
    };
}