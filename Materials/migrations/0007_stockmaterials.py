# Generated by Django 3.0.6 on 2020-05-27 05:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0004_auto_20200522_1738'),
        ('Materials', '0006_auto_20200526_1724'),
    ]

    operations = [
        migrations.CreateModel(
            name='StockMaterials',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=15, verbose_name='物资编号')),
                ('name', models.CharField(max_length=10, verbose_name='物资名称')),
                ('specification', models.CharField(max_length=10, verbose_name='物资规格')),
                ('price', models.DecimalField(decimal_places=2, max_digits=12, verbose_name='单价')),
                ('count', models.IntegerField(verbose_name='库存量')),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='User.Supplier', verbose_name='物资供应商')),
            ],
            options={
                'verbose_name': '库存物资',
                'verbose_name_plural': '库存物资',
            },
        ),
    ]