
//降雨分布图
function getrain(day) {
    delradar()
    $('#myModal').modal('show');
    featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: highlightStyle
    });
    CMapDraw.map.addLayer(featureOverlay)

    $.ajax({
        type: 'post',
        url:'http://www.scsweather.com/WebApi/GetRainProduct',
        data: {
            day:day
        },
        dataType: 'json',

        success: function(result) {
            $('#myModal').modal('hide');
            //请求成功时处理
            console.info("降雨分布图")
            console.info(result)

            if (result) {
                var geojson = {
                    "type": "FeatureCollection",
                    "totalFeatures": result.length,
                    "features": []
                };
                var i;
                for (i = 0; i < result.length; i++) {
                    var contour = result[i];
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
                CMapDraw.vectorrain.setSource(vectorSource);
                CMapDraw.vectorrain.setStyle(styleFunction);


                CMapDraw.map.on('pointermove', function (evt) {

                    if (evt.dragging) {//如果是拖动地图则返回
                        return;
                    }
                    displayFeatureInfo(evt);
                });
                CMapDraw.map.addOverlay(elementValue_Overlay);
                CMapDraw.map.addOverlay(result_ico_Overlay);


                //map.addLayer(vector);
                // $(".wind_dir_img").remove();
                // //textVector.getSource().clear();
                // while (windSybom.length > 0) {
                //     CMapDraw.map.getOverlays().remove(windSybom.pop());
                // }
                // console.info(result[1].P)
                //
                // for (i = 0; i < result[1].P.length; i++) {
                //     var curValueInfo = result[1].P[i];
                //     drawTextSymbol(curValueInfo[0], curValueInfo[1], curValueInfo[2]);
                // }

            }

        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
    });
}
//删除降雨
function clearrain() {
    console.info(CMapDraw.vectorrain.getSource())
    if(CMapDraw.vectorrain.getSource()){
        CMapDraw.vectorrain.getSource().clear()

    }
}

function toolshow2(bool) {
    if(bool){
        $("#rainfall").show()

    }else{
        $("#rainfall").hide()

    }
}