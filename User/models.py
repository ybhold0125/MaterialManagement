from django.db import models


class Planner(models.Model):
    number = models.CharField(
        max_length=10,
        verbose_name='编号'
    )

    name = models.CharField(
        max_length=12,
        verbose_name='姓名'
    )

    phone = models.CharField(
        max_length=11,
        verbose_name='联系电话'
    )

    password = models.CharField(
        max_length=10,
        verbose_name='密码'
    )

    def __str__(self):
        return '%s' % self.number

    class Meta:
        verbose_name = '计划员信息'
        verbose_name_plural = verbose_name


class Buyer(models.Model):
    number = models.CharField(
        max_length=10,
        verbose_name='编号'
    )

    name = models.CharField(
        max_length=12,
        verbose_name='姓名'
    )

    phone = models.CharField(
        max_length=11,
        verbose_name='联系电话'
    )

    password = models.CharField(
        max_length=10,
        verbose_name='密码'
    )

    def __str__(self):
        return '%s' % self.number

    class Meta:
        verbose_name = '采购员信息'
        verbose_name_plural = verbose_name


class WarehouseManager(models.Model):
    number = models.CharField(
        max_length=10,
        verbose_name='编号'
    )

    name = models.CharField(
        max_length=12,
        verbose_name='姓名'
    )

    phone = models.CharField(
        max_length=11,
        verbose_name='联系电话'
    )

    password = models.CharField(
        max_length=10,
        verbose_name='密码'
    )

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = '仓储管理员信息'
        verbose_name_plural = verbose_name


class Supplier(models.Model):
    number = models.CharField(
        max_length=10,
        verbose_name='编号'
    )

    name = models.CharField(
        max_length=12,
        verbose_name='名称'
    )

    address = models.CharField(
        max_length=12,
        verbose_name='地址'
    )

    phone = models.CharField(
        max_length=11,
        verbose_name='联系电话'
    )

    score = models.CharField(
        max_length=1,
        verbose_name='评分'
    )

    password = models.CharField(
        max_length=10,
        verbose_name='密码'
    )

    def __str__(self):
        return '%s' % self.number

    class Meta:
        verbose_name = '供应商信息'
        verbose_name_plural = verbose_name

