from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import HttpResponse, JsonResponse
import json
from django.contrib.auth.models import User
from .models import Planner, Buyer, WarehouseManager, Supplier


def index(request):

    return render(request,'login.html')


def manager(request):
    a = request.session['code']
    if a:
        if a == '管理员验证通过':
            return render(request, 'manager.html')
        else:
            return redirect('/')
    else:
        return redirect('/')


# 登录
@csrf_exempt
def login(request):
    if request.method == 'POST':
        result = {}
        username = request.POST.get('username')
        password = request.POST.get('password')
        position = request.POST.get('position')
        request.session.set_expiry(0)
        if position == '0':
            user = Planner.objects.filter(number=username, password=password)
            if user:
                request.session['code'] = '验证通过'
                request.session['id'] = user[0].id
                request.session['position'] = position
                result['code'] = '验证通过'
                result['data'] = 'main'
            else:
                result['code'] = '验证不通过'

        if position == '1':
            user = Buyer.objects.filter(number=username, password=password)
            if user:
                request.session['code'] = '验证通过'
                request.session['id'] = user[0].id
                request.session['position'] = position
                result['code'] = '验证通过'
                result['data'] = 'main'
            else:
                result['code'] = '验证不通过'

        if position == '2':
            user = WarehouseManager.objects.filter(number=username, password=password)
            if user:
                request.session['code'] = '验证通过'
                request.session['id'] = user[0].id
                request.session['position'] = position
                result['code'] = '验证通过'
                result['data'] = 'main'
            else:
                result['code'] = '验证不通过'

        if position == '3':
            user = Supplier.objects.filter(number=username, password=password)
            if user:
                request.session['code'] = '验证通过'
                request.session['id'] = user[0].id
                request.session['position'] = position
                result['code'] = '验证通过'
                result['data'] = 'main'
            else:
                result['code'] = '验证不通过'

        if position == '4':
            user = User.objects.filter(username=username)
            if user:
                if user[0].check_password(password):
                    request.session['code'] = '管理员验证通过'
                    result['code'] = '管理员验证通过'
                    result['data'] = 'manager'
                else:
                    result['code'] = '验证不通过'
            else:
                result['code'] = '验证不通过'
    return JsonResponse(result)


# 登出
@csrf_exempt
def logout(request):
    if request.method == 'POST':
        result = {}
        request.session['code'] = '未登录'
        result['data'] = '/'
    return JsonResponse(result)

# 修改密码
@csrf_exempt
def modify_password(request):
    if request.method == 'POST':
        res = request.POST.get('psr')
        res_dic = json.loads(res)
        position = res_dic['position']
        password = res_dic['password']
        id = res_dic['id']
        if position == 0:
            t = Planner.objects.filter(id=id)
            t.update(password=password)
        if position == 1:
            t = Buyer.objects.filter(id=id)
            t.update(password=password)
        if position == 2:
            t = WarehouseManager.objects.filter(id=id)
            t.update(password=password)
        if position == 3:
            t = Supplier.objects.filter(id=id)
            t.update(password=password)
    return HttpResponse('success')

# 获取计划员数据
@csrf_exempt
def get_planner_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        if a == 'test':
            planer = Planner.objects.all()
            planer_data = serializers.serialize('json', Planner.objects.all())
            planer_dic = json.loads(planer_data)
        else:
            planer_data = serializers.serialize('json', Planner.objects.filter(number=a))
            planer_dic = json.loads(planer_data)
        response_data = {'planner_list': planer_dic}
    return HttpResponse(json.dumps(response_data))


# 增加计划员数据
@csrf_exempt
def add_planner_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        Planner.objects.create(**res_dic)
        return HttpResponse('success')


# 修改计划员数据
@csrf_exempt
def update_planner_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        planner = Planner.objects.filter(id=res_id)
        if planner:
            planner.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除计划员数据
@csrf_exempt
def delete_planner_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        planner = Planner.objects.filter(id=res_id)
        if planner:
            planner.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 初始化计划员数据
@csrf_exempt
def initialize_planner_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        planner = Planner.objects.filter(id=res_id)
        number = planner[0].number
        if planner:
            planner.update(password=number)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 获取采购员数据
@csrf_exempt
def get_buyer_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        if a == 'test':
            buyer_data = serializers.serialize('json', Buyer.objects.all())
            buyer_dic = json.loads(buyer_data)
        else:
            buyer_data = serializers.serialize('json', Buyer.objects.filter(number=a))
            buyer_dic = json.loads(buyer_data)
        response_data = {'buyer_list':buyer_dic}
    return HttpResponse(json.dumps(response_data))


# 增加采购员数据
@csrf_exempt
def add_buyer_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        Buyer.objects.create(**res_dic)
        return HttpResponse('success')


# 修改采购员数据
@csrf_exempt
def update_buyer_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        buyer = Buyer.objects.filter(id=res_id)
        if buyer:
            buyer.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除采购员数据
@csrf_exempt
def delete_buyer_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        buyer = Buyer.objects.filter(id=res_id)
        if buyer:
            buyer.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 初始化采购员数据
@csrf_exempt
def initialize_buyer_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        buyer = Buyer.objects.filter(id=res_id)
        number = buyer[0].number
        if buyer:
            buyer.update(password=number)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 获取仓储管理员数据
@csrf_exempt
def get_warehousemanager_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        if a == 'test':
            warehousemanager_data = serializers.serialize('json', WarehouseManager.objects.all())
            warehousemanager_dic = json.loads(warehousemanager_data)
        else:
            warehousemanager_data = serializers.serialize('json', WarehouseManager.objects.filter(number=a))
            warehousemanager_dic = json.loads(warehousemanager_data)
        response_data = {'warehousemanager_list':warehousemanager_dic}
    return HttpResponse(json.dumps(response_data))


# 增加仓储管理员数据
@csrf_exempt
def add_warehousemanager_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        WarehouseManager.objects.create(**res_dic)
        return HttpResponse('success')


# 修改仓储管理员数据
@csrf_exempt
def update_warehousemanager_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        warehousemanager = WarehouseManager.objects.filter(id=res_id)
        if warehousemanager:
            warehousemanager.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除仓储管理员数据
@csrf_exempt
def delete_warehousemanager_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        warehousemanager = WarehouseManager.objects.filter(id=res_id)
        if warehousemanager:
            warehousemanager.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 初始化仓储管理员数据
@csrf_exempt
def initialize_warehousemanager_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        warehousemanager = WarehouseManager.objects.filter(id=res_id)
        number = warehousemanager[0].number
        if warehousemanager:
            warehousemanager.update(password=number)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 获取供应商数据
@csrf_exempt
def get_supplier_data(request):
    if request.method == 'POST':
        a = request.POST.get('psr')
        if a == 'test':
            supplier_data = serializers.serialize('json', Supplier.objects.all())
            supplier_dic = json.loads(supplier_data)
        else:
            supplier_data = serializers.serialize('json', Supplier.objects.filter(number=a))
            supplier_dic = json.loads(supplier_data)
        response_data = {'supplier_list':supplier_dic}
    return HttpResponse(json.dumps(response_data))


# 增加供应商数据
@csrf_exempt
def add_supplier_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        Supplier.objects.create(**res_dic)
        return HttpResponse('success')


# 修改供应商数据
@csrf_exempt
def update_supplier_data(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        res_dic = json.loads(res)
        res_id = res_dic['id']
        supplier = Supplier.objects.filter(id=res_id)
        if supplier:
            supplier.update(**res_dic)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 删除供应商数据
@csrf_exempt
def delete_supplier_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        supplier = Supplier.objects.filter(id=res_id)
        if supplier:
            supplier.delete()
        else:
            return HttpResponse('failure')
        return HttpResponse('success')


# 初始化供应商数据
@csrf_exempt
def initialize_supplier_data(request):
    if request.method == 'POST':
        res_id = request.POST.get('id')
        supplier = Supplier.objects.filter(id=res_id)
        number = supplier[0].number
        if supplier:
            supplier.update(password=number)
        else:
            return HttpResponse('failure')
        return HttpResponse('success')





