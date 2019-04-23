//测距事件
function  is_ranging(_this){
    if(is_singleclick){
        $("#p_3").css({
            'cursor':'Default'
        })

        is_singleclick=false;
        _this.next().hide()
    }else {
        $("#p_3").css({
            'cursor':'Crosshair'
        })
        is_singleclick=true;
        _this.next().show()

    }
}
//两点间的测试距离
function toolEN(data) {
    if(is_ty_id!=''){
        $.ajax({
            type: 'post',
            url:'http://www.scsweather.com/webApi/GetDistanceByGPS',
            data: {
                lon1:data[0],
                lat1:data[1],
                lon2 : tt2selectdata.Lon,//请求参数
                lat2:tt2selectdata.Lat
            },
            dataType: 'json',

            success: function(res) {
                //请求成功时处理
                console.info("两点间的测试距离")
                console.info(res)
                getcustomsituation(data,res)
            },
            complete: function() {
                //请求完成的处理
            },
            error: function() {
                //请求出错处理
            }
        });
    }

}

//获取自定义点预计受影响情况(post/get)
function getcustomsituation(data,jl) {
    if(is_ty_id!=''){
        $.ajax({
            type: 'post',
            url:'http://www.scsweather.com/webApi/GetTyphoonInfluenceByGPS',
            data: {
                lon:data[0],
                lat:data[1],
                typhoonId:is_ty_id
            },
            dataType: 'json',

            success: function(res) {
                //请求成功时处理
                if(is_singleclick){
                    var id='ceju'+data[0]+data[1];
                    var pointColor=null;
                    var yx=null;
                    switch (res) {
                        case 0:{pointColor='#00FF03';yx='Small'};break;
                        case 1:{pointColor='#0062FE';yx='Great'};break;
                        case 2:{pointColor='#FDAC03';yx='serious'};break;
                        case 3:{pointColor='#FD0002';yx='Very serious'};break;
                    }
                    console.info("获取自定义点预计受影响情况")
                    console.info(res)
                    $("body").append(
                        "<div id='"+id+"' class='getcustomsituation' style='z-index: 9999'>"+
                        "<span  class='dian2' style='background-color: "+pointColor+"'></span>"+
                        "<div  class=\"anchor\"  style=\"z-index: 9999;cursor: pointer;text-align: center;background-color: #17205B;padding:3px 15px;position: relative;top: -82px;text-align: left\">" +
                        "<img data-id='"+id+"' onclick='delmyself($(this))' src='img/gb.png' width='20px' style='position: absolute;right: -10px;top:-8px;'>"+
                        "<span class='glyphicon glyphicon-play' style='font-size: 12px; position: absolute;left: -2px;color: rgb(23, 32, 91);top: 58px;'></span>"+
                        "<span class='name' style='font-size: 12px;color: #ffffff' >Distance：" + jl.toFixed(1)+'km'+'<br>'+'Influence：' +yx+ '<br>'+'N°：'+data[0].toFixed(1)+'，'+'E°：'+data[1].toFixed(1)+"</span>"
                        +"</div>"
                        +"</div>"
                    )
                    var point = new ol.Overlay({
                        element: document.getElementById(id),

                        //是否应该停止事件传播到地图窗口
                        stopEvent: false
                    });
                    point.setPosition([data[0], data[1]]);
                    CMapDraw.map.addOverlay(point)
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

}
//清空全部
function is_ranging_clear(_this) {
$(".getcustomsituation").remove()
}
function delmyself(_this) {
    if(is_singleclick){
        is_singleclick=false;
        _this.parents('.getcustomsituation').remove()
        setTimeout(function() {

            is_singleclick=true;


        }, 1000);
    }else{
        _this.parents('.getcustomsituation').remove()
    }
}
function toolshow(bool) {
    if(bool){
        $("#tool_show").show()

    }else{
        $("#tool_show").hide()

    }
}