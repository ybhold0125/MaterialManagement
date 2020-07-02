from django.contrib import admin
from .models import MaterialPlan, PurchasedMaterial, StockMaterials, StorageMaterials, OutboundMaterials, ReturnedMaterials, DeliveryMaterials


@admin.register(MaterialPlan)
class MaterialPlanAdmin(admin.ModelAdmin):
    list_display = ('id', 'order_num', 'number', 'name', 'specification', 'count', 'price', 'totalPrice', 'buyer')


@admin.register(PurchasedMaterial)
class PurchasedMaterialAdmin(admin.ModelAdmin):
    list_display = ('id', 'order_num', 'number', 'name', 'specification', 'count', 'price', 'totalPrice', 'buyer')


@admin.register(StockMaterials)
class StockMaterialsAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'name', 'specification', 'price', 'supplier', 'count')


@admin.register(StorageMaterials)
class StorageMaterialsAdmin(admin.ModelAdmin):
    list_display = ('id', 'storage_num', 'number', 'name', 'storage_time', 'count', 'warehouseManager')


@admin.register(OutboundMaterials)
class OutboundMaterialsAdmin(admin.ModelAdmin):
    list_display = ('id', 'outbound_num', 'number', 'name', 'outbound_time', 'count', 'warehouseManager')


@admin.register(ReturnedMaterials)
class ReturnedMaterialsAdmin(admin.ModelAdmin):
    list_display = ('id', 'returned_num', 'number', 'name', 'returned_time', 'count', 'warehouseManager')


@admin.register(DeliveryMaterials)
class DeliveryMaterialsAdmin(admin.ModelAdmin):
    list_display = ('id', 'delivery_num', 'number', 'name',  'count', 'totalPrice', 'delivery_time', 'supplier')
