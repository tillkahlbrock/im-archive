# -*- coding: utf-8 -*-
import scrapy

class Episode(scrapy.Item):
    name = scrapy.Field()
    file = scrapy.Field()
