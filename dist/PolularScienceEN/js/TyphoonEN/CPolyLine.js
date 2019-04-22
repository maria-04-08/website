
//台风路径（折线）
CPolyLine = function () {
    this.map = null;
    this.layer = null;
    this.Source = null;
    this.Vectorarr=[];
    this.varr=[];
    this.is_Source=null;
    this.is_Vector=null
    this.staticanchor2=null;
    // this.titletip=null;
    this.is_title="";
    // var styleFunc = function (feature, resolution) {
    //     var office = feature.get("ForecastOffice");//发布机构
    //     var type = feature.get("Type");//台风点类型
    //     var lineColor;//线颜色
    //     var pointColor;//点颜色
    //     switch (type) {
    //         case 0://弱于热带低压
    //             pointColor = "#EEEEEE";
    //             break;
    //         case 1://热带低压
    //             pointColor = "#00FF03";
    //             break;
    //         case 2://热带风暴
    //             pointColor = "#0062FE";
    //             break;
    //         case 3://强热带风暴
    //             pointColor = "#FDFA00";
    //             break;
    //         case 4://台风
    //             pointColor = "#FDAC03";
    //             break;
    //         case 5://强台风
    //             pointColor = "#F072F6";
    //             break;
    //         case 6://超强台风
    //             pointColor = "#FD0002";
    //             break;
    //         default:
    //             pointColor = "#EEEEEE";
    //             break;
    //     }
    //     switch (office) {
    //     case "中国":
    //         lineColor = "#FF4050";
    //         break;
    //     case "中国香港":
    //         lineColor = "#FF66FF";
    //         break;
    //     case "日本":
    //         lineColor = "#43FF4B";
    //         break;
    //     case "中国台湾":
    //         lineColor = "#FFA040";
    //         break;
    //     case "美国":
    //         lineColor = "#40DDFF";
    //         break;
    //     case "韩国":
    //         lineColor = "#669999";
    //         break;
    //     case "欧洲":
    //         lineColor = "#373591";
    //         break;
    //     default:
    //         lineColor = "black";
    //         break;
    //     }
    //     var output = {};
    //     //台风节点
    //     output["TyphoonNodes_Unselected"] = {
    //
    //     };
    //     output["TyphoonNodes_Selected"] = {
    //
    //     };
    //     var styles = [
    //         new ol.style.Style({
    //             stroke: new ol.style.Stroke({
    //                 lineDash: [1, 2, 3, 4, 5, 6, 7], //预报数据用虚线
    //                 color: lineColor,
    //                 width: 1
    //             }),
    //             fill: new ol.style.Fill({
    //                 color: 'rgba(0, 0, 255, 0.1)'
    //             })
    //
    //         }),
    //         new ol.style.Style({
    //             image: new ol.style.Circle({
    //                 radius: 5,
    //                 fill: new ol.style.Fill({
    //                     color: pointColor
    //                 }),
    //                 cursor: 'pointer'
    //             }),
    //             geometry: function (feature) {
    //                 var coordinates = feature.getGeometry().getCoordinates()[0];
    //                 return new ol.geom.MultiPoint(coordinates);
    //             }
    //         })
    //         ];
    //     return styles;
    // }

    this.init = function (aMap) {
        this.map = aMap;
        // this.layer = this.map.getLayers().forEach(function (lyr) {
        //     if (id == lyr.get('id')) {
        //         layer = lyr;
        //     }
        // });
        // console.info(this.layer)
        // if(this.layer.length>0){
        //     for(var i=0;i<this.layer.length;i++){
        //
        //     }
        // }

        // this.layer = this.map.getLayers().getArray()
        this.staticanchor2 = new ol.Overlay({
            element: document.getElementById("stretchcontent2"),

            //是否应该停止事件传播到地图窗口
            stopEvent: false
        });
        this.staticanchor2.setPosition([113, 15]);
        this.map.addOverlay(this.staticanchor2);


        // console.info(this.layer)
        // if (this.layer == null) {
        //
        //     this.Source = new ol.source.Vector({
        //     });
        //
        //     this.layer = new ol.layer.Vector({
        //         id: "tyhphoonLineLayer",
        //         source: this.Source,
        //         style: styleFunc
        //     });
        //     this.Map.layers.add(layer);
        // }
    }
    //画实线
    this.CreateLine = function (aMap, data,id) {
var source = new ol.source.Vector({
            features: []
        });
        this.Vectorarr.push({
            id:id,
            val:source
        });
        this.is_Source=source;
        //创建一个图层
        var vector = new ol.layer.Vector({
            source: source,
            id: id
        });
        this.varr.push({
            id:id,
            val:vector
        })
        this.is_Vector=vector
        //将绘制层添加到地图容器中
        aMap.addLayer(vector);
        var points = [];
        CMapDraw.staticview.setCenter([data[data.length-1].Lon, data[data.length-1].Lat]);
        for (var i = 1; i < data.length; i++) {
            // points.push([data[i].Lon, data[i].Lat]);
            var Line = new ol.Feature({
                geometry: new ol.geom.LineString([[data[i-1].Lon, data[i-1].Lat],[data[i].Lon, data[i].Lat]]),
                id:'asd'
            });

            //设置线的样式
            Line.setStyle(new ol.style.Style({
                //填充色
                lineDash: [1, 2, 3, 4, 5, 6, 7],
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                //边线颜色
                stroke: new ol.style.Stroke({
                    color: '#000',
                    width: 3
                }),
                //形状
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#000'
                    })
                })
            }));
            // setTimeout(function() {
                // $('#tt2').datagrid("selectRow",0)
                // source.addFeature(Line)
                if(i==data.length-1){
                    this.Drawpointfunction(source,Line,i,false,id)

                }else{
                    this.Drawpointfunction(source,Line,i,data,id)

                }

            // }, 500);
            
            
        }
        
        this.Drawpoint1(data,id,id)
        // for (var i = 0; i < data.length; i++) {
        //     points.push([data[i].Lon, data[i].Lat]);
        // }
        //
        //
        // var Line = new ol.Feature({
        //     geometry: new ol.geom.LineString(points),
        //     id:'asd'
        // });
        //
        // //设置线的样式
        // Line.setStyle(new ol.style.Style({
        //     //填充色
        //     lineDash: [1, 2, 3, 4, 5, 6, 7],
        //     fill: new ol.style.Fill({
        //         color: 'rgba(255, 255, 255, 0.2)'
        //     }),
        //     //边线颜色
        //     stroke: new ol.style.Stroke({
        //         color: '#000',
        //         width: 3
        //     }),
        //     //形状
        //     image: new ol.style.Circle({
        //         radius: 7,
        //         fill: new ol.style.Fill({
        //             color: '#000'
        //         })
        //     })
        // }));
        //
        //
        // // console.info(point)
        // //实例化一个矢量图层Vector作为绘制层
        // // point.push(Line)
        // var source = new ol.source.Vector({
        //     features: [Line]
        // });
        // this.Vectorarr.push({
        //     id:id,
        //     val:source
        // });
        // this.is_Source=source;
        // //创建一个图层
        // var vector = new ol.layer.Vector({
        //     source: source,
        //     id: id
        // });
        // this.varr.push({
        //     id:id,
        //     val:vector
        // })
        // this.is_Vector=vector
        // //将绘制层添加到地图容器中
        // aMap.addLayer(vector);
        // console.info(vector.getSource().getFeatureById('asd'))
        // this.Drawpoint1(data,id,id)
    }
    this.Drawpointfunction=function (source,Line,i,data,id) {
        // source.addFeature(Line)
        setTimeout(function() {
            console.info(Line)
            source.addFeature(Line)
if(!data){
    setTimeout(function() {
        if(path_list==''){
            return
        }
        if(id==staticid){
            is_animouse=false

            $('#tt2').datagrid("selectRow",0)

        }else {
            onSelect2(id)

        }


    }, 100);
}else{
    is_animouse=true

}

        }, i*50);
    }
    //画点
    this.Drawpoint1=function (data,id,clas) {
        console.info(data)
        // var point=[]
        var index=0;
        var tit='';
        var itemdata=null;
        for(var i=0;i<Typhoon_list.rows.length;i++){
            if(Typhoon_list.rows[i].EnName==clas){
                // tit=Typhoon_list.rows[i].Year+Typhoon_list.rows[i].CnName+'('+Typhoon_list.rows[i].EnName+')';
                tit=Typhoon_list.rows[i].Year+Typhoon_list.rows[i].EnName;
                itemdata=Typhoon_list.rows[i];
            }
        }
        for(var i=0;i<data.length;i++){
            var pointColor=null
            switch (data[i].Type) {
                case 0://弱于热带低压
                    pointColor = "#EEEEEE";

                    break;
                case 1://热带低压

                    pointColor = "#00FF03";
                    break;
                case 2://热带风暴

                    pointColor = "#0062FE";
                    break;
                case 3://强热带风暴

                    pointColor = "#FDFA00";
                    break;
                case 4://台风

                    pointColor = "#FDAC03";
                    break;
                case 5://强台风

                    pointColor = "#F072F6";
                    break;
                case 6://超强台风

                    pointColor = "#FD0002";
                    break;

            }
            var add=[data[i].Lon,data[i].Lat]
            var strarr=data[i].Time.split(' ')
            console.info(this.is_title)

            if(data[i].ForecastOffice){
                $("body").append(
                    "<span " +
                    "data-title="+tit+" "+
                    "data-CenterPressure="+data[i].CenterPressure+" "+
                    "data-CenterWindPower="+data[i].CenterWindPower+" "+
                    "data-CenterWindSpeed="+data[i].CenterWindSpeed+" "+
                    "data-Cir7_NE="+data[i].Cir7_NE+" "+
                    "data-Cir7_NW="+data[i].Cir7_NW+" "+
                    "data-Cir7_SE="+data[i].Cir7_SE+" "+
                    "data-Cir7_SW="+data[i].Cir7_SW+" "+
                    "data-Cir10_NE="+data[i].Cir10_NE+" "+
                    "data-Cir10_SW="+data[i].Cir10_SW+" "+
                    "data-Cir12_NE="+data[i].Cir12_NE+" "+
                    "data-Cir12_NW="+data[i].Cir12_NW+" "+
                    "data-Cir12_SE="+data[i].Cir12_SE+" "+
                    "data-MoveDirection="+data[i].MoveDirection+" "+
                    "data-MoveSpeed="+data[i].MoveSpeed+" "+
                    "data-Lon="+data[i].Lon+" "+
                    "data-Lat="+data[i].Lat+" "+
                    "data-ForecastOffice="+data[i].ForecastOffice+" "+
                    "data-Time="+strarr[0]+" "+
                    "data-Time2="+strarr[1]+" "+

                    // "data-Type="+data[i].Type+" "+
                    "onmouseout='hidemianban($(this))' "+
                    // "onclick='again_Dottedline($(this),"+clas+")'  "+
                    " onmouseenter='showmianban($(this),"+add[0]+","+add[1]+")' id='"+id+i+"'  class='dian "+clas+' '+clas+'xu'+"' style='background-color: "+pointColor+"'></span>"

                )
            }else {
                $("body").append(
                    "<span " +
                    "data-CnName="+itemdata.CnName+" "+
                    "data-EnName="+itemdata.EnName+" "+
                    "data-TyphoonId="+itemdata.TyphoonId+" "+
                    "data-index="+((data.length-1)-i)+" "+

                    "data-title="+tit+" "+
                    "data-CenterPressure="+data[i].CenterPressure+" "+
                    "data-CenterWindPower="+data[i].CenterWindPower+" "+
                    "data-CenterWindSpeed="+data[i].CenterWindSpeed+" "+
                    "data-Cir7_NE="+data[i].Cir7_NE+" "+
                    "data-Cir7_NW="+data[i].Cir7_NW+" "+
                    "data-Cir7_SE="+data[i].Cir7_SE+" "+
                    "data-Cir7_SW="+data[i].Cir7_SW+" "+
                    "data-Cir10_NE="+data[i].Cir10_NE+" "+
                    "data-Cir10_SW="+data[i].Cir10_SW+" "+
                    "data-Cir12_NE="+data[i].Cir12_NE+" "+
                    "data-Cir12_NW="+data[i].Cir12_NW+" "+
                    "data-Cir12_SE="+data[i].Cir12_SE+" "+
                    "data-MoveDirection="+data[i].MoveDirection+" "+
                    "data-MoveSpeed="+data[i].MoveSpeed+" "+
                    "data-Lon="+data[i].Lon+" "+
                    "data-Lat="+data[i].Lat+" "+
                    "data-clas="+clas+" "+
                    "data-Time="+strarr[0]+" "+
                    "data-Time2="+strarr[1]+" "+
                    // "data-Type="+data[i].Type+" "+
                    "onmouseout='hidemianban($(this))' "+
                    "onclick='again_Dottedline($(this))' "+
                    " onmouseenter='showmianban($(this),"+add[0]+","+add[1]+")' id='"+id+i+"'  class='dian dian2 "+clas+"' style='background-color: "+pointColor+"'>" +
                    "<img class='typhoonnew' style='position: absolute;top:-11px;left:-11px;display: none' src='img/typhoonnew.png'>"+
                    "</span>"


                )
            }

            var _id=id+i
            var point = new ol.Overlay({
                element: document.getElementById(_id),

                //是否应该停止事件传播到地图窗口
                stopEvent: false
            });
            point.setPosition([data[i].Lon, data[i].Lat]);


            this.Drawpointfunction2(this.map,point,i)
        }

    }
    this.Drawpointfunction2=function (map,point,i) {
        // source.addFeature(Line)
        setTimeout(function() {
            if(path_list==''){
                return
            }
            map.addOverlay(point)


        }, i*50);
    }
    //画虚线
    this.Dottedline=function (data,id,data2) {

        // console.info(this.Vectorarr[0])
        // CenterPressure: 935
        // CenterWindPower: 16
        // CenterWindSpeed: 52
        // Cir7_NE: null
        // Cir7_NW: null
        // Cir7_SE: null
        // Cir7_SW: null
        // Cir10_NE: null
        // Cir10_NW: null
        // Cir10_SE: null
        // Cir10_SW: null
        // Cir12_NE: null
        // Cir12_NW: null
        // Cir12_SE: null
        // ForecastOffice: "中国"
        // Lat: 15.4
        // Lon: 140
        // MoveDirection: null
        // MoveSpeed: null
        // Time: "2019-02-26 17:00:00"
        // Type: 6
        console.info(data)

        for(var i=0;i<data.length;i++) {
            var arr=data[i]

            var pointarr=[[data2.Lon,data2.Lat]]
            var lineColor=''
                switch (arr[0].ForecastOffice) {
                    case "中国":
                        lineColor = "#FF4050";
                        break;
                    case "China":
                        lineColor = "#FF4050";
                        break;
                    case "Hong Kong":
                        lineColor = "#FF66FF";
                        break;
                    case "中国香港":
                        lineColor = "#FF66FF";
                        break;
                    case "Japan":
                        lineColor = "#43FF4B";
                        break;
                    case "日本":
                        lineColor = "#43FF4B";
                        break;
                    case "Taiwan":
                        lineColor = "#FFA040";
                    case "中国台湾":
                        lineColor = "#FFA040";
                        break;
                    case "台湾":
                        lineColor = "#FFA040";
                        break;
                    case "America":
                        lineColor = "#40DDFF";
                        break;
                    case "美国":
                        lineColor = "#40DDFF";
                        break;
                    case "韩国":
                        lineColor = "#669999";
                    case "Korea":
                        lineColor = "#669999";

                        break;
                    case "欧洲":
                        lineColor = "#373591";
                        break;
                    default:
                        lineColor = "black";
                        break;
                }
            for (var j=0;j<arr.length;j++){
                pointarr.push([arr[j].Lon,arr[j].Lat])
            }


                var Line = new ol.Feature({
                    geometry: new ol.geom.LineString(pointarr),
                    id:id+'xu'
                });

                    //设置线的样式
                    Line.setStyle(new ol.style.Style({
                        //填充色
                        fill: new ol.style.Fill({
                            color: lineColor
                        }),
                        //边线颜色
                        stroke: new ol.style.Stroke({
                            lineDash: [1, 2, 3, 4, 5, 6, 7], //预报数据用虚线
                            color: lineColor,
                            width: 2
                        }),
                        //形状
                        image: new ol.style.Circle({
                            radius: 7,
                            fill: new ol.style.Fill({
                                color: lineColor
                            })
                        })
                    }));
                    console.info(this.Vectorarr[0].val)

            for(var k=0;k<this.Vectorarr.length;k++){
                if(this.Vectorarr[k].id==id){
                    this.Vectorarr[k].val.addFeature(Line)
                }
            }


        }




    }
    //删除一个路径
    this.DelLine = function(id) {

        console.info(id)
        $("."+id).remove()
        for(var i=0;i<this.Vectorarr.length;i++){
            if(this.Vectorarr[i].id==id){
                this.map.removeLayer(this.varr[i].val);
                this.Vectorarr.splice(i, 1)
                this.varr.splice(i, 1)
            }else{

            }
        }


    }
}