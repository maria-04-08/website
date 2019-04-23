
//雷达图

var imgstatic= null;

var radarLayer = null;

var raderdata=null;//图片数据

var staticsetInterval=null;//时间循环

var play_bool=true;
function getrader() {
    clearrain()
    $("#darbox").css({
        'display':'flex'
    })
    console.info($("#radarbtn").attr('data-bool'))

    if($("#radarbtn").attr('data-bool')=='true'){
        $("#radarbtn").attr('data-bool','false');
        delradar()//删除雷达
        return
    }else{
        $("#radarbtn").attr('data-bool','true')
        $("#dartimg").attr('src','img/zting.png');
        $("#dartimg").attr('data-play','true');
    }

    $.ajax({
        type: 'post',
        url:'http://www.scsweather.com/WebApi/GetCR_2DProduct',
        data: {

        },
        dataType: 'json',

        success: function(res) {
            //请求成功时处理
            console.info("雷达图")
            console.info(res)

            raderdata=res
            initrad(res[0].Url)//初始化雷达图
            // getraddata(res)

        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
    });
}

//初始化图片
function initrad(data) {
    play_bool=true;

    imgstatic=new ol.source.ImageStatic({
        url: data,
        projection: 'EPSG:3857',
        //@see: https://stackoverflow.com/questions/8018118/chrome-three-js-cross-origin-image-load-denied
        crossOrigin: '',
        id:'imgstatic',
        imageExtent: ol.proj.transformExtent([105, 22, 120, 10], 'EPSG:4326', 'EPSG:3857')
    })
    radarLayer=new ol.layer.Image({
        source:imgstatic,
        id:'radarLayer'
    })
    CMapDraw.map.addLayer(radarLayer);

    xunhuan()
    staticsetInterval=setInterval("xunhuan()",raderdata.length*500);
}
function xunhuan() {
    var number=0;
    for(var i=0;i<raderdata.length;i++){
        number++
        qiehuan(raderdata[i],number)

    }

}
function qiehuan(data,i) {
    setTimeout(function() {

        if(play_bool){
            var imgstatic2= new ol.source.ImageStatic({
                url: data.Url,
                projection: 'EPSG:3857',

                crossOrigin: '',
                id:'imgstatic',
                imageExtent: ol.proj.transformExtent([105, 22, 120, 10], 'EPSG:4326', 'EPSG:3857')
            })
            CMapDraw.map.getLayers().forEach(function (lyr) {
                if ('radarLayer' == lyr.get('id')) {
                    lyr.setSource(imgstatic2)
                }
            });
            // CMapDraw.map.getLayers().getArray()[1].setSource(imgstatic2)
            $("#dartext").html(data.Time.substring(8, 10)+'时'+data.Time.substring(10, 12)+'分')
        }


    }, i*500);
}

//删除
function delradar() {
    clearInterval(staticsetInterval);
    $("#dartimg").attr('data-play','false');
    $("#radarbtn").attr('data-bool','false');
    play_bool=false;
    CMapDraw.map.getLayers().forEach(function (lyr) {
        if ('radarLayer' == lyr.get('id')) {
            // lyr.setSource(imgstatic2)
            CMapDraw.map.removeLayer(lyr)
        }
    });
    $("#darbox").css({
        'display':'none'
    })
}

function darplay() {

    var bool=$("#dartimg").attr('data-play');
    console.info(bool)
    if(bool=='false'){
        $("#dartimg").attr('src','img/zting.png');
        $("#dartimg").attr('data-play','true');
        play_bool=true;
    }else{
        $("#dartimg").attr('src','img/play2.png');
        $("#dartimg").attr('data-play','false');
        play_bool=false;
    }

}