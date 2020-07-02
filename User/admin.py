from django.contrib import admin
from .models import Planner, Buyer, WarehouseManager, Supplier


@admin.register(Planner)
class PlannerAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'name','phone')


@admin.register(Buyer)
class BuyerAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'name', 'phone')


@admin.register(WarehouseManager)
class WarehouseManagerAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'name', 'phone')


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'name', 'address', 'phone', 'score')