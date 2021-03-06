# Generated by Django 3.0.6 on 2020-05-22 01:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MaterialInventory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('DMLWZMC', models.CharField(max_length=10, verbose_name='电力物资编号')),
                ('DLWZLC', models.CharField(max_length=10, verbose_name='电力物资名称')),
                ('money', models.DecimalField(decimal_places=2, max_digits=12, verbose_name='金额')),
                ('count', models.IntegerField(verbose_name='数量')),
            ],
        ),
    ]
