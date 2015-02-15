# -*- coding: utf-8 -*-
import scrapy
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors import LinkExtractor
from im_archive.items import Episode

class IMASpider(CrawlSpider):
    name = 'ima'
    allowed_domains = ['insertmoin.de']
    start_urls = ['http://insertmoin.de/im1189-framed/']

    rules = (
        Rule(LinkExtractor(restrict_xpaths='//a[@rel="prev"]', deny=('im1170', )), callback='parse_episode', follow=True),
    )

    def parse_episode(self, response):
        episode = Episode()
        episode['name'] = response.xpath('//title/text()').extract()[0]
        episode['file'] = response.css('a[href*=mp3]::attr(href)').extract()[0]
        return episode
