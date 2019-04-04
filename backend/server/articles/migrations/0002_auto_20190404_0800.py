# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-04-04 08:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArticleRelation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.AlterField(
            model_name='article',
            name='date',
            field=models.DateTimeField(verbose_name=b'date published'),
        ),
        migrations.AddField(
            model_name='articlerelation',
            name='parent_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='articles.Article'),
        ),
    ]
