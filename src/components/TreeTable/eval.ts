/**
* @Author: jianglei
* @Date:   2017-10-12 12:06:49
*/


import Vue from 'vue';

export default function treeToArray<T>(data: T[], expandAll: any, parent?: any, level?: number): T[] {
  let tmp: T[] = [];
  Array.from(data).forEach(function(record: any) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll);
    }
    let _level = 1;
    if (level) {
      _level = level + 1;
    }
    Vue.set(record, '_level', _level);
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent);
    }
    tmp.push(record);
    if (record.children && record.children.length > 0) {
      const children = treeToArray<T>(record.children, expandAll, record, _level);
      tmp = tmp.concat(children);
    }
  });
  return tmp;
}
