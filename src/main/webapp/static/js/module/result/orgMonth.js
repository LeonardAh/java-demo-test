$(document).ready(function(){
    initDate();
    controlInit.timeControl();
    initArea();
    $("#pageNo").keydown(function(e){
        if(e.keyCode == 13){//Enter键
            pageChangeEnter();
        }
    });
});

var pagenum = 0;

/**
 * 初始化区域
 */
function initArea() {
    $.ajax({
        url: '/erp/common/areaCascadeController/getUserUniqueArea',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                if(data.length>1){
                    data.splice(0,0,{"org_name":"全部","org_no":""});//增加全部选项 #
                }
                //添加option选项
                for(var i=0;i<data.length;i++){
                    $('#areaQ').append("<option value='"+data[i]['org_no']+"'>"+data[i]['org_name']+"</option>");
                }

                initDataTable();
            }
        },
        error: function (data) {
            alert("获取区域信息失败!");
        }
    });
}


var initDataTable = function(){
    "use strict";
    $("#resultGrid").on('xhr.dt', function ( e, settings, json, xhr ) {
        //分页
        $('.footerInfo').empty();
        if (json) {
            $('.footerInfo').append("当前显示从 " + (pagenum * parseInt($('#pageRange').val())+1) + " 到 " + (pagenum * parseInt($('#pageRange').val())+parseInt($('#pageRange').val())) + " 条记录,所有记录共" + json.totalCount + "条");
            var totalPage = Math.floor(json.totalCount/settings._iDisplayLength);
            if(json.totalCount%settings._iDisplayLength > 0){
                parseInt(totalPage++);
            }
            $('#pageTotal').empty();
            $('#pageTotal').append(totalPage) ;
        }
    }).DataTable({
        "dom": '<"toolbar"<"row"<"col-md-6"<"btnPlace">>>>rt',//页面布局
        iDisplayLength: $('#pageRange').val(),//每页记录数
        showRowNumber:true,
        "scrollX": true,//有滚动条
        columns : [
            {//当月
                "searchable": false,
                "orderable": false,
                data : "statDt"
            },
            {//区域
                "searchable": false,
                "orderable": false,
                data: "orgName"
            },
            {//总得分
                "searchable": false,
                "orderable": false,
                data: "sumScore"
            },
            {//排名
                "searchable": false,
                "orderable": false,
                data: "tRank"
            },
            {//巡店数量
                "searchable": false,
                "orderable": false,
                data: "shopsQuantity"
            },
            {//巡店达成率
                "searchable": false,
                "orderable": false,
                data: "shopsRate",
                render:function(data,type,row,meta){
                    return data+'%';
                }
            },
            {//巡店得分
                "searchable": false,
                "orderable": false,
                data: "shopsScore"
            },
            {//下单量
                "searchable": false,
                "orderable": false,
                data: "orderingQuantity"
            },
            {//下单量占比
                "searchable": false,
                "orderable": false,
                data: "orderingRate",
                render:function(data,type,row,meta){
                    return data+'%';
                }
            },
            {//发货量
                "searchable": false,
                "orderable": false,
                data: "sendQuantity"
            },
            {//发货量占比
                "searchable": false,
                "orderable": false,
                data: "sendQuantityRate",
                render:function(data,type,row,meta){
                    return data+'%';
                }
            },
            {//完成单量
                "searchable": false,
                "orderable": false,
                data: "completeQuantity"
            },
            {//单量达成率
                "searchable": false,
                "orderable": false,
                data: "volumeRate",
                render:function(data,type,row,meta){
                    return data+'%';
                }
            },
            {//客单价
                "searchable": false,
                "orderable": false,
                data: "guestPrice"
            },
            {//当月销售额
                "searchable": false,
                "orderable": false,
                data: "salesVolume"
            },
            {//销售额达成率
                "searchable": false,
                "orderable": false,
                data: "salesReach",
                render:function(data,type,row,meta){
                    return data+'%';
                }
            },

            {//销售额达成得分
                "searchable": false,
                "orderable": false,
                data: "salesReachScore"
            },
            {//24小时安装及时率
                "searchable": false,
                "orderable": false,
                data: "installRate",
                render:function(data,type,row,meta){
                    return data+'%';
                }
            },
            {//安装及时率得分
                "searchable": false,
                "orderable": false,
                data: "installRateScore"
            },
            {//安装差评率
                "searchable": false,
                "orderable": false,
                data: "installBadRate",
                render:function(data,type,row,meta){
                    return data+'%';
                }
            },
            {//安装满意度得分
                "searchable": false,
                "orderable": false,
                data: "installDegreeScore"
            },
            {//配送达成率
                "searchable": false,
                "orderable": false,
                data: "sendRate",
                render:function(data,type,row,meta){
                    return data+'%';
                }
            },
            {//配送达成率得分
                "searchable": false,
                "orderable": false,
                data: "sendRateScore"
            },
            {//改约率
                "searchable": false,
                "orderable": false,
                data: "changeRate",
                render:function(data,type,row,meta){
                    return data+'%';
                }
            },
            {//改约率得分
                "searchable": false,
                "orderable": false,
                data: "changeRateScore"
            },
            {//万单差评量
                "searchable": false,
                "orderable": false,
                data: "sendBadNum"
            },
            {//订单差评度得分
                "searchable": false,
                "orderable": false,
                data: "orderDiffDegreeScore"
            },
            {//送装当天完成率
                "searchable": false,
                "orderable": false,
                data: "sendAndInstallRate",
                render:function(data,type,row,meta){
                    return data+'%';
                }
            }
        ],
        "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
        ajax : {
            "url" : "/erp/OrgMonthController/getMonthScore",
            "method": "POST",
            "data" : function(){
                return {
                    "regionNo":$('#areaQ').val(),
                    "statStart":$('#statStart').val(),
                    "statEnd":$('#statEnd').val(),
                    "size":$('#pageRange').val(),
                    "skip":pagenum
                }
            },
            "language" : {
                "sProcessing":   "处理中...",
                "sLengthMenu":   "显示 _MENU_ 项结果",
                "sZeroRecords":  "没有匹配结果",
                "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix":  "",
                "sSearch":       "",
                "sUrl":          "",
                "sEmptyTable":     "表中数据为空",
                "sLoadingRecords": 'Loading...',
                "sInfoThousands":  ",",
                "oPaginate": {
                    "sFirst":    "首页",
                    "sPrevious": "上页",
                    "sNext":     "下页",
                    "sLast":     "末页"
                },
                "oAria": {
                    "sSortAscending":  ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },
            "dataSrc": "resultList"
        },
        fnCreatedRow: function (nRow, aData,iDisplayIndex) {//创建行时执行
            $(nRow).addClass("table-row");
        },
        "initComplete": function (settings, json) {//初始化结束后执行
            $('.footerInfo').empty();
            if (json) {
                $('.footerInfo').append("当前显示从 " + parseInt(parseInt(settings._iDisplayStart) + 1) + " 到 " + settings._iDisplayLength + " 条记录,所有记录共" + json.totalCount + "条");

                var totalPage = Math.floor(json.totalCount/settings._iDisplayLength);
                //totalPage = parseInt(json.totalCount)/parseInt($('#pageRange').val()));
                if(json.totalCount%settings._iDisplayLength > 0){
                    parseInt(totalPage++);
                }
                $('#pageTotal').empty()
                $('#pageTotal').append(totalPage) ;
            }
        }
    });
};

/**
 * 操作相关
 */

//查询
function query(){
    pagenum = 0;
    $("#resultGrid").DataTable().ajax.reload();
}

//打开导出确认窗口
function openExportConfirm(){
    $("#exportConfirmModal").modal('show');
}

//导出excel
function exportExcel(){
    $("#exportConfirmModal").modal('hide');
    exportLimit();
}
/**
 * 导出限制条数
 */
function exportLimit(){
    jQuery.ajax({
        type: "POST",
        dataType: 'json',
        cache: false,
        url: "/erp/OrgMonthController/exportLimit",
        data: {
            "regionNo":$('#areaQ').val(),
            "statStart":$('#statStart').val(),
            "statEnd":$('#statEnd').val()
        },
        success:function (data) {
            if(data.success){
                //初始化参数
                $("#orgNo").val($('#areaQ').val());
                $("#statStartE").val($('#statStart').val());
                $("#statEndE").val($('#statEnd').val());

                $("#exportForm").submit();//提交表单
            }else{
                alert(data.exceptionMsg);
            }
        },
        error : function(data){
            alert("导出数据失败");
        }
    });
}
function initDate(){
    var now = new Date();
    now.setDate(1);
    var nowStr = now.format("yyyy-MM-dd");
    $("#statStart").val(nowStr);
}
/**
 * 时间控件
 * @type {{timeControl: Function}}
 */
var controlInit = {
    "timeControl" : function() {
        var firstDate = new Date();
        firstDate.setDate(1); //第一天
        var endDate = new Date();
        endDate.setDate(endDate.getDate()-1);
        $("#statEnd").datetimepicker({
            language: 'zh-CN',
            clearBtn: true,
            autoclose: true,
            format: 'yyyy-mm-dd',
            startView: 2,
            minView: 2,
            initialDate:endDate,
            forceParse: false
        });

        //endDate.setDate(0);
        $('#statEnd').datetimepicker('setStartDate', firstDate);
        $('#statEnd').datetimepicker('setEndDate', endDate);
    }
}