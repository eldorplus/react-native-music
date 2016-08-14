/**
 * 使用realm作为本机持久存储层
 * 这里定义各种需要的表(schema)和属性(properties)
 *
 * 所有子键id均使用十一位数
 */
'use strict';
import Realm from 'realm';

/**
 * 用户搜索历史
 * @type {{}}
 */
const HistorySearchSchema = {
    name: "HistorySearch",
    primaryKey: 'id',
    properties: {
        id: 'string',
        word: 'string',
        create_time: 'string'
    }
}


const realm = new Realm({
    schema: [HistorySearchSchema],
    schemaVersion: 1,
    //migration: function (oldRealm, newRealm) {
    //    if (oldRealm.schemaVersion < 1) {
    //        var oldObjects = oldRealm.objects('HistorySearch'),
    //            newObjects = newRealm.objects('HistorySearch');
    //        for (let i = 0; i < oldObjects.length; i++) {
    //            newObjects[i]['id'] = oldObjects[i]['id']+'';
    //            newObjects[i]['create_time'] = oldObjects[i]['create_time']+'';
    //        }
    //    }
    //}
});

export default realm;