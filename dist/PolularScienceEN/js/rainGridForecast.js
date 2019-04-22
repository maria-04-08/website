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
    zoom: 6,
    minZoom: 5,
    maxZoom: 23
});
var map;
// var vectorrain = new ol.layer.Vector({
//     source: null
// });

var windSybom = new Array();
var style1 = new ol.style.Style({
    fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
        color: 'rgba(245, 245, 245, 1)'
    }),
    stroke: new ol.style.Stroke({ //边界样式
        color: '#b2a590',
        width: 1
    }),
    text: new ol.style.Text({ //文本样式
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
        })
    })
});
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
var elementValue_Overlay = new ol.Overlay({
    element: document.getElementById("elementValue_div"),
    stopEvent: false
});
//定位坐标
var result_ico_Overlay = new ol.Overlay({
    element: document.getElementById("result_ico_1"),
    stopEvent: false
});
//初始化
// $(function () {
//     $.ajaxSetup({ cache: false });
//     init_ditu();
//     $(".p_2_men").click(function () {
//         var static_index = $(this).index('.p_2_men');
//         $(this).addClass('p_2_men_active').siblings().removeClass('p_2_men_active');
//         choeseElement(static_index);
//     });
//     $(".right_mianban").niceScroll({ cursorborder: "", cursorcolor: "#CCCCCC", boxzoom: false });
//
//     $.getJSON("/WebAPI/GetTimeRange", function (arr) {
//         if (arr) {
//             //console.info(arr);
//             SetProgressTime(DrawIsosurface, arr[0], arr[1]);
//             DrawIsosurface(arr[0]);
//         }
//     });
//     $("#search-q").keyup(function (event) {
//         if (event.keyCode == 13) {
//             addressSubmit();
//         }
//     });
//
//     $("#search-q").autocomplete({
//         delay: 100, source: function (request, response) {
//             // request对象只有一个term属性，对应用户输入的文本
//             // response在你自行处理并获取数据后，将JSON数据交给该函数处理，以便于autocomplete根据数据显示列表
//             var p = request.term;
//             if (p.length > 1) {
//                 $.getJSON("/webapi/AddressSuggestion?address=" + p, function (data) {
//                     if (data && data.status === 0) {
//                         response($.map(data.result, function (item) {
//                             return item.province + item.city + item.district + " " + item.name;
//                         }));
//                     }
//                 });
//             }
//         },
//         select: function (event, ui) { //event参数是事件对象，ui对象只有一个item属性，对应数据源中被选中的对象
//             $("#search-q").val(ui.item.label);
//             return false;
//         }
//     });
//     $("#slidex1").slider({
//         orientation: "horizontal",
//         range: "min",
//         max: 100,
//         value: 100,
//         slide: refreshSwatch,
//         change: refreshSwatch
//     });
//
//     $("#pointCheckbox").click(function () {
//         gpsSerach = !gpsSerach;
//         if (gpsSerach) {
//             $(".addressLabel").hide();
//             $(".gpsLabel").show();
//         }
//         else {
//             $(".addressLabel").show();
//             $(".gpsLabel").hide();
//         }
//     });
//     $("#menu_box").click(function () {
//         if (isDrag) return;
//         $("#menu_box").find("i").toggleClass("glyphicon-remove");
//         $("#slider_box").toggle(200);
//         $("#legend_box").toggle(200);
//     });
//     $("#controlBox").draggable({ start: function () { isDrag = true; }, stop: function () { setTimeout(function () { isDrag = false; }, 200); } });
// });
var isDrag = false;
var gpsSerach = false;
function refreshSwatch() {
    var v = $("#slidex1").slider("value") / 100;
    vector.setOpacity(v);
}

//选择要展示的要素
function choeseElement(_index) {
    switch (_index) {
        case 0://温度
            theKey = 1;
            $("#img_legend").attr("src", "/img/temp_legend.png");
            break;
        case 1://降水
            theKey = 0;
            $("#img_legend").attr("src", "/img/rain_legend.png");
            break;
        case 2://风
            theKey = 3;
            $("#img_legend").attr("src", "/img/wind_legend.png");
            break;
        case 3://云量
            theKey = 4;
            $("#img_legend").attr("src", "/img/cloud_legend.png");
            break;
        case 4://湿度
            theKey = 5;
            $("#img_legend").attr("src", "/img/rh_legend.png");
            break;
        case 5://能见度
            theKey = 6;
            $("#img_legend").attr("src", "/img/vis_legend.png");
            break;
    }
    DrawIsosurface(forcastTime);
}
var highlightStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: '#f00',
        width: 0.5
    }),
    fill: new ol.style.Fill({
        color: 'rgba(255,0,0,0)'
    })
});
var featureOverlay;
//初始化地图
function init_ditu() {
    // 实例化鼠标位置控件
    //var mousePositionControl = new ol.control.MousePosition({
    //    coordinateFormat: ol.coordinate.createStringXY(4), //坐标格式
    //    projection: 'EPSG:4326', //地图投影坐标系
    //    className: 'custom-mouse-position', //坐标信息显示样式
    //    // 显示鼠标位置信息的目标容器
    //    target: document.getElementById('mouse-position'),
    //    undefinedHTML: '&nbsp' //未定义坐标的标记
    //});
    var contryLine = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/Content/' + countries_lang + '.json',
            format: new ol.format.GeoJSON()
        }),
        style: function (feature, resolution) {
            style1.getText().setText(resolution < 5000 ? feature.get('name') : '');  //当放大到1:5000分辨率时，显示国家名字
            return [style1];
        }
    });
    featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: highlightStyle
    });
    map = new ol.Map({
        layers: [vector3,vector4, vector, featureOverlay, contryLine],
        target: 'p_3',
        view: view
        // 加载控件到地图容器中
        // 加载鼠标位置控件
        //controls: ol.control.defaults().extend([mousePositionControl])
    });
    map.on('singleclick',
        function (e) {
            var coordinate = e.coordinate;
            if (coordinate[0] < 106.1 || coordinate[0] > 120.35 || coordinate[1] < 1.3 || coordinate[1] > 23.6) {
                msgBook();
            } else {
                curPoint = coordinate;
                getForecastDataByGps(coordinate[0], coordinate[1]);

            }
        });

    map.on('pointermove', function (evt) {
        if (evt.dragging) {//如果是拖动地图则返回
            return;
        }
        displayFeatureInfo(evt);
    });

    map.addOverlay(elementValue_Overlay);
    map.addOverlay(result_ico_Overlay);
    //实例化ZoomSlider控件
    // var zoomslider = new ol.control.ZoomSlider();
    // //加载ZoomSlider控件到地图容器中
    // map.addControl(zoomslider);
    //
    // //实例化ZoomToExtent
    // var zoomToExtent = new ol.control.ZoomToExtent({
    //     extent: [106, 1.3, 120, 23], tipLabel: "复位"
    // });
    // //加载ZoomToExtent到map中
    // map.addControl(zoomToExtent);
    //地图显示区域改变
    //map.on('moveend', function (evt) {
        
    //    console.info(evt.frameState.extent);
    //    var exten = evt.frameState.extent;

    //});
}




var displayFeatureInfo = function (evt) {
    var pixel = CMapDraw.map.getEventPixel(evt.originalEvent);
    var feature = CMapDraw.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        return feature;
    }, null, function (layer) {
        return layer === CMapDraw.vectorrain;
    });
    featureOverlay.getSource().clear();
    elementValue_Overlay.setPosition([0, 0]);
    if (feature) {
        var curValue = getValueByIndex(feature.get("index"));
        //console.info(evt);
        var coordinate = evt.coordinate;
        $("#elementValue").text(curValue);
        $("#localPoint").text(coordinate[0].toFixed(4) + "，" + coordinate[1].toFixed(4));
        elementValue_Overlay.setPosition(coordinate);
        featureOverlay.getSource().addFeature(feature);
    }

};
function getForecastDataByGps(lon, lat) {
    expandRight();
    //map.getOverlays().clear();
    $(".css_animation").remove();
    //$("#right_xq").text(" 经度：" + lon.toFixed(4) + "，纬度" + lat.toFixed(4));
    $("#longitude").text(lon.toFixed(4));
    $("#latitude").text(lat.toFixed(4));
    var point_div = document.createElement('div');
    point_div.className = "css_animation";
    var point_overlay = new ol.Overlay({
        element: point_div,
        positioning: 'center-center',
        stopEvent: false
    });
    point_overlay.setPosition([lon, lat]);
    map.addOverlay(point_overlay);
    refreshMap();
    $.getJSON("/WebApi/GetNextTenDays", function (data) {
        if (data) {
            var sb = "";
            //$("#forcastDateHeader").html("");
            for (var i = 0; i < data.length; i++) {
                if (i === curDay) {
                    sb += '<span class="gridForecastDateItem gridForecastDateItemOn" onclick="dayPanelClick($(this),' + i + ')"><p class="right_month">' + data[i][0] + '</p><p>' + data[i][1] + '</p></span>';
                    curDate = data[i][0] + data[i][1];
                }
                else
                    sb += '<span class="gridForecastDateItem" onclick="dayPanelClick($(this),' + i + ')"><p class="right_month">' + data[i][0] + '</p><p>' + data[i][1] + '</p></span>';
            }
            $("#forcastDateHeader").html(sb);
        }
    });
    getDayForecastData();
    getHourForecastData();
}
//展开右边面板
function expandRight() {
    $(".right_mianban").animate({ right: '0px' });
    $(".ol-zoom").css('right', '450px');
    $(".ol-zoomslider").css('right', '450px');
    $(".ol-zoom-extent").css('right', '450px');
}

//关闭右边面板
function closeRightPanel() {
    $(".right_mianban").animate({ right: '-550px' });
    $(".ol-zoom").css('right', '10px');
    $(".ol-zoomslider").css('right', '10px');
    $(".ol-zoom-extent").css('right', '10px');
}
//刷新地图
function refreshMap() {
    var zoom = view.getZoom();
    view.setZoom(zoom + 1);
    view.setZoom(zoom);
}
//当前天
var curDay = 0;
var curDate = "";
//当前要素
var curKey = 1;
//当前点坐标
var curPoint = [];
/*
 * 
 天面板点击事件
 */
function dayPanelClick(_this, day) {
    _this.addClass('gridForecastDateItemOn').siblings().removeClass('gridForecastDateItemOn');
    curDay = day;
    curDate = _this.text();
    getDayForecastData();
    getHourForecastData();
}
//获取天预报
function getDayForecastData() {
    $.getJSON("http://www.scsweather.com/WebApi/GetDayDataByGps?lon=" + curPoint[0] + "&lat=" + curPoint[1] + "&day=" + curDay, function (data) {
        if (data) {
            $("#cur_sky_day").attr('src', '/img/white_' + data.data_day.PHE + '.png');
            $("#cur_wendu_day").text(data.data_day.Temperature);
            $("#cur_wind_day").text(data.data_day.WindSpeed);
            $("#cur_rain_day").text(data.data_day.Rain);
            $("#cur_h_day").text(data.data_day.RH);
            $("#cur_vis_day").text(data.data_day.VIS);
            $("#cur_cloud_day").text(data.data_day.Cloud);

            $("#cur_sky_night").attr('src', '/img/night_' + data.data_night.PHE + '.png');
            $("#cur_wendu_night").text(data.data_night.Temperature);
            $("#cur_wind_night").text(data.data_night.WindSpeed);
            $("#cur_rain_night").text(data.data_night.Rain);
            $("#cur_h_night").text(data.data_night.RH);
            $("#cur_vis_night").text(data.data_night.VIS);
            $("#cur_cloud_night").text(data.data_night.Cloud);
        }
    });
}
//获取小时预报
function getHourForecastData() {
    $.getJSON("http://www.scsweather.com/WebApi/GetHourDataByGps?lon=" + curPoint[0] + "&lat=" + curPoint[1] + "&key=" + curKey + "&day=" + curDay, function (data) {
        if (data) {
            InitCharts(curKey, data, curDate);
        }
    });
}
//要素面板点击
function keyPanelClick(_this, key) {
    _this.addClass('cbl_tab_item_on').siblings().removeClass('cbl_tab_item_on');
    curKey = key;
    getHourForecastData();
}

var theKey = 1;

var style1 = new ol.style.Style({
    fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
        color: 'rgba(0, 0, 0, 0)'
    }),
    stroke: new ol.style.Stroke({ //边界样式
        color: '#b2a590',
        width: 1
    }),
    text: new ol.style.Text({ //文本样式
        font: '12px Microsoft YaHei,sans-serif',
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
        })
    })
});
var forcastTime = "";
//画等值面
function DrawIsosurface(_forcastTime) {
    $('#myModal').modal('show');
    forcastTime = _forcastTime;
    try {
        $.ajaxSetup({
            error: function (x, e) {
                $('#myModal').modal('hide');
                return false;
            }
        });
        $.getJSON("http://www.scsweather.com/WebApi/GetIsosurface?key=" + theKey + "&forcastTime=" + _forcastTime, function (result) {
            $('#myModal').modal('hide');
            if (result) {
                var geojson = {
                    "type": "FeatureCollection",
                    "totalFeatures": result[0].length,
                    "features": []
                };
                var i;
                for (i = 0; i < result[0].length; i++) {
                    var contour = result[0][i];
                    var coords = [];
                    for (var j = 0; j < contour.P.length; j++) {
                        var latlon = contour.P[j];
                        coords.push(latlon);
                    }
                    var feature = {
                        "type": "Feature",
                        "geometry_name": "geom",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [coords]
                        },
                        "properties": { /*"lowValue": contour.Value,*/ "index": contour.I }

                    };
                    geojson.features.push(feature);
                }
                var features = (new ol.format.GeoJSON()).readFeatures(geojson);
                for (i = 0; i < features.length; i++) {
                    features[i].getGeometry();
                }
                var vectorSource = new ol.source.Vector({
                    features: features
                });
                //map.removeLayer(vector);
                vector.setSource(vectorSource);
                vector.setStyle(styleFunction);
                //map.addLayer(vector);
                $(".wind_dir_img").remove();
                //textVector.getSource().clear();
                if (theKey == 3)//为风时画风向杆
                {
                    //console.info(map.getOverlays());
                    //map.getOverlays().clear();
                    while (windSybom.length > 0) {
                        map.getOverlays().remove(windSybom.pop());
                    }
                    for (i = 0; i < result[1].length; i++) {
                        var curWindInfo = result[1][i];
                        DrawWindSymbol(curWindInfo[0], curWindInfo[1], curWindInfo[2], curWindInfo[3]);
                    }
                    refreshMap();
                }
                else//画要素值
                {
                    while (windSybom.length > 0) {
                        map.getOverlays().remove(windSybom.pop());
                    }
                    for (i = 0; i < result[1].length; i++) {
                        var curValueInfo = result[1][i];
                        drawTextSymbol(curValueInfo[0], curValueInfo[1], curValueInfo[2]);
                    }
                }

            }
        });
    }
    catch (ex) {
        $('#myModal').modal('hide');
    }

}

//画风向杆
function DrawWindSymbol(lon, lat, speed, dir) {
    var point_div = document.createElement("img");
    point_div.src = getWindImg(speed);
    point_div.setAttribute("class", "wind_dir_img");
    point_div.style.transform = "rotate(" + dir + "deg)";
    var point_overlay = new ol.Overlay({
        element: point_div,
        positioning: 'center-center',
        stopEvent: false
    });
    point_overlay.setPosition([lon, lat]);
    map.addOverlay(point_overlay);
    windSybom.push(point_overlay);
}

function getWindImg(speed) {
    var iconPath = "";
    if (speed <= 0)
        iconPath = "0.png";
    else if (speed > 0 && speed < 1) {
        iconPath = "0.png";
    }
    else if (speed >= 1 && speed < 3)
        iconPath = "2.png";
    else if (speed >= 3 && speed < 5)
        iconPath = "4.png";
    else if (speed >= 5 && speed < 7)
        iconPath = "6.png";
    else if (speed >= 7 && speed < 9)
        iconPath = "8.png";
    else if (speed >= 9 && speed < 11)
        iconPath = "10.png";
    else if (speed >= 11 && speed < 13)
        iconPath = "12.png";
    else if (speed >= 13 && speed < 15)
        iconPath = "14.png";
    else if (speed >= 15 && speed < 17)
        iconPath = "16.png";
    else if (speed >= 17 && speed < 19)
        iconPath = "18.png";
    else if (speed >= 19 && speed < 21)
        iconPath = "20.png";
    else if (speed >= 21 && speed < 23)
        iconPath = "22.png";
    else if (speed >= 23 && speed < 25)
        iconPath = "24.png";
    else if (speed >= 25 && speed < 27)
        iconPath = "26.png";
    else if (speed >= 27 && speed < 29)
        iconPath = "28.png";
    else if (speed >= 29 && speed < 31)
        iconPath = "30.png";
    else if (speed >= 31 && speed < 33)
        iconPath = "32.png";
    else if (speed >= 33 && speed < 35)
        iconPath = "34.png";
    else if (speed >= 35 && speed < 37)
        iconPath = "36.png";
    else if (speed >= 37 && speed < 39)
        iconPath = "38.png";
    else {
        iconPath = "40.png";
    }
    return "/img/WindDirectionIcon/" + iconPath;
}

//画字符
function drawTextSymbol(lon, lat, text) {
    var point_div = document.createElement("div");
    point_div.innerHTML =text;
    var point_overlay = new ol.Overlay({
        element: point_div,
        positioning: 'center-center',
        stopEvent: false
    });
    point_overlay.setPosition([lon, lat]);
    CMapDraw.map.addOverlay(point_overlay);
    windSybom.push(point_overlay);
}

function getRandom(probability) {
    var probability = probability * 100 || 1;
    var odds = Math.floor(Math.random() * 100);

    if (probability === 1) { return 1 };
    if (odds < probability) {
        return true;
    } else {
        return false;
    }
};
//等值面填充样式
function styleFunction(feature, resolution) {
    var curIndex = feature.get("index");

    var curColor = getColorByIndex(curIndex);
    if (curColor == "#000000" || curColor == "#FFFFFF") {
        curColor = "rgba(255, 255, 255, 0)";
    }
    var tempStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: curColor
        }),
    text: new ol.style.Text({ //文本样式
        font: '12px Microsoft YaHei,sans-serif',
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
        })
    })
    });
    //tempStyle.getText().setText(getRandom(0.1)? getValueByIndex(curIndex) : "");
    return tempStyle;
}
//根据索引得到颜色值
function getColorByIndex(_index) {
    var rainColors = ["#FFFFFF", "#000000", "#BCFFA6", "#A6F28F", "#8CE47B", "#72D666", "#58C852", "#3DBA3D", "#41BA55", "#46BA6D", "#4ABA85", "#4CBA91", "#4FB99E", "#61B8FF", "#315CF0", "#192EE9", "#0000E1", "#1F00E4", "#3E00E7", "#5D00EA", "#7D00ED", "#BB00F3", "#FA00FA", "#EB00E3", "#DC00CC", "#CD00B5", "#C500A9", "#BD009D", "#9F006F", "#900058", "#88004C", "#800040"];
    var tempColors = ["#000000", "#FFFFFF", "#6C4CBF", "#B8B2F2", "#5ACC8D", "#E5F866", "#FCF2AC", "#FCC865", "#FAA626", "#FA9C13", "#FA9200", "#FC860D", "#F86B0F", "#F05D04", "#F74F14", "#F93B0C", "#DE031B", "#6F1B27", "#54212A", "#38272D", "#38272D", "#38272D", "#38272D"];
    var windColors = ["#000000", "#D3F9C7", "#D3F9C7", "#A6F28F", "#72D666", "#3DBA3D", "#46BA6D", "#4FB99E", "#61B8FF", "#315CF0", "#7D00ED", "#FA00FA", "#BD009D", "#800040"];
    var cloudColors = ["#000000", "#FFFFFF", "#D7E3EE", "#B5CAFF", "#8FB3FF", "#7F97FF", "#ABCF63", "#E8F59E", "#FFFA14", "#FFD121", "#FFA30A", "#FF4C00"];
    var visColors = ["#000000", "#FFFFFF", "#FF0099", "#FF0066", "#FF0000", "#FFB000", "#FFD900", "#FFFE00", "#FEFF7E", "#9DE414", "#7CCE18", "#5BB91B", "#3AA31E", "#198D22", "#1318B0", "#4448C3", "#7677D6", "#A8A6EA", "#D9D6FD"];
    var rhColors = ["#000000", "#FFFFFF", "#97E8AD", "#97E3B4", "#98DDBB", "#98D8C2", "#99D2CA", "#99CDD1", "#9AC7D9", "#9AC2E0", "#9BBCE8", "#95B9E8", "#8FB5E7", "#89B1E6", "#83ADE5", "#80ABE5", "#7DA9E4", "#7AA7E4", "#77A5E3", "#6EA0E2", "#659AE1", "#5C94E0", "#538EDE", "#4F88DA", "#4B82D5", "#477CD0", "#4376CB", "#3764BD", "#2A51AE", "#1E3F9F", "#112C90", "#0D2580", "#091E70", "#051760", "#000F50"];

    switch (0) {
        case 1://温度
            return tempColors[_index];
        case 0://降水
            return rainColors[_index];
        case 3://风
            return windColors[_index];
        case 4://云量
            return cloudColors[_index];
        case 5://湿度
            return rhColors[_index];
        case 6://能见度
            return visColors[_index];
    }
    return "#BCFFA6";
}

//根据索引得到数据值
function getValueByIndex(_index) {
    var rainColors = [0, 0.1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200, 225, 250];
    var tempColors = [0, 5, 10, 15, 20, 25, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];
    var windColors = [0, 1.6, 3.4, 5.5, 8, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.6, 37];
    var cloudColors = [0, 20, 40, 50, 60, 70, 80, 85, 90, 95, 100];
    var visColors = [0, 0.01, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    var rhColors = [0, 20, 22.5, 25, 27.5, 30, 32.5, 35, 37.5, 40, 42.5, 45, 47.5, 50, 52.5, 55, 57.5, 60, 62.5, 65, 67.5, 70, 72.5, 75, 77.5, 80, 82.5, 85, 87.5, 90, 92.5, 95, 97.5, 100];
    _index = _index - 1;
    switch (0) {
        case 1://温度
            return tempColors[_index] + " °C";
        case 0://降水
            return rainColors[_index] + " mm";
        case 3://风
            return windColors[_index] + " m/s";
        case 4://云量
            return cloudColors[_index] + " %";
        case 5://湿度
            return rhColors[_index] + " %";;
        case 6://能见度
            return visColors[_index] + " km";;
    }
    return "";
}

function msgBook() {
    $('#myRemind').modal('show');
    setTimeout(function () {
        $("#myRemind").modal("hide");
    }, 1200);
}

function addressSubmit() {
    result_ico_Overlay.setPosition([0, 0]);
    var p = $("#search-q").val();
    if (gpsSerach)
    {
        var lon = parseFloat($("#lon-q").val());
        var lat = parseFloat($("#lat-q").val());
        if (!isNaN(lon) && !isNaN(lat)) {
            $.getJSON("/webapi/EnGeocoder?lon=" + lon+"&lat="+lat, function (data) {
                if (data && data.status === 0) {
                    result_ico_Overlay.setPosition([lon, lat]);
                    $("#result_q").text(data.formatted_address);
                    gotoAddress(lon, lat);
                }
                else {
                    alert("查询失败");
                }
            });
        } else {
            alert("请输入正确的的数字");
        }
    }
    else {
        if (p.length > 2) {
            $.getJSON("/webapi/Geocoder?address=" + p, function (data) {
                if (data && data.status === 0) {
                    var location = data.result.location;
                    result_ico_Overlay.setPosition([location.lng, location.lat]);
                    $("#result_q").text(p);
                    gotoAddress(location.lng, location.lat);
                }
                else {
                    alert("查询失败,请输入尽可能的详细地址");
                }
            });
        }
        else {
            alert("请输入尽可能的详细地址！");
        }
    }
    
}

function gotoAddress(lon, lat) {
    //动画
    var duration = 2000; //持续时间（毫秒）
    var start = +new Date();
    //移动效果
    var pan = ol.animation.pan({
        duration: duration, //设置持续时间
        source: /** type {ol.Coordinate} */(view.getCenter()),
        start: start
    });
    //反弹效果
    var bounce = ol.animation.bounce({
        duration: duration, //设置持续时间
        resolution: 4 * view.getResolution(),  //4倍分辨率
        start: start
    });
    map.beforeRender(pan, bounce); //地图渲染前设置动画效果(pan+bounce)
    //定位
    view.setCenter([parseFloat(lon), parseFloat(lat)]);
    view.setZoom(10);

    if (lon < 106.1 || lon > 120.35 || lat < 1.3 || lat > 23.6) {
        msgBook();
    } else {
        curPoint = [parseFloat(lon), parseFloat(lat)];
        getForecastDataByGps(lon, lat);

    }
}