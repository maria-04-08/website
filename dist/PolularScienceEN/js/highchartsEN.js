function windspeedinit() {
    if(path_list==''){
        $('#windspeed').hide()
        return
    }
    $('#windspeed').show()
    var arr=path_list.rows;
    console.info(arr)

    var timearr=[];
    var dataarr1=[];
    var dataarr2=[];

    for(var i=0;i<arr.length;i++){
        // if(i==0||i==arr.length-1){
            timearr.push(arr[i].Time)

        // }
        dataarr1.push(arr[i].CenterPressure)//气压
        dataarr2.push(arr[i].CenterWindSpeed)//气压

    }
    var title = {

        text: null
    };
    var subtitle = {
        enabled: false,
        text: null
    };

    var xAxis = {
        // tickInterval: 5,
        tickInterval: timearr ? (timearr.length - 1) : 0,

        categories: timearr,
        labels:{
            formatter:function (val) {
                var str=val.value.split(' ')
                return str[0]+"<br>"+str[1]
            }
        }
    };
    var yAxis = [{
        labels:{
            enabled: false
        },
        title: {
            text: null
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
        {
            labels:{
                enabled: false
            },
            title: {
                text: null
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        }
    ];

    var tooltip = {

        valueSuffix: ''
    }

    var legend = {
        enabled: false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    };

    var series =  [
        {
            name: 'pressure',
            data: dataarr1,
            tooltip: {
                valueSuffix: 'pa'
            },
            yAxis: 0,
            marker: {
                enabled: false,

            },
            color: '#90ed7d'
        },
        {
            name: 'Wind Speed',
            data: dataarr2,
            tooltip: {
                valueSuffix: 'm/s'
            },
            yAxis: 1,
            marker: {
                enabled: false,

            },
            color: '#FF0000'
        }
    ];

    var json = {};

    json.title = title;
    json.subtitle = subtitle;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.legend = legend;
    json.series = series;
    json.credits={
        enabled: false
    }
    $('#windspeed').highcharts(json);
}
function movespeedinit() {
    // console.info(path_list)
    if(path_list==''){
        $('#movespeed').hide();

        return
    }
    $('#movespeed').show();

    var arr=path_list.rows;
    console.info(arr)

    var timearr=[];
    var dataarr=[];
    for(var i=0;i<arr.length;i++){
        // if(i==0||i==arr.length-1){
            timearr.push(arr[i].Time)

        // }
        dataarr.push(arr[i].MoveSpeed)

    }
    console.info(dataarr)
    var title = {

        text: null
    };
    var subtitle = {
        enabled: false,
        text: null
    };
    var xAxis = {
        // tickInterval: 5,
        tickInterval: timearr ? (timearr.length - 1) : 0,
        categories: timearr,
        labels:{
            formatter:function (val) {
                var str=val.value.split(' ')
                return str[0]+"<br>"+str[1]
            }
        }
    };
    var yAxis = {
        labels:{
            enabled: false
        },
        title: {
            text: null
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };

    var tooltip = {

        valueSuffix: 'km/h'
    }

    var legend = {
        enabled: false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    };

    var series =  [
        {
            name: 'Move Speed',
            data: dataarr,
            marker: {
                enabled: false,

            },
        }
    ];

    var json = {};

    json.title = title;
    json.subtitle = subtitle;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.legend = legend;
    json.series = series;
    json.credits={
        enabled: false
    }
    $('#movespeed').highcharts(json);
}