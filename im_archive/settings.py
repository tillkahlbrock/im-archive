# -*- coding: utf-8 -*-

BOT_NAME = 'im_archive'

SPIDER_MODULES = ['im_archive.spiders']
NEWSPIDER_MODULE = 'im_archive.spiders'
ITEM_PIPELINES = { 'im_archive.pipelines.ImArchivePipeline': 100 }
