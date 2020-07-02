from django.db import models
from User.models import Buyer, Supplier, WarehouseManager


class MaterialPlan(models.Model):
    order_num = models.CharField(
        max_length=10,
        verbose_name='订单编号'
    )

    number = models.CharField(
        max_length=15,
        verbose_name='物资编号'
    )

    name = models.CharField(
        max_length=10,
        verbose_name='物资名称'
    )

    specification = models.CharField(
        max_length=10,
        verbose_name='物资规格'
    )

    count = models.IntegerField(
        verbose_name='数量'
    )

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='单价'
    )

    totalPrice = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='总价'
    )

    buyer = models.ForeignKey(
        Buyer,
        on_delete=models.DO_NOTHING,
        verbose_name='采购员'
    )

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = '采购计划'
        verbose_name_plural = verbose_name


class PurchasedMaterial(models.Model):
    order_num = models.CharField(
        max_length=10,
        verbose_name='订单编号'
    )

    number = models.CharField(
        max_length=15,
        verbose_name='物资编号'
    )

    name = models.CharField(
        max_length=10,
        verbose_name='物资名称'
    )

    specification = models.CharField(
        max_length=10,
        verbose_name='物资规格'
    )

    count = models.IntegerField(
        verbose_name='数量'
    )

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='单价'
    )

    totalPrice = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='总价'
    )

    buyer = models.ForeignKey(
        Buyer,
        on_delete=models.DO_NOTHING,
        verbose_name='采购员'
    )

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = '已采购物资'
        verbose_name_plural = verbose_name


class StockMaterials(models.Model):
    number = models.CharField(
        max_length=15,
        verbose_name='物资编号'
    )

    name = models.CharField(
        max_length=10,
        verbose_name='物资名称'
    )

    specification = models.CharField(
        max_length=10,
        verbose_name='物资规格'
    )

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='单价'
    )

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.DO_NOTHING,
        verbose_name='物资供应商'
    )

    count = models.IntegerField(
        verbose_name='库存量'
    )

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = '库存物资'
        verbose_name_plural = verbose_name


class StorageMaterials(models.Model):
    storage_num = models.CharField(
        max_length=10,
        verbose_name='入库单编号'
    )

    number = models.CharField(
        max_length=15,
        verbose_name='物资编号'
    )

    name = models.CharField(
        max_length=10,
        verbose_name='物资名称'
    )

    storage_time = models.DateField(
        auto_now_add=True,
        verbose_name='入库时间'
    )

    count = models.IntegerField(
        verbose_name='入库物资量'
    )

    warehouseManager = models.ForeignKey(
        WarehouseManager,
        on_delete=models.DO_NOTHING,
        verbose_name='经办人'
    )

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = '入库物资'
        verbose_name_plural = verbose_name


class OutboundMaterials(models.Model):
    outbound_num = models.CharField(
        max_length=10,
        verbose_name='出库单编号'
    )

    number = models.CharField(
        max_length=15,
        verbose_name='物资编号'
    )

    name = models.CharField(
        max_length=10,
        verbose_name='物资名称'
    )

    outbound_time = models.DateField(
        auto_now_add=True,
        verbose_name='出库时间'
    )

    count = models.IntegerField(
        verbose_name='出库物资量'
    )

    warehouseManager = models.ForeignKey(
        WarehouseManager,
        on_delete=models.DO_NOTHING,
        verbose_name='经办人'
    )

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = '出库物资'
        verbose_name_plural = verbose_name


class ReturnedMaterials(models.Model):
    returned_num = models.CharField(
        max_length=10,
        verbose_name='退库单编号'
    )

    number = models.CharField(
        max_length=15,
        verbose_name='物资编号'
    )

    name = models.CharField(
        max_length=10,
        verbose_name='物资名称'
    )

    returned_time = models.DateField(
        auto_now_add=True,
        verbose_name='退库时间'
    )

    count = models.IntegerField(
        verbose_name='退库物资量'
    )

    warehouseManager = models.ForeignKey(
        WarehouseManager,
        on_delete=models.DO_NOTHING,
        verbose_name='经办人'
    )

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = '退库物资'
        verbose_name_plural = verbose_name


class DeliveryMaterials(models.Model):
    delivery_num = models.CharField(
        max_length=10,
        verbose_name='发货单编号'
    )

    number = models.CharField(
        max_length=15,
        verbose_name='物资编号'
    )

    name = models.CharField(
        max_length=10,
        verbose_name='物资名称'
    )

    count = models.IntegerField(
        verbose_name='物资数量'
    )

    totalPrice = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='总价'
    )

    delivery_time = models.DateField(
        auto_now_add=True,
        verbose_name='发货时间'
    )

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.DO_NOTHING,
        verbose_name='供应商名称'
    )

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = '发货物资'
        verbose_name_plural = verbose_name


