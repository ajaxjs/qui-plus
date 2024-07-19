<template>
  <q-page padding>

    <BuildForm v-model="prms" v-bind="formAttrs" />
    <div style="width: 80vh; word-break: break-all;">--{{ prms }}--</div>

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
