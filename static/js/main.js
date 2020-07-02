
$(document).ready(function() {
    var p = userinfo.position;
    var id = userinfo.id;
    var a = {'number':'test','code': 1};
    var jsr= JSON.stringify(a);
    getPlanData(jsr);
    getStockMaterials(jsr);
    getPurchasedMaterialData(jsr);
    getStorageMaterialsData(jsr);
    getOutboundMaterialsData(jsr);
    getReturnedMaterialsData(jsr);
    getDeliveryMaterialsData(jsr);
    // verifyPermissions(p);

    //add按钮绑定处理函数
	$("#add-btn-plan").attr('href', 'javascript:addPlan()');
	$("#add-btn-stock").attr('href', 'javascript:addStock()');
	$("#add-btn-purchasedmaterial").attr('href', 'javascript:addPurchasedMaterial()');
	$("#add-btn-storage").attr('href', 'javascript:addStorageMaterials()');
	$("#add-btn-outbound").attr('href', 'javascript:addOutboundMaterials()');
    $("#add-btn-returned").attr('href', 'javascript:addReturnedMaterials()');
    $("#add-btn-delivery").attr('href', 'javascript:addDeliveryMaterials()');

	//登出按钮绑定处理函数
	$("#logout-btn").attr('href', 'javascript:logout()');

	$("#modify-btn").click(function() {
        layui.use('form', function() {
            var p = userinfo.position;
            var id = userinfo.id;
            var form = layui.form;
            var str = '';
            str+='<form class="layui-form">'+
            '<div class="layui-form-item">'+
            '<label class="layui-form-label weight">新密码</label>'+
            '<div class="layui-input-block">'+
              '<input type="text" name="password" required  lay-verify="required" placeholder="请输入新密码" autocomplete="off" class="layui-input">'+
            '</div>'+
            '</div>'+
            '<div class="layui-form-item">' +
            '<div class="layui-input-block">' +
            '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="modifyPassword" id="modal-btn-submit"></button>'
            + '</div>' +
            '</div>' +
            '</form>';

            //显示模态框
            $('#modal-title').html('密码修改');
            $('#modal-body').html(str);

            $('#modal').modal('toggle'); //打开模态框
            $('#modal-btn-submit').html('修改');
            form.on('submit(modifyPassword)', function(data){
                var r = data.field;
                r.id = id;
                r.position = p;
                jsr=JSON.stringify(r);
                $.ajax({
                    type: 'POST',
                    url: 'modify_password',
                    data:{'psr':jsr},
                    success: function (result) {
                        layer.msg('修改成功！');
                    },
                    error: function () {
                        layer.msg('服务器超时，请重试！');
                    }
                });

                $('#modal').modal('hide'); //隐藏模态框
                return false;
            });
        })
	});

    //查询
    layui.use('form', function(){
        var form = layui.form;
        //监听提交
        form.on('submit(formSearchPlan0)', function(data) {
            var r = data.field;
            r.code = 2;
            var jsr= JSON.stringify(r)
            getPlanData(jsr);
        });

         form.on('submit(formSearchPlan1)', function(data) {
            var r = data.field;
            r.code = 3;
            var jsr= JSON.stringify(r)
            getPlanData(jsr);
        });

         form.on('submit(formSearchPurchasedMaterial0)', function(data) {
            var r = data.field;
            r.code = 2;
            var jsr= JSON.stringify(r)
            getPurchasedMaterialData(jsr);
        });

         form.on('submit(formSearchPurchasedMaterial1)', function(data) {
            var r = data.field;
            r.code = 3;
            var jsr= JSON.stringify(r)
            getPurchasedMaterialData(jsr);
        });

         form.on('submit(formSearchStockMaterials0)', function(data) {
            var r = data.field;
            r.code = 2;
            var jsr= JSON.stringify(r)
            getStockMaterials(jsr);
        });

         form.on('submit(formSearchStockMaterials1)', function(data) {
            var r = data.field;
            r.code = 3;
            var jsr= JSON.stringify(r)
            getStockMaterials(jsr);
        });

         form.on('submit(formSearchStorageMaterials0)', function(data) {
            var r = data.field;
            r.code = 2;
            var jsr= JSON.stringify(r)
            getStorageMaterialsData(jsr);
        });

         form.on('submit(formSearchStorageMaterials1)', function(data) {
            var r = data.field;
            r.code = 3;
            var jsr= JSON.stringify(r)
            getStorageMaterialsData(jsr);
        });

         form.on('submit(formSearchOutboundMaterials0)', function(data) {
            var r = data.field;
            r.code = 2;
            var jsr= JSON.stringify(r)
            getOutboundMaterialsData(jsr);
        });

         form.on('submit(formSearchOutboundMaterials1)', function(data) {
            var r = data.field;
            r.code = 3;
            var jsr= JSON.stringify(r)
            getOutboundMaterialsData(jsr);
        });

         form.on('submit(formSearchReturnedMaterials0)', function(data) {
            var r = data.field;
            r.code = 2;
            var jsr= JSON.stringify(r)
            getReturnedMaterialsData(jsr);
        });

         form.on('submit(formSearchReturnedMaterials1)', function(data) {
            var r = data.field;
            r.code = 3;
            var jsr= JSON.stringify(r)
            getReturnedMaterialsData(jsr);
        });

         form.on('submit(formSearchDeliveryMaterials0)', function(data) {
            var r = data.field;
            r.code = 2;
            var jsr= JSON.stringify(r)
            getDeliveryMaterialsData(jsr);
        });


        return false;
    })
    // });
});


//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function(){
  var element = layui.element;

  //…
});


// 权限显示
function verifyPermissions(p) {
    // if(p == 0){
    //     $('#title').html('欢迎你，计划员');
    //     var plan = document.getElementById("planManager");
    //     var plan0 = document.getElementById("planManager0");
    //     plan.style.display="block";
    //     plan0.style.display="block";
    // }
    // else if(p == 1){
    //     $('#title').html('欢迎你，采购员');
    //     var buy = document.getElementById("buyManager");
    //     var buy0 = document.getElementById("buyManager0");
    //     buy.style.display="block";
    //     buy0.style.display="block";
    // }
    // else if(p == 2){
    //     $('#title').html('欢迎你，仓储管理员');
    //     var ware = document.getElementById("wareManager");
    //     var ware0 = document.getElementById("wareManager0");
    //     ware.style.display="block";
    //     ware0.style.display="block";
    // }else{
    //     $('.control').addClass("disabled");
    //     $('.control0').addClass("disabled");
    //     $('.control1').addClass("disabled");
    //     $('#title').html('欢迎你，供应商');
    //     var supplier = document.getElementById("supplier");
    //     var supplier0 = document.getElementById("supplier0");
    //     // var buy = document.getElementById("buyManager");
    //     var buy0 = document.getElementById("buyManager0");

    //     // buy.style.display="block";
    //     supplier.style.display="block";
    //     buy0.style.display="block";
    //     supplier0.style.display="block";
    // }

}


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

// 选择采购员
function selectBuyer() {
    var defer=$.Deferred();
    $.ajax({
        type: 'POST',
        url:'select_buyer',
        success: function (result) {
            console.log('selectBuyer success');
            defer.resolve(result);
        },
        error: function () {
            alert('服务器超时，请重试！')
        }
    });
    return defer.promise();
}

// 选择供应商
function selectSupplier() {
    var defer=$.Deferred();
    $.ajax({
        type: 'POST',
        url:'select_supplier',
        success: function (result) {
            console.log('selectSupplier success');
            defer.resolve(result);
        },
        error: function () {
            alert('服务器超时，请重试！')
        }
    });
    return defer.promise();
}


// 选择供应商
function selectPlan() {
    var defer=$.Deferred();
    $.ajax({
        type: 'POST',
        url:'select_plan',
        success: function (result) {
            console.log('selectSupplier success');
            defer.resolve(result);
        },
        error: function () {
            alert('服务器超时，请重试！')
        }
    });
    return defer.promise();
}

// 选择供应商
function selectWarehouseManager() {
    var defer=$.Deferred();
    $.ajax({
        type: 'POST',
        url:'select_warehouseManager',
        success: function (result) {
            console.log('selectSupplier success');
            defer.resolve(result);
        },
        error: function () {
            alert('服务器超时，请重试！')
        }
    });
    return defer.promise();
}




// 获取计划数据
function getPlanData(str) {
    $.ajax({
        type: 'POST',
        url:'get_plan_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['plan_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "trplan'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].order_num+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].specification+"</td>";
                str+="<td>"+r[i]['fields'].count+"</td>";
                str+="<td>"+r[i]['fields'].price+"</td>";
                str+="<td>"+r[i]['fields'].totalPrice+"</td>";
                str+="<td>"+r[i]['fields'].buyer_number+"</td>";
                str+='<td><a href="#" id="tdplanmodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tdplandelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#planData").children().remove();
            $("#planData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#trplan"+i;
                $(trid).attr("data-planid", r[i].pk);
                var tdmodify="#tdplanmodify"+i;
                var tddelete="#tdplandelete"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifyPlan("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deletePlan('+r[i].pk+')');
            }
        },
        error: function () {
            layer.mag('服务器超时，请重试！')
        }
    })

}

function addPlan() {
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">订单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="order_num" required  lay-verify="required" placeholder="请输入订单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" placeholder="请输入物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" placeholder="请输入物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资规格</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="specification" required  lay-verify="required" placeholder="请输入物资规格" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">数量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" placeholder="请输入数量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">单价</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="price" required  lay-verify="required|number" placeholder="请输入单价" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">总价</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="totalPrice" required  lay-verify="required|number" placeholder="请输入总价" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">采购员编号</label>'+
        '<div class="layui-input-block">'+
        '<select name="buyer" lay-verify="required" id="buyer-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addPlan" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('待采购订单增加');
        $('#modal-body').html(str);
        $.when(selectBuyer()).done(function (result) {
            if(result==null){
                alert("查询采购员出错")
            }else{
                var option= '<option value=""></option>';
                var r = JSON.parse(result);
                var jsr=r['buyer_list'];
                for (var i = 0; i < jsr.length; i++) {
                    option+='<option value="'+jsr[i].pk+'">'+jsr[i]['fields'].number+'</option>';
                }
                $("#buyer-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });

        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addPlan)', function(data){
            var r = data.field;
            jsr=JSON.stringify(r);
            alert(jsr);
            addAjax('add_plan_data', jsr, function(){
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getPlanData(jsr);
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 修改计划
function modifyPlan(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
         str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">订单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="order_num" required  lay-verify="required" value="'+tds[1].innerHTML+'" placeholder="请输入订单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" value="'+tds[2].innerHTML+'" placeholder="请输入物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" value="'+tds[3].innerHTML+'" placeholder="请输入物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资规格</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="specification" required  lay-verify="required" value="'+tds[4].innerHTML+'" placeholder="请输入物资规格" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">数量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" value="'+tds[5].innerHTML+'" placeholder="请输入数量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">单价</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="price" required  lay-verify="required|number" value="'+tds[6].innerHTML+'" placeholder="请输入单价" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">总价</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="totalPrice" required  lay-verify="required|number" value="'+tds[7].innerHTML+'" placeholder="请输入总价" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">采购员编号</label>'+
        '<div class="layui-input-block">'+
        '<select name="buyer" lay-verify="required" id="buyer-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updatePlan" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('采购计划修改');
        $('#modal-body').html(str);
        $.when(selectBuyer()).done(function(result){
            if(result==null){
                alert("查询采购员错误");
            }else{
                var option='';
                var r = JSON.parse(result);
                var opt = r['buyer_list'];
                for (var i = 0; i < opt.length; i++) {
                    if(opt[i]['fields'].number==tds[8].innerHTML)
                        option+='<option value="'+opt[i].pk+'" selected="true">'+opt[i]['fields'].number+'</option>';
                    else
                        option+='<option value="'+opt[i].pk+'">'+opt[i]['fields'].number+'</option>';
                }
                $("#buyer-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });


        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updatePlan)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-planid');
            jsr=JSON.stringify(r);
            updateAjax('update_plan_data', jsr, function () {
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getPlanData(jsr);
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 删除计划
function deletePlan(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('采购计划删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_plan_data",id,function () {
		 	 //回调函数,用于刷新
            var a = {'number':'test','code': 1};
            var jsr= JSON.stringify(a)
            getPlanData(jsr);
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}

// 获取已采购订单数据
function getPurchasedMaterialData(str) {
    $.ajax({
        type: 'POST',
        url:'get_purchasedmaterial_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['plan_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "trpurchasedmaterial'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].order_num+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].specification+"</td>";
                str+="<td>"+r[i]['fields'].count+"</td>";
                str+="<td>"+r[i]['fields'].price+"</td>";
                str+="<td>"+r[i]['fields'].totalPrice+"</td>";
                str+="<td>"+r[i]['fields'].buyer_number+"</td>";
                str+='<td><a href="#" id="tdpurchasedmaterialmodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn control0" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tdpurchasedmaterialdelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn control1" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#PurchasedMaterialData").children().remove();
            $("#PurchasedMaterialData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#trpurchasedmaterial"+i;
                $(trid).attr("data-purchasedmaterialid", r[i].pk);
                var tdmodify="#tdpurchasedmaterialmodify"+i;
                var tddelete="#tdpurchasedmaterialdelete"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifyPurchasedMaterial("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deletePurchasedMaterial('+r[i].pk+')');
            }
        },
        error: function () {
            layer.mag('服务器超时，请重试！')
        }
    })

}

// 增加已采购订单
function addPurchasedMaterial() {
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">采购订单号</label>'+
        '<div class="layui-input-block">'+
        '<select name="plan" lay-verify="required" id="plan-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">数量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" placeholder="请输入数量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addPurchasedMaterial" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('待采购订单增加');
        $('#modal-body').html(str);
        $.when(selectPlan()).done(function (result) {
            if(result==null){
                alert("查询采购计划出错")
            }else{
                var option= '<option value=""></option>';
                var r = JSON.parse(result);
                var jsr=r['plan_list'];
                for (var i = 0; i < jsr.length; i++) {
                    option+='<option value="'+jsr[i].pk+'">'+jsr[i]['fields'].order_num+'</option>';
                }
                $("#plan-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });

        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addPurchasedMaterial)', function(data){
            var r = data.field;
            jsr=JSON.stringify(r);
            addAjax('add_purchasedmaterial_data', jsr, function(){
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getPurchasedMaterialData(jsr);
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 修改已采购物资
function modifyPurchasedMaterial(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
         str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">订单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="order_num" required  lay-verify="required" value="'+tds[1].innerHTML+'" placeholder="请输入订单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" value="'+tds[2].innerHTML+'" placeholder="请输入物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" value="'+tds[3].innerHTML+'" placeholder="请输入物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资规格</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="specification" required  lay-verify="required" value="'+tds[4].innerHTML+'" placeholder="请输入物资规格" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">数量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" value="'+tds[5].innerHTML+'" placeholder="请输入数量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">单价</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="price" required  lay-verify="required|number" value="'+tds[6].innerHTML+'" placeholder="请输入单价" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">总价</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="totalPrice" required  lay-verify="required|number" value="'+tds[7].innerHTML+'" placeholder="请输入总价" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">采购员编号</label>'+
        '<div class="layui-input-block">'+
        '<select name="buyer" lay-verify="required" id="buyer-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updatePlan" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('已采购订单修改');
        $('#modal-body').html(str);
        $.when(selectBuyer()).done(function(result){
            if(result==null){
                alert("查询采购员错误");
            }else{
                var option='';
                var r = JSON.parse(result);
                var opt = r['buyer_list'];
                for (var i = 0; i < opt.length; i++) {
                    if(opt[i]['fields'].number==tds[8].innerHTML)
                        option+='<option value="'+opt[i].pk+'" selected="true">'+opt[i]['fields'].number+'</option>';
                    else
                        option+='<option value="'+opt[i].pk+'">'+opt[i]['fields'].number+'</option>';
                }
                $("#buyer-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });


        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updatePlan)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-purchasedmaterialid');
            jsr=JSON.stringify(r);
            updateAjax('update_purchasedmaterial_data', jsr, function () {
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getPurchasedMaterialData(jsr);
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 删除已采购订单
function deletePurchasedMaterial(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('已采购订单删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_purchasedmaterial_data",id,function () {
		 	 //回调函数,用于刷新
            var a = {'number':'test','code': 1};
            var jsr= JSON.stringify(a)
            getPurchasedMaterialData(jsr);
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}



// 获取库存物资数据
function getStockMaterials(str) {
    $.ajax({
        type: 'POST',
        url:'get_stock_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['stock_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "trstock'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].specification+"</td>";
                str+="<td>"+r[i]['fields'].price+"</td>";
                str+="<td>"+r[i]['fields'].supplier_address+"</td>";
                str+="<td>"+r[i]['fields'].count+"</td>";
                str+='<td><a href="#" id="tdstockmodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tdstockdelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#stockMaterialsData").children().remove();
            $("#stockMaterialsData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#trstock"+i;
                $(trid).attr("data-stockid", r[i].pk);
                var tdmodify="#tdstockmodify"+i;
                var tddelete="#tdstockdelete"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifyStock("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deleteStock('+r[i].pk+')');
            }
        },
        error: function () {
            layer.mag('服务器超时，请重试！')
        }
    })
}

// 增加库存物资
function addStock() {
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" placeholder="请输入物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" placeholder="请输入物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资规格</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="specification" required  lay-verify="required" placeholder="请输入物资规格" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">物资单价</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="price" required  lay-verify="required|number" placeholder="请输入单价" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资供应商</label>'+
        '<div class="layui-input-block">'+
        '<select name="supplier" lay-verify="required" id="supplier-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">当前库存量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" placeholder="请输入库存量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addStock" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('库存物资增加');
        $('#modal-body').html(str);
        $.when(selectSupplier()).done(function (result) {
            if(result==null){
                alert("查询供应商出错")
            }else{
                var option= '<option value=""></option>';
                var r = JSON.parse(result);
                var jsr=r['supplier_list'];
                for (var i = 0; i < jsr.length; i++) {
                    option+='<option value="'+jsr[i].pk+'">'+jsr[i]['fields'].address+'</option>';
                }
                $("#supplier-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });

        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addStock)', function(data){
            var r = data.field;
            jsr=JSON.stringify(r);
            addAjax('add_stock_data', jsr, function(){
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getStockMaterials(jsr);
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 修改库存物资
function modifyStock(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
         str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" value="'+tds[1].innerHTML+'" placeholder="请输入物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" value="'+tds[2].innerHTML+'" placeholder="请输入物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资规格</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="specification" required  lay-verify="required" value="'+tds[3].innerHTML+'" placeholder="请输入物资规格" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">物资单价</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="price" required  lay-verify="required|number" value="'+tds[4].innerHTML+'" placeholder="请输入单价" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资供应商</label>'+
        '<div class="layui-input-block">'+
        '<select name="supplier" lay-verify="required" id="supplier-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
         '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">当前库存量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" value="'+tds[6].innerHTML+'" placeholder="请输入数量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updatePlan" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('库存物资修改');
        $('#modal-body').html(str);
        $.when(selectSupplier()).done(function(result){
            if(result==null){
                alert("查询供应商错误");
            }else{
                var option='';
                var r = JSON.parse(result);
                var opt = r['supplier_list'];
                for (var i = 0; i < opt.length; i++) {
                    if(opt[i]['fields'].address==tds[5].innerHTML)
                        option+='<option value="'+opt[i].pk+'" selected="true">'+opt[i]['fields'].address+'</option>';
                    else
                        option+='<option value="'+opt[i].pk+'">'+opt[i]['fields'].address+'</option>';
                }
                $("#supplier-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });


        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updatePlan)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-stockid');
            jsr=JSON.stringify(r);
            updateAjax('update_stock_data', jsr, function () {
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getStockMaterials(jsr);
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}

// 删除库存物资
function deleteStock(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('库存物资删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_stock_data",id,function () {
		 	 //回调函数,用于刷新
            var a = {'number':'test','code': 1};
            var jsr= JSON.stringify(a)
            getStockMaterials(jsr);
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}

// 获取计划数据
function getStorageMaterialsData(str) {
    $.ajax({
        type: 'POST',
        url:'get_storage_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['storage_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "trstorage'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].storage_num+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].storage_time+"</td>";
                str+="<td>"+r[i]['fields'].count+"</td>";
                str+="<td>"+r[i]['fields'].warehouseManager_name+"</td>";
                str+='<td><a href="#" id="tdstoragemodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tdstoragedelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#storageMaterialsData").children().remove();
            $("#storageMaterialsData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#trstorage"+i;
                $(trid).attr("data-storageid", r[i].pk);
                var tdmodify="#tdstoragemodify"+i;
                var tddelete="#tdstoragedelete"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifyStorageMaterials("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deleteStorageMaterials('+r[i].pk+')');
            }
        },
        error: function () {
            layer.mag('服务器超时，请重试！')
        }
    })

}

// 增加入库物资
function addStorageMaterials() {
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">入库单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="storage_num" required  lay-verify="required" placeholder="请输入入库单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">入库物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" placeholder="请输入入库物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">入库物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" placeholder="请输入入库物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">入库物资量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" placeholder="请输入入库物资量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">经办人</label>'+
        '<div class="layui-input-block">'+
        '<select name="warehouseManager" lay-verify="required" id="manager-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addStorageMaterials" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('入库物资增加');
        $('#modal-body').html(str);
        $.when(selectWarehouseManager()).done(function (result) {
            if(result==null){
                alert("查询仓储管理员出错")
            }else{
                var option= '<option value=""></option>';
                var r = JSON.parse(result);
                var jsr=r['manager_list'];
                for (var i = 0; i < jsr.length; i++) {
                    option+='<option value="'+jsr[i].pk+'">'+jsr[i]['fields'].name+'</option>';
                }
                $("#manager-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });

        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addStorageMaterials)', function(data){
            var r = data.field;
            jsr=JSON.stringify(r);
            addAjax('add_storage_data', jsr, function(){
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getStorageMaterialsData(jsr);
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 修改入库物资
function modifyStorageMaterials(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">入库单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="storage_num" required  lay-verify="required" value="'+tds[1].innerHTML+'" placeholder="请输入入库单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">入库物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" value="'+tds[2].innerHTML+'" placeholder="请输入入库物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">入库物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" value="'+tds[3].innerHTML+'" placeholder="请输入入库物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">入库物资量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" value="'+tds[5].innerHTML+'" placeholder="请输入入库物资量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">经办人</label>'+
        '<div class="layui-input-block">'+
        '<select name="warehouseManager" lay-verify="required" id="manager-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updateStorageMaterials" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('入库表单修改');
        $('#modal-body').html(str);
        $.when(selectWarehouseManager()).done(function(result){
            if(result==null){
                alert("查询仓储管理员错误");
            }else{
                var option='';
                var r = JSON.parse(result);
                var opt = r['manager_list'];
                for (var i = 0; i < opt.length; i++) {
                    if(opt[i]['fields'].name==tds[6].innerHTML)
                        option+='<option value="'+opt[i].pk+'" selected="true">'+opt[i]['fields'].name+'</option>';
                    else
                        option+='<option value="'+opt[i].pk+'">'+opt[i]['fields'].name+'</option>';
                }
                $("#manager-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });


        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updateStorageMaterials)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-storageid');
            jsr=JSON.stringify(r);
            updateAjax('update_storage_data', jsr, function () {
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getStorageMaterialsData(jsr);
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 删除入库物资
function deleteStorageMaterials(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('入库物资删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_storage_data",id,function () {
		 	 //回调函数,用于刷新
            var a = {'number':'test','code': 1};
            var jsr= JSON.stringify(a)
            getStorageMaterialsData(jsr);
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}

// 获取出库物资
function getOutboundMaterialsData(str) {
    $.ajax({
        type: 'POST',
        url:'get_outbound_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['outbound_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "troutbound'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].outbound_num+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].outbound_time+"</td>";
                str+="<td>"+r[i]['fields'].count+"</td>";
                str+="<td>"+r[i]['fields'].warehouseManager_name+"</td>";
                str+='<td><a href="#" id="tdoutboundmodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tdoutbounddelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#outboundData").children().remove();
            $("#outboundData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#troutbound"+i;
                $(trid).attr("data-outboundid", r[i].pk);
                var tdmodify="#tdoutboundmodify"+i;
                var tddelete="#tdoutbounddelete"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifyOutboundMaterials("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deleteOutboundMaterials('+r[i].pk+')');
            }
        },
        error: function () {
            layer.mag('服务器超时，请重试！')
        }
    })

}


// 增加出库物资
function addOutboundMaterials() {
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">出库单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="outbound_num" required  lay-verify="required" placeholder="请输入入库单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">出库物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" placeholder="请输入入库物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">出库物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" placeholder="请输入入库物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">出库物资量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" placeholder="请输入入库物资量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">经办人</label>'+
        '<div class="layui-input-block">'+
        '<select name="warehouseManager" lay-verify="required" id="manager-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addOutboundMaterials" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('出库物资增加');
        $('#modal-body').html(str);
        $.when(selectWarehouseManager()).done(function (result) {
            if(result==null){
                alert("查询仓储管理员出错")
            }else{
                var option= '<option value=""></option>';
                var r = JSON.parse(result);
                var jsr=r['manager_list'];
                for (var i = 0; i < jsr.length; i++) {
                    option+='<option value="'+jsr[i].pk+'">'+jsr[i]['fields'].name+'</option>';
                }
                $("#manager-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });

        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addOutboundMaterials)', function(data){
            var r = data.field;
            jsr=JSON.stringify(r);
            addAjax('add_outbound_data', jsr, function(){
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getOutboundMaterialsData (jsr);
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 修改出库
function modifyOutboundMaterials(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">出库单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="outbound_num" required  lay-verify="required" value="'+tds[1].innerHTML+'" placeholder="请输入出库单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">出库物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" value="'+tds[2].innerHTML+'" placeholder="请输入出库物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">出库物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" value="'+tds[3].innerHTML+'" placeholder="请输入出库物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">出库物资量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" value="'+tds[5].innerHTML+'" placeholder="请输入出库物资量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">经办人</label>'+
        '<div class="layui-input-block">'+
        '<select name="warehouseManager" lay-verify="required" id="manager-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updateOutboundMaterials" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('出库物资修改');
        $('#modal-body').html(str);
        $.when(selectWarehouseManager()).done(function(result){
            if(result==null){
                alert("查询采购员错误");
            }else{
                var option='';
                var r = JSON.parse(result);
                var opt = r['manager_list'];
                for (var i = 0; i < opt.length; i++) {
                    if(opt[i]['fields'].name==tds[6].innerHTML)
                        option+='<option value="'+opt[i].pk+'" selected="true">'+opt[i]['fields'].name+'</option>';
                    else
                        option+='<option value="'+opt[i].pk+'">'+opt[i]['fields'].name+'</option>';
                }
                $("#manager-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });


        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updateOutboundMaterials)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-outboundid');
            jsr=JSON.stringify(r);
            updateAjax('update_outbound_data', jsr, function () {
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getOutboundMaterialsData(jsr);
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 删除出库物资
function deleteOutboundMaterials(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('出库物资删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_outbound_data",id,function () {
		 	 //回调函数,用于刷新
            var a = {'number':'test','code': 1};
            var jsr= JSON.stringify(a)
            getOutboundMaterialsData(jsr);
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}

// 获取出库物资
function getReturnedMaterialsData(str) {
    $.ajax({
        type: 'POST',
        url:'get_returned_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['returned_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "trreturned'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].returned_num+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].returned_time+"</td>";
                str+="<td>"+r[i]['fields'].count+"</td>";
                str+="<td>"+r[i]['fields'].warehouseManager_name+"</td>";
                str+='<td><a href="#" id="tdreturnedmodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tdreturneddelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#returnedData").children().remove();
            $("#returnedData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#trreturned"+i;
                $(trid).attr("data-returnedid", r[i].pk);
                var tdmodify="#tdreturnedmodify"+i;
                var tddelete="#tdreturneddelete"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifyReturnedMaterials("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deleteReturnedMaterials('+r[i].pk+')');
            }
        },
        error: function () {
            layer.mag('服务器超时，请重试！')
        }
    })

}


// 增加出库物资
function addReturnedMaterials() {
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">退库单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="returned_num" required  lay-verify="required" placeholder="请输入退库单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">退库物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" placeholder="请输入退库物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">退库物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" placeholder="请输入退库物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">退库物资量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" placeholder="请输入退库物资量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">经办人</label>'+
        '<div class="layui-input-block">'+
        '<select name="warehouseManager" lay-verify="required" id="manager-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addReturnedMaterials" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('退库物资增加');
        $('#modal-body').html(str);
        $.when(selectWarehouseManager()).done(function (result) {
            if(result==null){
                alert("查询仓储管理员出错")
            }else{
                var option= '<option value=""></option>';
                var r = JSON.parse(result);
                var jsr=r['manager_list'];
                for (var i = 0; i < jsr.length; i++) {
                    option+='<option value="'+jsr[i].pk+'">'+jsr[i]['fields'].name+'</option>';
                }
                $("#manager-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });

        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addReturnedMaterials)', function(data){
            var r = data.field;
            jsr=JSON.stringify(r);
            addAjax('add_returned_data', jsr, function(){
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getReturnedMaterialsData (jsr);
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 修改退库
function modifyReturnedMaterials(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">出库单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="returned_num" required  lay-verify="required" value="'+tds[1].innerHTML+'" placeholder="请输入出库单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">出库物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" value="'+tds[2].innerHTML+'" placeholder="请输入出库物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">出库物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" value="'+tds[3].innerHTML+'" placeholder="请输入出库物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">出库物资量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" value="'+tds[5].innerHTML+'" placeholder="请输入出库物资量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">经办人</label>'+
        '<div class="layui-input-block">'+
        '<select name="warehouseManager" lay-verify="required" id="manager-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updateReturnedMaterials" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('退库物资修改');
        $('#modal-body').html(str);
        $.when(selectWarehouseManager()).done(function(result){
            if(result==null){
                alert("查询采购员错误");
            }else{
                var option='';
                var r = JSON.parse(result);
                var opt = r['manager_list'];
                for (var i = 0; i < opt.length; i++) {
                    if(opt[i]['fields'].name==tds[6].innerHTML)
                        option+='<option value="'+opt[i].pk+'" selected="true">'+opt[i]['fields'].name+'</option>';
                    else
                        option+='<option value="'+opt[i].pk+'">'+opt[i]['fields'].name+'</option>';
                }
                $("#manager-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });


        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updateReturnedMaterials)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-returnedid');
            jsr=JSON.stringify(r);
            updateAjax('update_returned_data', jsr, function () {
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getReturnedMaterialsData(jsr);
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 删除退库物资
function deleteReturnedMaterials(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('退库物资删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_returned_data",id,function () {
		 	 //回调函数,用于刷新
            var a = {'number':'test','code': 1};
            var jsr= JSON.stringify(a)
            getReturnedMaterialsData(jsr);
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}

//03
// 获取库存物资数据
function getDeliveryMaterialsData(str) {
    $.ajax({
        type: 'POST',
        url:'get_delivery_data',
        data:{'psr':str},
        success: function (result) {
            var jsr = JSON.parse(result);
            var r = jsr['delivery_list'];
            var str = "";
            for(var i = 0; i < r.length; i++){
                str+='<tr id= "trdelivery'+i+'">';
                str+="<td>"+(i+1)+"</td>";
                str+="<td>"+r[i]['fields'].delivery_num+"</td>";
                str+="<td>"+r[i]['fields'].number+"</td>";
                str+="<td>"+r[i]['fields'].name+"</td>";
                str+="<td>"+r[i]['fields'].count+"</td>";
                str+="<td>"+r[i]['fields'].totalPrice+"</td>";
                str+="<td>"+r[i]['fields'].delivery_time+"</td>";
                str+="<td>"+r[i]['fields'].supplier_name+"</td>";
                str+='<td><a href="#" id="tddeliverymodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-edit" style="color: rgb(48, 90, 207);"></span></a></td>';
                str+='<td><a href="#" id="tddeliverydelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="layui-icon layui-icon-delete" style="color: rgb(48,90,207);"></span></a></td>';
                str+="</tr>";
            }
            $("#deliveryData").children().remove();
            $("#deliveryData").html(str);
            for (var i = 0; i < r.length; i++) {
                var trid="#trdelivery"+i;
                $(trid).attr("data-deliveryid", r[i].pk);
                var tdmodify="#tddeliverymodify"+i;
                var tddelete="#tddeliverydelete"+i;
                //传递tr的id，在函数里用tr遍历td中的每个值
                $(tdmodify).attr('href', 'javascript:modifyDeliveryMaterials("'+trid+'")');
                $(tddelete).attr('href', 'javascript:deleteDeliveryMaterials('+r[i].pk+')');
            }
        },
        error: function () {
            layer.mag('服务器超时，请重试！')
        }
    })
}

// 增加库存物资
function addDeliveryMaterials() {
    layui.use('form', function() {
        var form = layui.form;
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">发货单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="delivery_num" required  lay-verify="required" placeholder="请输入发货单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" placeholder="请输入物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" placeholder="请输入物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">物资数量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" placeholder="请输入物资数量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">物资总价</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="totalPrice" required  lay-verify="required|number" placeholder="请输入物资总价" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">供应商名称</label>'+
        '<div class="layui-input-block">'+
        '<select name="supplier" lay-verify="required" id="supplier-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="addDeliveryMaterials" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('发货物资增加');
        $('#modal-body').html(str);
        $.when(selectSupplier()).done(function (result) {
            if(result==null){
                alert("查询供应商出错")
            }else{
                var option= '<option value=""></option>';
                var r = JSON.parse(result);
                var jsr=r['supplier_list'];
                for (var i = 0; i < jsr.length; i++) {
                    option+='<option value="'+jsr[i].pk+'">'+jsr[i]['fields'].name+'</option>';
                }
                $("#supplier-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });

        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('增加');
        form.on('submit(addDeliveryMaterials)', function(data){
            var r = data.field;
            jsr=JSON.stringify(r);
            addAjax('add_delivery_data', jsr, function(){
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getDeliveryMaterialsData(jsr);
            })
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}


// 修改库存物资
function modifyDeliveryMaterials(trid){
    layui.use('form', function() {
        var form = layui.form;
        var tds = $(trid).children('td');
        var str = '';
        str+='<form class="layui-form">'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">发货单编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="delivery_num" required  lay-verify="required" value="'+tds[1].innerHTML+'" placeholder="请输入发货单编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资编号</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="number" required  lay-verify="required" value="'+tds[2].innerHTML+'" placeholder="请输入物资编号" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">物资名称</label>'+
        '<div class="layui-input-block">'+
          '<input type="text" name="name" required  lay-verify="required" value="'+tds[3].innerHTML+'" placeholder="请输入物资名称" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">物资数量</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="count" required  lay-verify="required|number" value="'+tds[4].innerHTML+'" placeholder="请输入物资数量" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item ">'+
        '<label class="layui-form-label weight">物资总价</label>'+
        '<div class="layui-input-block">'+
            '<input type="text" name="totalPrice" required  lay-verify="required|number" value="'+tds[5].innerHTML+'" placeholder="请输入物资总价" autocomplete="off" class="layui-input">'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">'+
        '<label class="layui-form-label weight">供应商名称</label>'+
        '<div class="layui-input-block">'+
        '<select name="supplier" lay-verify="required" id="supplier-list">'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<div class="layui-form-item">' +
        '<div class="layui-input-block">' +
        '<button class="layui-btn layui-btn-fluid" lay-submit lay-filter="updateDeliveryMaterials" id="modal-btn-submit"></button>'
        + '</div>' +
        '</div>' +
        '</form>';

        //显示模态框
        $('#modal-title').html('库存物资修改');
        $('#modal-body').html(str);
        $.when(selectSupplier()).done(function(result){
            if(result==null){
                alert("查询供应商错误");
            }else{
                var option='';
                var r = JSON.parse(result);
                var opt = r['supplier_list'];
                for (var i = 0; i < opt.length; i++) {
                    if(opt[i]['fields'].name==tds[7].innerHTML)
                        option+='<option value="'+opt[i].pk+'" selected="true">'+opt[i]['fields'].name+'</option>';
                    else
                        option+='<option value="'+opt[i].pk+'">'+opt[i]['fields'].name+'</option>';
                }
                $("#supplier-list").html(option);
                //刷新select选择框渲染
	 		    form.render('select');
            }
        });


        $('#modal').modal('toggle'); //打开模态框
        $('#modal-btn-submit').html('修改');
        form.on('submit(updateDeliveryMaterials)', function(data){
            var r = data.field;
            r.id = $(trid).attr('data-deliveryid');
            jsr=JSON.stringify(r);
            updateAjax('update_delivery_data', jsr, function () {
                //回调函数,用于刷新
                var a = {'number':'test','code': 1};
                var jsr= JSON.stringify(a)
                getDeliveryMaterialsData(jsr);
            });
            $('#modal').modal('hide'); //隐藏模态框
            return false;
        });
    })
}

// 删除库存物资
function deleteDeliveryMaterials(id){
    var str = '';
    str+='<h3>你确定要删除吗？</h3>'+
    '<button class="layui-btn" id="modal-btn-cancal"></button>'+
    '<button class="layui-btn" id="modal-btn-submit"></button>';
    $('#modal-title').html('发货物资删除');
	$('#modal-body').html(str);
    $('#modal').modal('show'); //打开模态框
    $('#modal-btn-cancal').html('关闭');
    $('#modal-btn-submit').html('删除');
    $('#modal-btn-cancal').unbind('click').click(function () {
        $('#modal').modal('hide'); //隐藏模态框
	});

    $('#modal-btn-submit').unbind('click').click(function () {
         deleteAjax("delete_delivery_data",id,function () {
		 	 //回调函数,用于刷新
            var a = {'number':'test','code': 1};
            var jsr= JSON.stringify(a)
            getDeliveryMaterialsData(jsr);
         });
         $('#modal').modal('hide'); //隐藏模态框
	});
}



