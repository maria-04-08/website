function pathdata2(TyphoonPath,path_data,index) {
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
            // $("#stretchdiv_title").html(path_data.TyphoonId+path_data.CnName+"("+path_data.EnName+")");
            // $("#htitle").html(path_data.TyphoonId+path_data.CnName+"("+path_data.EnName+")");
            $("#stretchdiv_title").html(path_data.TyphoonId+path_data.EnName);
            $("#htitle").html(path_data.TyphoonId+path_data.EnName);
            if(data.total>0){
//定位
                $('#tt2').datagrid('scrollTo',index)
                $('#tt2').datagrid('selectRow',index)

                onselectarr.push({
                    id:staticid,
                    val:data.rows[0]
                })



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
            if(is_animouse){
                return
            }
            console.info("行数据")
            console.info(data)
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