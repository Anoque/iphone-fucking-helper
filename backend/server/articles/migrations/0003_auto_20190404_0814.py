# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-04-04 08:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_auto_20190404_0800'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='articlerelation',
            name='parent_id',
        ),
        migrations.AddField(
            model_name='articlerelation',
            name='parent',
            field=models.IntegerField(default=0, verbose_name=0),
            preserve_default=False,
        ),
    ]
