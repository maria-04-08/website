//年份选择事件
function getselectyear(_this) {
    // CMapDraw.map.getLayers().clear()
    if(path_list!=''){
        for(var i=0;i<Typhoon_list.rows.length;i++){
            CPolyLine.DelLine(Typhoon_list.rows[i].EnName)
            delCTyphoonArea(Typhoon_list.rows[i])//删除风圈
            // if(data.EnName==staticid){
            path_list='';
            $('#tt2').datagrid({
                    data:[],
                }
            )
            Influence_list=[];
            ranging_list=[];
            // }
        }
        $('.dian').remove()
        $('.dian2').remove()
    }

    setTimeout(function() {

        getyear($("#year").val())
    }, 500);
    // return

}