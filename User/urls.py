from django.urls import path
from . import views



urlpatterns = [
    path('', views.index, name='index'),

    path('manager', views.manager, name='manager'),

    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('modify_password', views.modify_password, name='modify_password'),


    path('get_planner_data', views.get_planner_data, name='get_planner_data'),
    path('add_planner_data', views.add_planner_data, name='add_planner_data'),
    path('update_planner_data', views.update_planner_data, name='update_planner_data'),
    path('delete_planner_data', views.delete_planner_data, name='delete_planner_data'),
    path('initialize_planner_data', views.initialize_planner_data, name='initialize_planner_data'),

    path('get_buyer_data', views.get_buyer_data, name='get_buyer_data'),
    path('add_buyer_data', views.add_buyer_data, name='add_buyer_data'),
    path('update_buyer_data', views.update_buyer_data, name='update_buyer_data'),
    path('delete_buyer_data', views.delete_buyer_data, name='delete_buyer_data'),
    path('initialize_buyer_data', views.initialize_buyer_data, name='initialize_buyer_data'),

    path('get_warehousemanager_data', views.get_warehousemanager_data, name='get_warehousemanager_data'),
    path('add_warehousemanager_data', views.add_warehousemanager_data, name='add_warehousemanager_data'),
    path('update_warehousemanager_data', views.update_warehousemanager_data, name='update_warehousemanager_data'),
    path('delete_warehousemanager_data', views.delete_warehousemanager_data, name='delete_warehousemanager_data'),
    path('initialize_warehousemanager_data', views.initialize_warehousemanager_data, name='initialize_warehousemanager_data'),

    path('get_supplier_data', views.get_supplier_data, name='get_supplier_data'),
    path('add_supplier_data', views.add_supplier_data, name='add_supplier_data'),
    path('update_supplier_data', views.update_supplier_data, name='update_supplier_data'),
    path('delete_supplier_data', views.delete_supplier_data, name='delete_supplier_data'),
    path('initialize_supplier_data', views.initialize_supplier_data, name='initialize_supplier_data'),


]
