function Influence(_id) {
    //获取某台风对主要城市预计受影响情况(post/get)	影响级别（0：较小，1：大，2：严重，3：非常严重）
    $.ajax({
        type: 'post',
        url:'http://www.scsweather.com/webApi/GetMainCityInfluence',
        data: {
            typhoonId : _id//请求参数
        },
        dataType: 'json',

        success: function(res) {
            //请求成功时处理
            console.info("获取某台风对主要城市预计受影响情况(post/get)")
            console.info(res)
            // staticid=res.EnName
            //
            Influence_list={"total":res.length,"rows":res}
            Influencedagrid();
            // Influencedata()
        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
    });
}
function ranging(Lon,Lat) {
    //测距
    $.ajax({
        type: 'post',
        url:'http://www.scsweather.com/webApi/GetMainCityDistanceFromCurPoint',
        data: {
            lon :Lon,//请求参数
            lat:Lat
        },
        dataType: 'json',

        success: function(res) {
            //请求成功时处理
            console.info("测距")
            console.info(res)
            // staticid=res.EnName
            //
            ranging_list={"total":res.length,"rows":res}
            rangingdagrid();
            // Influencedata()
        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
    });
}
function Influencedagrid() {
    $('#tt3').datagrid({
        // url:'./data/datagrid_data.json',
        data:Influence_list,
        width:$("#cur3").width(),
        height:$("#cur3").height(),
        fitColumns:true,
        columns:[[

            {field:'CityName',title:'Major city',width:80},
            {field:'DamageGrade',title:'Influence',width:80,
                formatter: function(value,row,index){
                    console.info(value)

                    switch (value) {
                       case 0:{return 'Small'};break;
                       case 1:{return 'Great'};break;
                        case 2:{return 'serious'};break;
                        case 2:{return 'Very serious'};break;

                    }
                }

            },
            // {field:'productid',title:'测距',width:80},
        ]]
    });
}

function rangingdagrid() {
    $('#tt4').datagrid({
        // url:'./data/datagrid_data.json',
        data:ranging_list,
        width:$("#cur4").width(),
        height:$("#cur4").height(),
        fitColumns:true,
        columns:[[

            {field:'CityName',title:'Major city',width:80},
            {field:'Distance',title:'Ranging(k/m)',width:80,
                formatter: function(value,row,index){
                    console.info(value)
                    return value.toFixed(1)
                }
            },
            // {field:'productid',title:'测距',width:80},
        ]]
    });
}