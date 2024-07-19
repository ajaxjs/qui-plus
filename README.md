<img src="https://img.shields.io/npm/v/quasar-ui-qui-plus.svg?label=quasar-ui-qui-plus">


Compatible with Quasar UI v2 and Vue 3.

# Structure
* [/ui](ui) - standalone npm package [Install and intro](ui)

# build-form 创建表单

更多内容请参考：https://quasar.dev/vue-components/form

| 参数         | 类型              | 说明                                                         |
| ------------ | ----------------- | ------------------------------------------------------------ |
| buttons      | array             | 提交按扭，默认：`['提交']`，可多个。支持`{label:'按扭'...}`或`h(QBtn,{...})` |
| btnWrapClass | Array, String     | 按钮包裹元素样式                                             |
| ajaxSubmit   | Boolean, Function | 是否异步提交，true= 用fetch异步提交，Function= Axios实例     |



```vue
<template>
  <q-page padding>

    <BuildForm v-model="prms" v-bind="formAttrs" />

  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const prms = ref({ name: '张三' });

// 字段
const fields = [
  { name: 'avatar', label: '头像', type: 'image', base64: true, wrapClass: 'row justify-center' },
  { name: 'name', label: '姓名' },
  {
    name: 'sex', label: '性别', type: 'radio',
    options: [{ label: '男生', value: '男' }, { label: '女生', value: '女' }]
  },
  { name: 'born', label: '生日', type: 'date' },
  { name: 'level', label: '级别', type: 'select', options: ['1级', '2级', '3级'] },
  {
    name: 'hobby', label: '爱好', type: 'checkbox',
    options: ['听音乐', '打蓝球', '看电影']
  },
  { name: 'intro', label: '简介', type: 'editor' },
];

const formAttrs = {
  fields,
  class: 'q-gutter-sm',
  buttons: ['立即提交', '重置'],
  btnWrapClass: 'row justify-center',
  labelAffix: true,
  outlined: true,
  action: 'https://api.qxtky.com/base/token',
  ajaxSubmit: true,
  onSubmit(e) {
    console.log(e);
  }
}
</script>



```



# build-field 创建字段






# License
MIT (c) ajaxjs <afenghy@qq.com>
