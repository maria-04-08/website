
var CMapDraw=new CMapDraw()
var CPolyLine=new CPolyLine()
var CTyphoonArea=new CTyphoonArea()
var onselectarr=[];
var Typhoon_list=null//台风列表
var path_list='';//台风路径列表
var Influence_list=[];//台风路径列表
var ranging_list=[]//测距列表
var staticid=''//正在使用的台风id
var is_ty_id='';//正在使用的台风编码
var Routearr=[]//使用过的台风集合
var tt2selectdata=null;
var is_singleclick=false;
var is_animouse=false;
var Typhoonstaticdata=[];//每一条台风的数据
$(function () {
    CMapDraw.init()//初始化地图
    // CMapDraw=new CPolyLine(CMapDraw.map)
    getyear($("#year").val())

})

function inittable() {
    $('#tt').datagrid({
        data:Typhoon_list,
        width:$("#cur1").width(),
        height:$("#cur1").height(),
        fitColumns:true,
        columns:[[
            {checkbox:true},
            {field:'TyphoonId',title:'TyphoonId',width:80},
            {field:'CnName',title:'CnName',width:60},
            {field:'EnName',title:'EnName',width:70}
        ]],
        onLoadSuccess:function (data) {
            console.info(data)
            if(data.total>0){
                for(var i=0;i<data.rows.length;i++){
                    if(!data.rows[i].IsStop){

                        $('#tt').datagrid('checkRow',i);
                    }
                }
            }

        },
        onCheck:function (index,data) {
            // console.info($('#tt').datagrid("getChecked"))



            $("#htitle").show();
            GetTyphoonPathById(data.TyphoonId)
            Influence(data.TyphoonId)

        },
        onUncheck:function (index,data) {
            is_ranging_clear();//清空自定义分析点
            var d=$('#tt').datagrid("getChecked")
            if(d.length==0){

                $("#stretchcontent").hide()//左上角提示板
                $("#htitle").hide();//正中间的大标题

            }

            CPolyLine.DelLine(data.EnName)
            delCTyphoonArea(data)//删除风圈
            if(data.EnName==staticid){
                path_list='';
                $('#tt2').datagrid({
                    data:[],
                }
                )
                $('#tt3').datagrid({
                        data:[],
                    }
                )
                $('#tt4').datagrid({
                        data:[],
                    }
                )
                Influence_list=[];
                ranging_list=[];
                windspeedinit()
                movespeedinit()
            }
        }
    });
    pathdata()
    $('#tt3').datagrid({
        // url:'./data/datagrid_data.json',
        width:$("#cur3").width(),
        height:$("#cur3").height(),
        fitColumns:true,
        columns:[[

            {field:'itemid',title:'Major city',width:80},
            {field:'productid',title:'Influence',width:80},
            // {field:'productid',title:'测距',width:80},
        ]]
    });
}
function checkrun(i) {
    setTimeout(function() {


    }, 500);
}
//收起面板1
function onstretch() {
    if( $("#stretch").attr('src')=='img/stretchIcon.png'){
        $("#stretchdiv").hide()
        $("#stretch").attr({
                'src':'img/contract.png'
            }
        )
        $("#stretchcontent").css({
            'width':'40px',
            'height':'40px'
        })
    }else{
        $("#stretchdiv").show()
        $("#stretch").attr({
                'src':'img/stretchIcon.png'
            }
        )
        $("#stretchcontent").css({
            'width':'250px',
            'height':'250px'
        })
    }

}
//获取台风信息
function getyear(year) {
    $.ajax({
        type: 'post',
        url:'http://www.scsweather.com/webApi/GetTyphoonListByYear',
        data: {
            year : year//请求参数
        },
        dataType: 'json',

        success: function(res) {
            //请求成功时处理
            console.info(res)
            var arr=[];
            for(var i=res.length-1;i>=0;i--){
                arr.push(res[i])
            }
            Typhoon_list={"total":res.length,"rows":arr}
            inittable();
        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
    });
}
//获取台风详情
function GetTyphoonPathById(_id) {
    $.ajax({
        type: 'post',
        url:'http://www.scsweather.com/webApi/GetTyphoonPathById',
        data: {
            id : _id//请求参数
        },
        dataType: 'json',

        success: function(res) {
            //请求成功时处理
            console.info(res)
            Typhoonstaticdata.push(res)
            staticid=res.EnName;
            is_ty_id=res.TyphoonId;
            var arr=[];
            for(var i=res.TyphoonPath.length-1;i>=0;i--){
                arr.push(res.TyphoonPath[i])
            }

            path_list={"total":res.TyphoonPath.length,"rows":arr}
            windspeedinit()
            movespeedinit()
            Routearr.push({
                id:staticid,
                val:res.TyphoonPath
            })
            pathdata(res.TyphoonPath,res)

        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
    });
}
//路径信息
function pathdata(TyphoonPath,path_data) {
    console.info(path_data)
    $('#tt2').datagrid({
        data:path_list,
        width:$("#cur2").width(),
        height:$("#cur2").height(),
        singleSelect:true,
        fitColumns:true,
        columns:[[

            {field:'Time',title:'Time',width:70},
            {field:'CenterPressure',title:'Pressure',width:50},
            {field:'CenterWindSpeed',title:'WindSpeed',width:65}
        ]],
        onLoadSuccess:function (data) {
            console.info(data)
            if(path_data){
                $("#stretchdiv_title").html(path_data.TyphoonId+path_data.CnName+"("+path_data.EnName+")")
                $("#htitle").html(path_data.TyphoonId+path_data.EnName)

                if(data.total>0){
//定位

                    onselectarr.push({
                        id:staticid,
                        val:data.rows[0]
                    })

                    CPolyLine.init(CMapDraw.map)
                    // CPolyLine.is_title=$("#htitle").text()
                    CPolyLine.CreateLine(CMapDraw.map,TyphoonPath,staticid,$("#htitle").text())

                }
            }


        },
        onSelect:function (index,data) {
            if(is_animouse){
                return
            }
            is_ranging_clear();//清空自定义分析点
            $("#stretchdiv_title").html($("#htitle").text())
            $("#stretchcontent").show()
            tt2selectdata=data;
            $("."+staticid).find('.typhoonnew').hide()
            $("."+staticid).addClass('dian')
            for(var i=0;i<$("."+staticid).length;i++){
                if($("."+staticid).eq(i).attr('data-Lon')==data.Lon&&$("."+staticid).eq(i).attr('data-Lat')==data.Lat){
                    $("."+staticid).eq(i).find('.typhoonnew').show()
                    $("."+staticid).eq(i).removeClass('dian')
                }
            }
            ranging(data.Lon,data.Lat)
            var Features=''
            for(var i=0;i<CPolyLine.Vectorarr.length;i++) {
                    if( CPolyLine.Vectorarr[i].id==staticid){
                        Features=CPolyLine.Vectorarr[i].val;
                    }
            }
            var Featuresarr=Features.getFeatures();
            for(var i=0;i<Featuresarr.length;i++) {
                if(Featuresarr[i].get('id')==(staticid+'xu')){
                    Features.removeFeature(Featuresarr[i])//去除线
                    $("."+staticid+"xu").remove()//去除点
                }
            }

            //画虚线
            CPolyLine.Dottedline(data.ForecastData,staticid,data)
            //画虚线的点
            var arr=[]
            for(var i=0;i<data.ForecastData.length;i++) {


                    arr=data.ForecastData[i]

                    CPolyLine.Drawpoint1(arr,staticid+'xu'+i,staticid)


            }

            sethtmlval(data)//设置左上角面板
            addCTyphoonArea(data,staticid)//添加风圈
        },
        onClickRow:function (index,data) {
            console.info("行数据")
            console.info(data)
            if(is_animouse){
                return
            }
            $("#stretchcontent2").show()
            CPolyLine.staticanchor2.setPosition([data.Lon, data.Lat])
            $("#stretchdiv_title2").html($("#htitle").text())
            $("#stretchdiv_item_time2").html(data.Time)
            $("#stretchdiv_item_weizhi2").html(data.Lon+'°E'+'，'+ data.Lat+'°N');
            $("#stretchdiv_item_fengli2").html(data.CenterWindPower+"level")
            $("#stretchdiv_item_fengsu2").html(data.CenterWindSpeed+"m/s")
            $("#stretchdiv_item_qiya2").html(data.CenterPressure+"hpa")
            $("#stretchdiv_item_yisudu2").html(data.MoveSpeed+"km/h")
            $("#stretchdiv_item_yixiang2").html(data.MoveDirection)


        }
    });
}
function onSelect2(id,t) {

    var data=null;
    for(var i=0;i<onselectarr.length; i++){
        if(id==onselectarr[i].id){
            data=onselectarr[i].val
        }
    }
    console.info(data)
    tt2selectdata=data;
    $("."+id).find('.typhoonnew').hide()
    $("."+id).addClass('dian')
    for(var i=0;i<$("."+id).length;i++){
        if($("."+id).eq(i).attr('data-Lon')==data.Lon&&$("."+id).eq(i).attr('data-Lat')==data.Lat){
            $("."+id).eq(i).find('.typhoonnew').show()
            $("."+id).eq(i).removeClass('dian')
        }
    }
    //画虚线
    CPolyLine.Dottedline(data.ForecastData,id,data)
    //画虚线的点
    var arr=[]
    for(var i=0;i<data.ForecastData.length;i++) {


        arr=data.ForecastData[i]

        CPolyLine.Drawpoint1(arr,id+'xu'+i,id,t)
        setTimeout(function() {

            // $('#tt2').datagrid("selectRow",0)

        }, 400);

    }
    sethtmlval(data)//设置左上角面板
    addCTyphoonArea(data,id)//添加风圈
}
//点击点后重新划线
function again_Dottedline(_this){
    // $("#stretchdiv_title").html(_this.attr("data-title"))
    ranging(_this.attr("data-lon"),_this.attr("data-lat"))//更新测距信息表格

    var id=_this.attr("data-clas");
    $("."+id).find('.typhoonnew').hide()
    $("."+id).addClass('dian')
    _this.find('.typhoonnew').show()
    _this.removeClass('dian')


    //表格变成点击的
    if(_this.attr("data-enname")!=staticid){
        console.info(_this.attr("data-typhoonid"))

        for(var i=0;i<Typhoonstaticdata.length;i++){
            if(Typhoonstaticdata[i].TyphoonId==_this.attr("data-typhoonid")){
                staticid=Typhoonstaticdata[i].EnName
                var arr2=[];
                for(var j=Typhoonstaticdata[i].TyphoonPath.length-1;j>=0;j--){
                    arr2.push(Typhoonstaticdata[i].TyphoonPath[j])
                }
                path_list={"total":Typhoonstaticdata[i].TyphoonPath.length,"rows":arr2}
                pathdata2(Typhoonstaticdata[i].TyphoonPath,Typhoonstaticdata[i],_this.attr("data-index"))
                // $('#tt2').datagrid({
                //     data:path_list
                // })
            }
        }
    }else{
        $('#tt2').datagrid('scrollTo',_this.attr("data-index"))
        $('#tt2').datagrid('selectRow',_this.attr("data-index"))
    }


    //    去除线和点
    // var Features=''
    // for(var i=0;i<CPolyLine.Vectorarr.length;i++) {
    //     if( CPolyLine.Vectorarr[i].id==id){
    //         Features=CPolyLine.Vectorarr[i].val;
    //     }
    // }
    // var Featuresarr=Features.getFeatures();
    // for(var i=0;i<Featuresarr.length;i++) {
    //     if(Featuresarr[i].get('id')==(id+'xu')){
    //         Features.removeFeature(Featuresarr[i])//去除线
    //         $("."+id+"xu").remove()//去除点
    //     }
    // }
//划线
//     var myroutearr=[];
    // for(var i=0;i<Routearr.length;i++) {
    //     if(Routearr[i].id==id){
    //         for(var j=0;j<Routearr[i].val.length;j++) {
    //             if(Routearr[i].val[j].Lon==_this.attr("data-Lon")&&Routearr[i].val[j].Lat==_this.attr("data-Lat")){
    //
    //                 //画虚线
    //                 CPolyLine.Dottedline(Routearr[i].val[j].ForecastData,id,Routearr[i].val[j])
    //                 //画虚线的点
    //                 var arr=[]
    //                 for(var k=0;k<Routearr[i].val[j].ForecastData.length;k++) {
    //
    //
    //                     arr=Routearr[i].val[j].ForecastData[k]
    //
    //                     CPolyLine.Drawpoint1(arr,id+'xu'+k,id)
    //
    //
    //                 }
    //             //    设置左上角面板内容
    //             //     sethtmlval(Routearr[i].val[j])
    //             //    画风圈
    //
    //
    //                 setTimeout(function() {
    //                     addCTyphoonArea(Routearr[i].val[j],id)
    //
    //                 }, 100);
    //                 break;
    //             }
    //         }
    //         return;
    //     }
    // }
}
//添加风圈
function addCTyphoonArea(data,id) {
    console.info("获取所有图层");
    console.info(CPolyLine.map.getLayers().getArray())
    var arr=CPolyLine.map.getLayers().getArray()
    // console.info(arr[0].get('id'))
    for(var i=0;i<arr.length;i++){

        console.info(arr[i].get('id'))
        if(arr[i].get('id')==('tyhphoonAreaLayer'+id)){
            CPolyLine.map.removeLayer(arr[i]);//删除风圈图层
        }
    }
    console.info(CPolyLine.map.getLayers().getArray())
    if(data.Cir7_NE!=0){
        CTyphoonArea.PowerLvl=7;
        CTyphoonArea.Ini(data,CMapDraw.map,id);
        CTyphoonArea.Add();
    }
    if(data.Cir10_NE!=0){
        CTyphoonArea.PowerLvl=10;
        CTyphoonArea.Ini(data,CMapDraw.map,id);
        CTyphoonArea.Add();
    }
    if(data.Cir12_NE!=0){
        CTyphoonArea.PowerLvl=12;
        CTyphoonArea.Ini(data,CMapDraw.map,id);
        CTyphoonArea.Add();
    }
    var rotation2 = function (){
        $(".typhoonnew").rotate({
            angle:0,
            animateTo:360,
            callback: rotation2,
            easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
                return c*(t/d)+b;
            }
        });
    }
    rotation2();
}
//删除风圈图层
function delCTyphoonArea(date) {
    var arr=CPolyLine.map.getLayers().getArray()

    for(var i=0;i<arr.length;i++){
        if(arr[i].get('id')==('tyhphoonAreaLayer'+date.EnName)){
            CPolyLine.map.removeLayer(arr[i]);//删除风圈图层
        }
    }
}
//设置左上角面板
function sethtmlval(data) {
    console.info(data)
    $("#stretchdiv_item_time").html(data.Time)

    switch (data.Type) {
        case 0://弱于热带低压
            $("#stretchdiv_item_qiangdu").html("Weaker than tropical depression");
            break;
        case 1://热带低压
            $("#stretchdiv_item_qiangdu").html("Tropical depression");

            break;
        case 2://热带风暴
            $("#stretchdiv_item_qiangdu").html("Tropical storm");

            break;
        case 3://强热带风暴
            $("#stretchdiv_item_qiangdu").html("Strong Tropical Storm");
            break;
        case 4://台风
            $("#stretchdiv_item_qiangdu").html("Typhoon");
            break;
        case 5://强台风
            $("#stretchdiv_item_qiangdu").html("Violent typhoon");
            break;
        case 6://超强台风
            $("#stretchdiv_item_qiangdu").html("Super typhoon");
            break;

    }
    $("#stretchdiv_item_fengsu").html(data.CenterWindPower+'level'+' '+data.CenterWindSpeed+'m/s');
    $("#stretchdiv_item_weizhi").html(data.Lon+'°E'+','+ data.Lat+'°N');

    $("#stretchdiv_item_qiya").html(data.CenterPressure+'hpa');
    $("#stretchdiv_item_yixiang").html(data.MoveSpeed+'km/h'+' '+data.MoveDirection);

    $("#stretchdiv_item_banjing").html('NE:'+data.Cir7_NE+'km'+'<br>'+'SE:'+data.Cir7_SE+'km'+'<br>'+'NW:'+data.Cir7_NW+'km'+'<br>'+'SW:'+data.Cir7_SW+'km'+'<br>')
}
//展示面板
function showmianban(_this,add1,add2){
    console.info(_this.attr("data-CenterPressure"))
    $("#stretchcontent2").show()
    CPolyLine.staticanchor2.setPosition([add1, add2])
    $("#stretchdiv_title2").html(_this.attr("data-title"))
    $("#stretchdiv_item_time2").html(_this.attr("data-Time")+' '+_this.attr("data-Time2"))
    $("#stretchdiv_item_weizhi2").html(add1+'°E'+'，'+ add2+'°N');
    $("#stretchdiv_item_fengli2").html(_this.attr("data-CenterWindPower")+"level")
    $("#stretchdiv_item_fengsu2").html(_this.attr("data-CenterWindSpeed")>0?_this.attr("data-CenterWindSpeed")+"m/s":'')
    $("#stretchdiv_item_qiya2").html(_this.attr("data-CenterPressure")>0?_this.attr("data-CenterPressure")+"hpa":'')
    $("#stretchdiv_item_yisudu2").html(_this.attr("data-MoveSpeed")>0?_this.attr("data-MoveSpeed")+"km/h":"")
    $("#stretchdiv_item_yixiang2").html(_this.attr("data-MoveDirection")!='null'?_this.attr("data-MoveDirection"):'')
    $("#mechanismname").html(_this.attr("data-ForecastOffice")!='null'?_this.attr("data-ForecastOffice"):'')
    if(!_this.attr("data-ForecastOffice")){
        $("#mechanism").hide()
    }else{
        $("#mechanism").show()

    }
}
//隐藏面板
function hidemianban(_this) {
    $("#stretchcontent2").hide()
}
function tf_1(_this) {
    _this.hide();
    $("#tf_1").show();
}
function tf_btn_1() {
    $("#tf_1").hide();
    $("#tf_btn_1").show();

}
function tf_btn_2() {
    $("#tf_2").hide();
    $("#tf_btn_2").show();

}
function tf_btn_2() {
    $("#tf_2").hide();
    $("#tf_btn_2").show();

}
function tf_2(_this) {
    _this.hide();
    $("#tf_2").show();
}
//页面tab切换
function qiehuan(_this,index) {
    _this.parents('.tabList').find('.curli').removeClass('cur')
    // $('.curli').removeClass('cur');
    _this.addClass('cur')
    _this.parents('.tabList').next().find('.curbox').hide()
    _this.parents('.tabList').next().find('.curbox').eq(index).show()
    if(_this.attr('id')=='Route'){
        // Influencedagrid()
        if(path_list==''){
            $('#tt2').datagrid({
                    data:[],
                }
            )
            return
        }else{
            pathdata()
        }
    }
    if(_this.attr('id')=='ranging'){
        rangingdagrid()
    }
    if(_this.attr('id')=='Influence'){
        Influencedagrid()
    }
    if(_this.attr('id')=='speed'){
        movespeedinit()
    }
    if(_this.attr('id')=='Wind'){

        windspeedinit()
    }
}
