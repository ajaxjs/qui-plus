<template>
    <q-page class="q-pa-md">
        <q-card flat bordered :dark="formAttrs.dark">
            <q-card-section>
                <q-toggle v-model="formAttrs.labelAffix" label="label affix" />
                <q-toggle v-model="formAttrs.dense" label="dense" />
                <q-toggle v-model="formAttrs.dark" label="dark" />
                <q-option-group inline emit-value v-model="formStyle" :options="inputStyles" type="radio" />
            </q-card-section>
            <q-separator />
            <q-card-section class="q-gutter-y-sm">
                <build-field v-model="prms" :fields="fields" v-bind="formAttrs" />
                <div>{{ prms }}</div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup>
import {watch, ref} from 'vue'

const prms = ref({})

// 表单设置
const formAttrs = ref({
  labelAffix: false,
  dense: false,
  dark: false,
  'onUpdate:modelValue': (v) => {
    console.log('onUpdate:modelValue',prms.value)
  }
});
// 字段
const fields = [
    { name: 'avatar', label: '头像', type: 'image', base64: true },
    { name: 'name', label: '姓名' },
    { name: 'sex', label: '性别', type: 'radio', options: ['男', '女'] },
    { name: 'born', label: '生日', type: 'date' },
    { name: 'level', label: '级别', type: 'select', options: ['1级', '2级', '3级'] },
    { name: 'hobby', label: '爱好', type: 'checkbox', options: ['听音乐', '打蓝球', '看电影'] },
    { name: 'intro', label: '简介', type: 'editor' },
];
// 字段样式
const formStyle = ref('standout');
const inputStyles = [
  {label: 'standout', value: 'standout'},
  {label: 'borderless', value: 'borderless'},
  {label: 'outlined', value: 'outlined'},
  {label: 'filled', value: 'filled'},
];
watch(()=>formStyle.value, (key)=>{
    console.log(key);
    inputStyles.forEach(({value})=>{
        delete formAttrs.value[value]
    })
    formAttrs.value[key] = true
})

</script>

<style lang="scss" scoped></style>