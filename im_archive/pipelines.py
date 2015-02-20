# -*- coding: utf-8 -*-
import cloudant
import uuid
import os

class ImArchivePipeline(object):
    def process_item(self, item, spider):
        USERNAME = os.environ['CLOUDANT_USERNAME']
        PASSWORD = os.environ['CLOUDANT_PASSWORD']
        ACCOUNT = os.environ['CLOUDANT_ACCOUNT']

        account = cloudant.Account(os.environ['ACCOUNT')

        login = account.login(USERNAME, PASSWORD)
        assert login.status_code == 200

        db = account.database('ima')
        id = str(uuid.uuid4())
        db[id] = { '_id': id, 'name': item['name'], 'file': item['file'] }
        return item
