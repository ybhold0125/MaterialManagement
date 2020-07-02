// 文档准备完毕
$(document).ready(function() {
    var a = 'test';
    getPlannerData(a);
    getBuyerData(a);
    getWarehouseManagerData(a);
    getSupplierData(a);

    //add按钮绑定处理函数
	$("#add-btn-planner").attr('href', 'javascript:addPlannerData()');
	$("#add-btn-buyer").attr('href', 'javascript:addBuyerData()');
	$("#add-btn-warehousemanager").attr('href', 'javascript:addWarehouseManagerData()');
	$("#add-btn-supplier").attr('href', 'javascript:addSupplierData()');

	//登出按钮绑定处理函数
	$("#logout-btn").attr('href', 'javascript:logout()');

    layui.use('form', function(){
        var form = layui.form;
        //监听提交
        form.on('submit(formSearchPlanner)', function(data) {
            var r = data.field.number;
            getPlannerData(r);
        });

        //监听提交
        form.on('submit(formSearchBuyer)', function(data) {
            var r = data.field.number;
            getBuyerData(r);
        });

        //监听提交
        form.on('submit(formSearchWarehouseManager)', function(data) {
            var r = data.field.number;
            getWarehouseManagerData(r);
        });

        //监听提交
        form.on('submit(formSearchSupplier)', function(data) {
            var r = data.field.number;
            getSupplierData(r);
        });
        return false;
    })


});

//表单序列化
(function($){
	$.fn.serializeJson=function(){
		var serializeObj={};
		var array=this.serializeArray();
		var str=this.serialize();
		$(array).each(function(){
			if(serializeObj[this.name]){
				if($.isArray(serializeObj[this.name])){
					serializeObj[this.name].push(this.value);
				}else{
					serializeObj[this.name]=[serializeObj[this.name],this.value];
				}
			}else{
				serializeObj[this.name]=this.value;
			}
		});
		return serializeObj;
	};
})(jQuery);




// 登出实现
function logout(){
    layui.use('layer', function(){
        var layer = layui.layer;
        $.ajax({
            type: 'POST',
            url: 'logout',
            success: function (result) {
                alert('登出');
                layer.msg('登出');
                location.reload();
            },
            error: function () {
                layer.msg('服务器超时，请重试！');
            }
        });
    })
}


//ajax增加
function addAjax (addurl,ajson,callback) {
    $.ajax({
        type: 'POST',
        url: addurl,
        data: {"jsonstr": ajson},
        success: function (result) {
            if (result == 'success') {
                // layer.msg('添加成功！');
                layer.msg('添加成功！');
                callback();
            }
            else{
                layer.msg('添加失败');
            }
        },
        error: function () {
            layer.msg('服务器超时，请重试！')
        }
    });
}

// ajax修改
function updateAjax(updateurl, ujson, callback){
    $.ajax({
        type: 'POST',
        url: updateurl,
        data: {"jsonstr": ujson},
        success: function (result) {
            if (result == 'success') {
                layer.msg('修改成功！');
                callback();
            }
            else{
                layer.msg('修改失败');
            }
        },
        error: function () {
            layer.msg('服务器超时，请重试！')
        }
    });
}

// ajax删除
function deleteAjax(deleteurl,id,callback){
    layui.use('form', function() {
        var form = layui.form;

        $.ajax({
            type: 'POST',
            url: deleteurl,
            data: {"id": id},
            success: function (result) {
                if (result == 'success') {
                    layer.msg('删除成功！');
                    callback();
                }
                else{
                    layer.msg('删除失败');
                }
            },
            error: function () {
                layer.msg('服务器超时，请重试！')
            }
        });
    })
}

//ajax初始化
function initializeAjax(initializeurl,id,callback){
    $.ajax({
        type: 'POST',
        url: initializeurl,
        data: {"id": id},
        success: function (result) {
            if (result == 'success') {
                layer.msg('初始化成功！');
                callback();
            }
            else{
                layer.msg('失败');
            }
        },
        error: function () {
            layer.msg('服务器超时，请重试！')
        }
    });
}

// 获取计划员数据
function getPlannerData(str) {
    $.ajax({
        type: 'POST',
        url:'get_planner_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['planner_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "trplanner'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].phone+"</td>";
                str+="<td>"+r[i]['fields'].password+"</td>";
                str+='<td><a href="#" id="tdplannermodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tdplannerdelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+='<td><a href="#" id="tdplannerinitialize'+i+'" data-toggle="tooltip" data-placement="bottom" title="初始化" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-refresh" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#plannerData").children().remove();
            $("#plannerData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#trplanner"+i;
                $(trid).attr("data-plannerid", r[i].pk);
                var tdmodify="#tdplannermodify"+i;
                var tddelete="#tdplannerdelete"+i;
                var initialize="#tdplannerinitialize"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifyPlanner("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deletePlanner('+r[i].pk+')');
                $(initialize).attr('href', 'javascript:initializePlanner('+r[i].pk+')');
            }
        },
        error: function () {
            layer.mag('服务器超时，请重试！')
        }
    })

}

// 增加计划员
function addPlannerData(){
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
        str += '<form class="layui-form" id="modal-form" >' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label">编号</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="number" required  lay-verify="required" placeholder="编号" autocomplete="off" class="layui-input">'
            + '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label">姓名</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="name" required  lay-verify="required" placeholder="姓名" autocomplete="off" class="layui-input">'
            + '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label">电话</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="phone" required  lay-verify="required|phone|number" placeholder="电话" autocomplete="off" class="layui-input">'
            + '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label">密码</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="password" required  lay-verify="required" placeholder="密码" autocomplete="off" class="layui-input">'
            + '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<div class="layui-input-block">' +
            '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addPlanner" id="modal-btn-submit"></button>'
            + '</div>' +
            '</div>' +
            '</form>';

        //显示模态框
        $('#modal-title').html('计划人员增加');
        $('#modal-body').html(str);
        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addPlanner)', function(data){
            var r = data.field;
            if(!(/^1[3456789]\d{9}$/.test(r.phone))){
                layer.msg('手机号格式有误，请重新输入')
                return false;
            }
            jsr=JSON.stringify(r);
            addAjax('add_planner_data', jsr, function(){
                //回调函数,用于刷新
                getPlannerData();
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}

// 修改计划员
function modifyPlanner(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
        str += '<form class="layui-form" id="modal-form" action>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">编号</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="number" required  lay-verify="required" placeholder="编号" value="' + tds[1].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">姓名</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="name" required  lay-verify="required" placeholder="姓名" value="' + tds[2].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">电话</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="phone" required  lay-verify="required|phone|number" placeholder="电话" value="' + tds[3].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">密码</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="password" required  lay-verify="required" placeholder="密码" value="' + tds[4].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updatePlanner" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('计划员修改');
        $('#modal-body').html(str);
        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updatePlanner)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-plannerid');
            jsr=JSON.stringify(r);
            updateAjax('update_planner_data', jsr, function () {
                //回调函数,用于刷新
                getPlannerData();
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}

// 删除计划员
function deletePlanner(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('计划员删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_planner_data",id,function () {
		 	 //回调函数,用于刷新
            getPlannerData();
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}


//初始化计划员密码
function initializePlanner(id){
    var str = '';
    str+='<h3>你确定要初始化吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('计划员初始化');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('初始化');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         initializeAjax("initialize_planner_data",id,function () {
		 	 //回调函数,用于刷新
            getPlannerData();
         });
         $('#modal').modal('hide'); //隐藏模态框
	});

}


//获取采购员数据
function getBuyerData(str) {
    $.ajax({
        type: 'POST',
        url:'get_buyer_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['buyer_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "trbuyer'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].phone+"</td>";
                str+="<td>"+r[i]['fields'].password+"</td>";
                str+='<td><a href="#" id="tdbuyermodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tdbuyerdelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+='<td><a href="#" id="tdbuyerinitialize'+i+'" data-toggle="tooltip" data-placement="bottom" title="初始化" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-refresh" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#buyerData").children().remove();
            $("#buyerData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#trbuyer"+i;
                $(trid).attr("data-buyerid", r[i].pk);
                var tdmodify="#tdbuyermodify"+i;
                var tddelete="#tdbuyerdelete"+i;
                var initialize="#tdbuyerinitialize"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifyBuyer("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deleteBuyer('+r[i].pk+')');
                $(initialize).attr('href', 'javascript:initializeBuyer('+r[i].pk+')');
            }
        },
        error: function () {
        }
    })

}

// 增加采购员
function addBuyerData(){
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
        str += '<form class="layui-form" id="modal-form" >' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label">编号</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="number" required  lay-verify="required" placeholder="编号" autocomplete="off" class="layui-input">'
            + '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label">姓名</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="name" required  lay-verify="required" placeholder="姓名" autocomplete="off" class="layui-input">'
            + '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label">电话</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="phone" required  lay-verify="required|phone|number" placeholder="电话" autocomplete="off" class="layui-input">'
            + '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label">密码</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="password" required  lay-verify="required" placeholder="密码" autocomplete="off" class="layui-input">'
            + '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<div class="layui-input-block">' +
            '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addBuyer" id="modal-btn-submit"></button>'
            + '</div>' +
            '</div>' +
            '</form>';

        //显示模态框
        $('#modal-title').html('采购员增加');
        $('#modal-body').html(str);
        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addBuyer)', function(data){
            var r = data.field;
            jsr=JSON.stringify(r);
            addAjax('add_buyer_data', jsr, function(){
                //回调函数,用于刷新
                getBuyerData();
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}

// 修改采购员
function modifyBuyer(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
        str += '<form class="layui-form" id="modal-form" action>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">编号</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="number" required  lay-verify="required" placeholder="编号" value="' + tds[1].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">姓名</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="name" required  lay-verify="required" placeholder="姓名" value="' + tds[2].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">电话</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="phone" required  lay-verify="required|phone|number" placeholder="电话" value="' + tds[3].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">密码</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="password" required  lay-verify="required" placeholder="密码" value="' + tds[4].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updateBuyer" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('采购员修改');
        $('#modal-body').html(str);
        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updateBuyer)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-buyerid');
            jsr=JSON.stringify(r);
            updateAjax('update_buyer_data', jsr, function () {
                //回调函数,用于刷新
                getBuyerData();
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}

// 删除采购员
function deleteBuyer(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('计划员删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_buyer_data",id,function () {
		 	 //回调函数,用于刷新
            getBuyerData();
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}


//初始化采购员密码
function initializeBuyer(id){
    var str = '';
    str+='<h3>你确定要初始化吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('采购员初始化');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('初始化');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         initializeAjax("initialize_buyer_data",id,function () {
		 	 //回调函数,用于刷新
            getBuyerData();
         });
         $('#modal').modal('hide'); //隐藏模态框
	});

}

// 获取仓储管理员数据
function getWarehouseManagerData(str) {
    $.ajax({
        type: 'POST',
        url:'get_warehousemanager_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['warehousemanager_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "trwarehousemanager'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].phone+"</td>";
                str+="<td>"+r[i]['fields'].password+"</td>";
                str+='<td><a href="#" id="tdwarehousemanagermodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tdwarehousemanagerdelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+='<td><a href="#" id="tdwarehousemanagerinitialize'+i+'" data-toggle="tooltip" data-placement="bottom" title="初始化" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-refresh" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#warehousemanagerData").children().remove();
            $("#warehousemanagerData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#trwarehousemanager"+i;
                $(trid).attr("data-warehousemanagerrid", r[i].pk);
                var tdmodify="#tdwarehousemanagermodify"+i;
                var tddelete="#tdwarehousemanagerdelete"+i;
                var initialize="#tdwarehousemanagerinitialize"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifyWarehouseManager("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deleteWarehouseManager('+r[i].pk+')');
                $(initialize).attr('href', 'javascript:initializeWarehouseManager('+r[i].pk+')');
            }
        },
        error: function () {
            layer.mag('服务器超时，请重试！');
        }
    })

}

// 增加仓储管理员
function addWarehouseManagerData(){
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
        str += '<form class="layui-form" id="modal-form" >' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">编号</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="number" required  lay-verify="required" placeholder="编号" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">姓名</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="name" required  lay-verify="required" placeholder="姓名" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">电话</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="phone" required  lay-verify="required|phone|number" placeholder="电话" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">密码</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="password" required  lay-verify="required" placeholder="密码" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addWarehouseManager" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('仓储管理员增加');
        $('#modal-body').html(str);
        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addWarehouseManager)', function(data){
            var r = data.field;
            jsr=JSON.stringify(r);
            addAjax('add_warehousemanager_data', jsr, function(){
                //回调函数,用于刷新
                getWarehouseManagerData();
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}

// 修改仓储管理员
function modifyWarehouseManager(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
        str += '<form class="layui-form" id="modal-form" action>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">编号</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="number" required  lay-verify="required" placeholder="编号" value="' + tds[1].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">姓名</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="name" required  lay-verify="required" placeholder="姓名" value="' + tds[2].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">电话</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="phone" required  lay-verify="required|phone|number" placeholder="电话" value="' + tds[3].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">密码</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="password" required  lay-verify="required" placeholder="密码" value="' + tds[4].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updateWarehouseManager" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('计划员修改');
        $('#modal-body').html(str);
        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updateWarehouseManager)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-warehousemanagerrid');
            jsr=JSON.stringify(r);
            updateAjax('update_warehousemanager_data', jsr, function () {
                //回调函数,用于刷新
                getWarehouseManagerData();
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}

// 删除仓储管理员
function deleteWarehouseManager(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('仓储管理员删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_warehousemanager_data",id,function () {
		 	 //回调函数,用于刷新
            getWarehouseManagerData();
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}


//初始化仓储管理员密码
function initializeWarehouseManager(id){
    var str = '';
    str+='<h3>你确定要初始化吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('仓储管理员初始化');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('初始化');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         initializeAjax("initialize_warehousemanager_data",id,function () {
		 	 //回调函数,用于刷新
            getWarehouseManagerData();
         });
         $('#modal').modal('hide'); //隐藏模态框
	});

}


// 获取供应商数据
function getSupplierData(str) {
    $.ajax({
        type: 'POST',
        url:'get_supplier_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['supplier_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "trsupplier'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].address+"</td>";
                str+="<td>"+r[i]['fields'].phone+"</td>";
                str+="<td>"+r[i]['fields'].score+"</td>";
                str+="<td>"+r[i]['fields'].password+"</td>";
                str+='<td><a href="#" id="tdsuppliermodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tdsupplierdelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+='<td><a href="#" id="tdsupplierinitialize'+i+'" data-toggle="tooltip" data-placement="bottom" title="初始化" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-refresh" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#supplierData").children().remove();
            $("#supplierData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#trsupplier"+i;
                $(trid).attr("data-supplierid", r[i].pk);
                var tdmodify="#tdsuppliermodify"+i;
                var tddelete="#tdsupplierdelete"+i;
                var initialize="#tdsupplierinitialize"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifySupplier("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deleteSupplier('+r[i].pk+')');
                $(initialize).attr('href', 'javascript:initializeSupplier('+r[i].pk+')');
            }
        },
        error: function () {
            layer.mag('服务器超时，请重试！');
        }
    })

}

// 增加供应商
function addSupplierData(){
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
    str += '<form class="layui-form" id="modal-form" action>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">编号</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="number" required  lay-verify="required" placeholder="编号" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">姓名</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="name" required  lay-verify="required" placeholder="姓名" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">地址</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="address" required  lay-verify="required" placeholder="地址" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">电话</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="phone" required  lay-verify="required|phone|number" placeholder="电话" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">评分</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="score" required  lay-verify="required" placeholder="评分" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">密码</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="password" required  lay-verify="required" placeholder="密码" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addSupplier" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('仓储管理员增加');
        $('#modal-body').html(str);
        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addSupplier)', function(data){
            var r = data.field;
            jsr=JSON.stringify(r);
            addAjax('add_supplier_data', jsr, function(){
                //回调函数,用于刷新
                getSupplierData();
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}

// 修改供应商
function modifySupplier(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
        str += '<form class="layui-form" id="modal-form" action>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">编号</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="number" required  lay-verify="required" placeholder="编号" value="' + tds[1].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">姓名</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="name" required  lay-verify="required" placeholder="姓名" value="' + tds[2].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">地址</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="address" required  lay-verify="required" placeholder="地址" value="' + tds[3].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">电话</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="phone" required  lay-verify="required|phone|number" placeholder="电话" value="' + tds[4].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">评分</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="score" required  lay-verify="required" placeholder="评分" value="' + tds[5].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<label class="layui-form-label">密码</label>' +
        '<div class="layui-input-block">' +
        '<input type="text" name="password" required  lay-verify="required" placeholder="密码" value="' + tds[6].innerHTML + '" autocomplete="off" class="layui-input">'
        + '</div>' +
        '</div>' +
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updateSupplier" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('供应商修改');
        $('#modal-body').html(str);
        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updateSupplier)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-supplierid');
            jsr=JSON.stringify(r);
            updateAjax('update_supplier_data', jsr, function () {
                //回调函数,用于刷新
                getSupplierData();
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}

// 删除供应商
function deleteSupplier(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('供应商删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_supplier_data",id,function () {
		 	 //回调函数,用于刷新
            getSupplierData();
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}


//初始化供应商密码
function initializeSupplier(id){
    var str = '';
    str+='<h3>你确定要初始化吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('供应商初始化');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('初始化');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         initializeAjax("initialize_supplier_data",id,function () {
		 	 //回调函数,用于刷新
            getSupplierData();
         });
         $('#modal').modal('hide'); //隐藏模态框
	});

}

//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function(){
  var element = layui.element;

  //…
});
