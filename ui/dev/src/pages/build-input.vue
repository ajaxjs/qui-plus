<template>
  <q-page padding>
    <q-toggle v-model="attrs.labelAffix" label="label affix" />
    <q-toggle v-model="attrs.dense" label="dense" />
    <q-form class="q-gutter-md">
      <!-- 插槽 -->
      <build-input outlined v-bind="attrs" v-model="prms.input" label="带插槽" class="test1">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
        <template v-slot:after>
          <q-btn unelevated label="按扭" color="primary" />
        </template>
      </build-input>
      <!-- 普通文本 -->
      <build-input outlined v-bind="attrs" v-model="prms.input" label="用户名" class="test1" />
      <!-- 文件 -->
      <build-input outlined v-bind="attrs" v-model="prms.file" label="文件" type="file" />
      <!-- 选择框 -->
      <build-input outlined v-bind="attrs" v-model="prms.select1" label="选择框" type="select" :options="opts1" />
      <!-- 选择框 -->
      <build-input outlined v-bind="attrs" v-model="prms.select2" label="选择框" type="select" :options="opts2" />
      <build-input outlined v-bind="attrs" v-model="prms.radio" label="单选框" type="radio" :options="opts2" />
      <build-input outlined v-bind="attrs" v-model="prms.checkbox" label="多选框" type="checkbox" :options="opts2" />
      <build-input outlined v-bind="attrs" v-model="prms.toggle" label="多选框" type="toggle" :options="opts2" />
      <build-input outlined v-bind="attrs" v-model="prms.range" label="范围值" type="range" />
      <build-input outlined v-bind="attrs" v-model="prms.slider" label="滑块值" type="slider" />
      <build-input outlined v-bind="attrs" v-model="prms.date" label="日期" type="date" />
      <build-input outlined v-bind="attrs" v-model="prms.date" label="日期范围" type="date" range />
      <build-input outlined v-bind="attrs" v-model="prms.image" label="图片" type="image" />
      <build-input outlined v-bind="attrs" v-model="prms.img_base64" label="单图base64" type="image" base64 />
      <build-input outlined v-bind="attrs" v-model="prms.image2" label="多图片" type="image" multiple />
      <build-input outlined v-bind="attrs" v-model="prms.editor" label="内容编辑" type="editor" />
      
    </q-form>

    <div class="q-pa-sm">
      {{ prms }}
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'


const prms = ref({})
const opts1 = [
  { label: '请选择' },
  { label: '选项0', value: 0 },
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
const opts2 = ['项目1', '项目2', '项目3'];


const attrs = ref({
  labelAffix: false,
  dense: true,
  'onUpdate:modelValue': (v) => {
    console.log('onUpdate:modelValue',prms.value)
  }

});
</script>

<style lang="sass" scoped>
  .directive-target
    width: 50px
    height: 50px
  </style>