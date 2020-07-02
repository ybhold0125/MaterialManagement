from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from .models import MaterialPlan, PurchasedMaterial, StockMaterials, StorageMaterials, OutboundMaterials, ReturnedMaterials, DeliveryMaterials
from User.models import Buyer, Supplier, WarehouseManager
from django.core import serializers
from django.http import HttpResponse
import json


def main(request):
    a = request.session['code']
    if a:
        if a == '验证通过':
            position = request.session.get('position')
            id = request.session.get('id')
            return render(request, 'main.html', locals())
        else:
            return redirect('/')
    else:
        return redirect('/')


# 获取采购计划
@csrf_exempt
def get_plan_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        res = json.loads(a)
        res_jud = res['code']
        if res_jud == 1:
            plan = MaterialPlan.objects.all()
            plan_data = serializers.serialize('json', MaterialPlan.objects.all())
            plan_dic = json.loads(plan_data)
            i = 0
            for p in plan:
                buyer_number = p.buyer.number
                plan_dic[i]['fields']['buyer_number'] = buyer_number
                i = i + 1
        elif res_jud == 2:
            res_data = res['number']
            plan = MaterialPlan.objects.filter(order_num=res_data)
            plan_data = serializers.serialize('json', MaterialPlan.objects.filter(order_num=res_data))
            plan_dic = json.loads(plan_data)
            i = 0
            for p in plan:
                buyer_number = p.buyer.number
                plan_dic[i]['fields']['buyer_number'] = buyer_number
                i = i + 1
        else:
            res_data = res['number']
            buyer = Buyer.objects.get(number=res_data)
            plan = MaterialPlan.objects.filter(buyer=buyer)
            plan_data = serializers.serialize('json', MaterialPlan.objects.filter(buyer=buyer))
            plan_dic = json.loads(plan_data)
            i = 0
            for p in plan:
                buyer_number = p.buyer.number
                plan_dic[i]['fields']['buyer_number'] = buyer_number
                i = i + 1
        response_data = {'plan_list': plan_dic}
    return HttpResponse(json.dumps(response_data))


# 增加采购计划
@csrf_exempt
def add_plan_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        buyer_id = res_dic['buyer']
        buyer = Buyer.objects.get(id=buyer_id)
        res_dic['buyer'] = buyer
        MaterialPlan.objects.create(**res_dic)
        return HttpResponse('success')


# 修改采购计划
@csrf_exempt
def update_plan_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        plan = MaterialPlan.objects.filter(id=res_id)
        if plan:
            plan.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除采购计划
@csrf_exempt
def delete_plan_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        plan = MaterialPlan.objects.filter(id=res_id)
        if plan:
            plan.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 获取已采购订单
@csrf_exempt
def get_purchasedmaterial_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        res = json.loads(a)
        res_jud = res['code']
        if res_jud == 1:
            plan = PurchasedMaterial.objects.all()
            plan_data = serializers.serialize('json', PurchasedMaterial.objects.all())
            plan_dic = json.loads(plan_data)
            i = 0
            for p in plan:
                buyer_number = p.buyer.number
                plan_dic[i]['fields']['buyer_number'] = buyer_number
                i = i + 1
        elif res_jud == 2:
            res_data = res['number']
            plan = PurchasedMaterial.objects.filter(order_num=res_data)
            plan_data = serializers.serialize('json', PurchasedMaterial.objects.filter(order_num=res_data))
            plan_dic = json.loads(plan_data)
            i = 0
            for p in plan:
                buyer_number = p.buyer.number
                plan_dic[i]['fields']['buyer_number'] = buyer_number
                i = i + 1
        else:
            res_data = res['number']
            buyer = Buyer.objects.get(number=res_data)
            plan = PurchasedMaterial.objects.filter(buyer=buyer)
            plan_data = serializers.serialize('json', PurchasedMaterial.objects.filter(buyer=buyer))
            plan_dic = json.loads(plan_data)
            i = 0
            for p in plan:
                buyer_number = p.buyer.number
                plan_dic[i]['fields']['buyer_number'] = buyer_number
                i = i + 1
        response_data = {'plan_list': plan_dic}
    return HttpResponse(json.dumps(response_data))


# 增加已采购订单
@csrf_exempt
def add_purchasedmaterial_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        plan_id = res_dic['plan']
        plan = MaterialPlan.objects.get(id=plan_id)
        order_count = plan.count
        count = int(res_dic['count'])
        totalPrice = count * plan.price
        if count <= order_count:
            PurchasedMaterial.objects.create(
                order_num=plan.order_num,
                number=plan.number,
                name=plan.name,
                specification=plan.specification,
                count=count,
                price=plan.price,
                totalPrice=totalPrice,
                buyer=plan.buyer
            )
            return HttpResponse('success')
        else:
            return HttpResponse('failure')


# 修改已采购订单
@csrf_exempt
def update_purchasedmaterial_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        order_num = res_dic['order_num']
        pm = PurchasedMaterial.objects.filter(id=res_id)
        plan = MaterialPlan.objects.get(order_num=order_num)
        order_count = plan.count
        count = int(res_dic['count'])
        if count <= order_count:
            pm.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除已采购订单
@csrf_exempt
def delete_purchasedmaterial_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        plan = PurchasedMaterial.objects.filter(id=res_id)
        if plan:
            plan.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 获取库存物资
@csrf_exempt
def get_stock_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        res = json.loads(a)
        res_jud = res['code']
        if res_jud == 1:
            stock = StockMaterials.objects.all()
            stock_data = serializers.serialize('json', StockMaterials.objects.all())
            stock_dic = json.loads(stock_data)
            i = 0
            for s in stock:
                supplier_address = s.supplier.address
                stock_dic[i]['fields']['supplier_address'] = supplier_address
                i = i + 1
        elif res_jud == 2:
            res_data = res['number']
            stock = StockMaterials.objects.filter(number=res_data)
            stock_data = serializers.serialize('json', StockMaterials.objects.filter(number=res_data))
            stock_dic = json.loads(stock_data)
            i = 0
            for s in stock:
                supplier_address = s.supplier.address
                stock_dic[i]['fields']['supplier_address'] = supplier_address
                i = i + 1
        else:
            res_data = res['number']
            stock = StockMaterials.objects.filter(name=res_data)
            stock_data = serializers.serialize('json', StockMaterials.objects.filter(name=res_data))
            stock_dic = json.loads(stock_data)
            i = 0
            for s in stock:
                supplier_address = s.supplier.address
                stock_dic[i]['fields']['supplier_address'] = supplier_address
                i = i + 1
        response_data = {'stock_list': stock_dic}
    return HttpResponse(json.dumps(response_data))


# 增加库存物资
@csrf_exempt
def add_stock_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        supplier_id = res_dic['supplier']
        supplier = Supplier.objects.get(id=supplier_id)
        res_dic['supplier'] = supplier
        StockMaterials.objects.create(**res_dic)
        return HttpResponse('success')


# 修改库存物资
@csrf_exempt
def update_stock_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        stock = StockMaterials.objects.filter(id=res_id)
        if stock:
            stock.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除库存物资
@csrf_exempt
def delete_stock_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        stock = StockMaterials.objects.filter(id=res_id)
        if stock:
            stock.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 获取入库物资
@csrf_exempt
def get_storage_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        res = json.loads(a)
        res_jud = res['code']
        if res_jud == 1:
            storage = StorageMaterials.objects.all()
            storage_data = serializers.serialize('json', StorageMaterials.objects.all())
            storage_dic = json.loads(storage_data)
            i = 0
            for s in storage:
                warehouseManager_name = s.warehouseManager.name
                storage_dic[i]['fields']['warehouseManager_name'] = warehouseManager_name
                i = i + 1
        elif res_jud == 2:
            res_data = res['number']
            storage = StorageMaterials.objects.filter(storage_num=res_data)
            storage_data = serializers.serialize('json', StorageMaterials.objects.filter(storage_num=res_data))
            storage_dic = json.loads(storage_data)
            i = 0
            for s in storage:
                warehouseManager_name = s.warehouseManager.name
                storage_dic[i]['fields']['warehouseManager_name'] = warehouseManager_name
                i = i + 1
        else:
            res_data = res['number']
            storage = StorageMaterials.objects.filter(number=res_data)
            storage_data = serializers.serialize('json', StorageMaterials.objects.filter(number=res_data))
            storage_dic = json.loads(storage_data)
            i = 0
            for s in storage:
                warehouseManager_name = s.warehouseManager.name
                storage_dic[i]['fields']['warehouseManager_name'] = warehouseManager_name
                i = i + 1
        response_data = {'storage_list': storage_dic}
    return HttpResponse(json.dumps(response_data))


# 增加入库物资
@csrf_exempt
def add_storage_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        warehouseManager_id = res_dic['warehouseManager']
        warehouseManager = WarehouseManager.objects.get(id=warehouseManager_id)
        res_dic['warehouseManager'] = warehouseManager
        StorageMaterials.objects.create(**res_dic)
        return HttpResponse('success')


# 修改入库物资
@csrf_exempt
def update_storage_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        storage = StorageMaterials.objects.filter(id=res_id)
        if storage:
            storage.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除入库物资
@csrf_exempt
def delete_storage_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        stock = StorageMaterials.objects.filter(id=res_id)
        if stock:
            stock.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 获取出库物资
@csrf_exempt
def get_outbound_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        res = json.loads(a)
        res_jud = res['code']
        if res_jud == 1:
            outbound = OutboundMaterials.objects.all()
            outbound_data = serializers.serialize('json', OutboundMaterials.objects.all())
            outbound_dic = json.loads(outbound_data)
            i = 0
            for s in outbound:
                warehouseManager_name = s.warehouseManager.name
                outbound_dic[i]['fields']['warehouseManager_name'] = warehouseManager_name
                i = i + 1
        elif res_jud == 2:
            res_data = res['number']
            outbound = OutboundMaterials.objects.filter(outbound_num=res_data)
            outbound_data = serializers.serialize('json', OutboundMaterials.objects.filter(outbound_num=res_data))
            outbound_dic = json.loads(outbound_data)
            i = 0
            for s in outbound:
                warehouseManager_name = s.warehouseManager.name
                outbound_dic[i]['fields']['warehouseManager_name'] = warehouseManager_name
                i = i + 1
        else:
            res_data = res['number']
            outbound = OutboundMaterials.objects.filter(number=res_data)
            outbound_data = serializers.serialize('json', OutboundMaterials.objects.filter(number=res_data))
            outbound_dic = json.loads(outbound_data)
            i = 0
            for s in outbound:
                warehouseManager_name = s.warehouseManager.name
                outbound_dic[i]['fields']['warehouseManager_name'] = warehouseManager_name
                i = i + 1
        response_data = {'outbound_list': outbound_dic}
    return HttpResponse(json.dumps(response_data))


# 增加出库物资
@csrf_exempt
def add_outbound_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        count = int(res_dic['count'])
        name = res_dic['name']
        stock = StockMaterials.objects.get(name=name)
        stock_count = stock.count
        if count <= stock_count:
            warehouseManager_id = res_dic['warehouseManager']
            warehouseManager = WarehouseManager.objects.get(id=warehouseManager_id)
            res_dic['warehouseManager'] = warehouseManager
            OutboundMaterials.objects.create(**res_dic)
            return HttpResponse('success')
        else:
            return HttpResponse('failure')


# 修改出库物资
@csrf_exempt
def update_outbound_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        outbound = OutboundMaterials.objects.filter(id=res_id)
        count = int(res_dic['count'])
        name = res_dic['name']
        stock = StockMaterials.objects.get(name=name)
        stock_count = stock.count
        if count <= stock_count:
            outbound.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除出库物资
@csrf_exempt
def delete_outbound_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        outbound = OutboundMaterials.objects.filter(id=res_id)
        if outbound:
            outbound.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


#获取退库物资
@csrf_exempt
def get_returned_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        res = json.loads(a)
        res_jud = res['code']
        if res_jud == 1:
            returned = ReturnedMaterials.objects.all()
            returned_data = serializers.serialize('json', ReturnedMaterials.objects.all())
            returned_dic = json.loads(returned_data)
            i = 0
            for s in returned:
                warehouseManager_name = s.warehouseManager.name
                returned_dic[i]['fields']['warehouseManager_name'] = warehouseManager_name
                i = i + 1
        elif res_jud == 2:
            res_data = res['number']
            returned = ReturnedMaterials.objects.filter(returned_num=res_data)
            returned_data = serializers.serialize('json', ReturnedMaterials.objects.filter(returned_num=res_data))
            returned_dic = json.loads(returned_data)
            i = 0
            for s in returned:
                warehouseManager_name = s.warehouseManager.name
                returned_dic[i]['fields']['warehouseManager_name'] = warehouseManager_name
                i = i + 1
        else:
            res_data = res['number']
            returned = ReturnedMaterials.objects.filter(number=res_data)
            returned_data = serializers.serialize('json', ReturnedMaterials.objects.filter(number=res_data))
            returned_dic = json.loads(returned_data)
            i = 0
            for s in returned:
                warehouseManager_name = s.warehouseManager.name
                returned_dic[i]['fields']['warehouseManager_name'] = warehouseManager_name
                i = i + 1
        response_data = {'returned_list': returned_dic}
    return HttpResponse(json.dumps(response_data))


# 增加退库物资
@csrf_exempt
def add_returned_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        count = int(res_dic['count'])
        name = res_dic['name']
        outbound = OutboundMaterials.objects.get(name=name)
        outbound_count = outbound.count
        if count <= outbound_count:
            warehouseManager_id = res_dic['warehouseManager']
            warehouseManager = WarehouseManager.objects.get(id=warehouseManager_id)
            res_dic['warehouseManager'] = warehouseManager
            ReturnedMaterials.objects.create(**res_dic)
            return HttpResponse('success')
        else:
            return HttpResponse('failure')


# 修改退库物资
@csrf_exempt
def update_returned_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        returned = ReturnedMaterials.objects.filter(id=res_id)
        count = int(res_dic['count'])
        name = res_dic['name']
        outbound = OutboundMaterials.objects.get(name=name)
        outbound_count = outbound.count
        if count <= outbound_count:
            returned.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除退库物资
@csrf_exempt
def delete_returned_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        returned = ReturnedMaterials.objects.filter(id=res_id)
        if returned:
            returned.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 获取发货物资
@csrf_exempt
def get_delivery_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        res = json.loads(a)
        res_jud = res['code']
        if res_jud == 1:
            delivery = DeliveryMaterials.objects.all()
            delivery_data = serializers.serialize('json', DeliveryMaterials.objects.all())
            delivery_dic = json.loads(delivery_data)
            i = 0
            for s in delivery:
                supplier_name = s.supplier.name
                delivery_dic[i]['fields']['supplier_name'] = supplier_name
                i = i + 1
        else:
            res_data = res['number']
            delivery = DeliveryMaterials.objects.filter(delivery_num=res_data)
            delivery_data = serializers.serialize('json', DeliveryMaterials.objects.filter(delivery_num=res_data))
            delivery_dic = json.loads(delivery_data)
            i = 0
            for s in delivery:
                supplier_name = s.supplier.name
                delivery_dic[i]['fields']['supplier_name'] = supplier_name
                i = i + 1
        response_data = {'delivery_list': delivery_dic}
    return HttpResponse(json.dumps(response_data))


# 增加发货物资
@csrf_exempt
def add_delivery_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        supplier_id = res_dic['supplier']
        supplier = Supplier.objects.get(id=supplier_id)
        res_dic['supplier'] = supplier
        DeliveryMaterials.objects.create(**res_dic)
        return HttpResponse('success')


# 修改发货物资
@csrf_exempt
def update_delivery_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        delivery = DeliveryMaterials.objects.filter(id=res_id)
        if delivery:
            delivery.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除发货物资
@csrf_exempt
def delete_delivery_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        delivery = DeliveryMaterials.objects.filter(id=res_id)
        if delivery:
            delivery.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')

# 选择采购员
@csrf_exempt
def select_buyer(request):
    if request.method == 'POST':
        buyer_data = serializers.serialize('json', Buyer.objects.all())
        buyer_dic = json.loads(buyer_data)
        response_data = {'buyer_list':buyer_dic}
    return HttpResponse(json.dumps(response_data))


# 选择供应商
@csrf_exempt
def select_supplier(request):
    if request.method == 'POST':
        supplier_data = serializers.serialize('json', Supplier.objects.all())
        supplier_dic = json.loads(supplier_data)
        response_data = {'supplier_list':supplier_dic}
    return HttpResponse(json.dumps(response_data))


# 选择采购订单
@csrf_exempt
def select_plan(request):
    if request.method == 'POST':
        plan_data = serializers.serialize('json', MaterialPlan.objects.all())
        plan_dic = json.loads(plan_data)
        response_data = {'plan_list':plan_dic}
    return HttpResponse(json.dumps(response_data))


# 选择仓储管理员
@csrf_exempt
def select_warehouseManager(request):
    if request.method == 'POST':
        manager_data = serializers.serialize('json', WarehouseManager.objects.all())
        manager_dic = json.loads(manager_data)
        response_data = {'manager_list':manager_dic}
    return HttpResponse(json.dumps(response_data))


# 选择仓储管理员
@csrf_exempt
def select_warehouseManager(request):
    if request.method == 'POST':
        manager_data = serializers.serialize('json', WarehouseManager.objects.all())
        manager_dic = json.loads(manager_data)
        response_data = {'manager_list':manager_dic}
    return HttpResponse(json.dumps(response_data))


