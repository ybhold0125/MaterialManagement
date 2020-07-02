# Generated by Django 3.0.6 on 2020-05-26 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Materials', '0004_auto_20200526_1619'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='materialplan',
            options={'verbose_name': '采购计划', 'verbose_name_plural': '采购计划'},
        ),
        migrations.AddField(
            model_name='materialplan',
            name='order_num',
            field=models.CharField(default=1, max_length=10, verbose_name='订单编号'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='materialplan',
            name='number',
            field=models.CharField(max_length=15, verbose_name='物资编号'),
        ),
    ]