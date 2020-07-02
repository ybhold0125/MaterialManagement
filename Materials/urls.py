from django.urls import path
from . import views


urlpatterns = [
    path('main', views.main, name='main'),
    path('get_plan_data', views.get_plan_data, name='get_plan_data'),
    path('add_plan_data', views.add_plan_data, name='add_plan_data'),
    path('update_plan_data', views.update_plan_data, name='update_plan_data'),
    path('delete_plan_data', views.delete_plan_data, name='delete_plan_data'),

    path('get_purchasedmaterial_data', views.get_purchasedmaterial_data, name='get_purchasedmaterial_data'),
    path('add_purchasedmaterial_data', views.add_purchasedmaterial_data, name='add_purchasedmaterial_data'),
    path('update_purchasedmaterial_data', views.update_purchasedmaterial_data, name='update_purchasedmaterial_data'),
    path('delete_purchasedmaterial_data', views.delete_purchasedmaterial_data, name='delete_purchasedmaterial_data'),

    path('get_stock_data', views.get_stock_data, name='get_stock_data'),
    path('add_stock_data', views.add_stock_data, name='add_stock_data'),
    path('update_stock_data', views.update_stock_data, name='update_stock_data'),
    path('delete_stock_data', views.delete_stock_data, name='delete_stock_data'),

    path('get_storage_data', views.get_storage_data, name='get_storage_data'),
    path('add_storage_data', views.add_storage_data, name='add_storage_data'),
    path('update_storage_data', views.update_storage_data, name='update_storage_data'),
    path('delete_storage_data', views.delete_storage_data, name='delete_storage_data'),

    path('get_outbound_data', views.get_outbound_data, name='get_outbound_data'),
    path('add_outbound_data', views.add_outbound_data, name='add_outbound_data'),
    path('update_outbound_data', views.update_outbound_data, name='update_outbound_data'),
    path('delete_outbound_data', views.delete_outbound_data, name='delete_outbound_data'),

    path('get_returned_data', views.get_returned_data, name='get_returned_data'),
    path('add_returned_data', views.add_returned_data, name='add_returned_data'),
    path('update_returned_data', views.update_returned_data, name='update_returned_data'),
    path('delete_returned_data', views.delete_returned_data, name='delete_returned_data'),

    path('get_delivery_data', views.get_delivery_data, name='get_delivery_data'),
    path('add_delivery_data', views.add_delivery_data, name='add_delivery_data'),
    path('update_delivery_data', views.update_delivery_data, name='update_deliverydata'),
    path('delete_delivery_data', views.delete_delivery_data, name='delete_delivery_data'),


    path('select_buyer', views.select_buyer, name='select_buyer'),
    path('select_supplier', views.select_supplier, name='select_supplier'),
    path('select_plan', views.select_plan, name='select_plan'),
    path('select_warehouseManager', views.select_warehouseManager, name='select_warehouseManager'),
]
