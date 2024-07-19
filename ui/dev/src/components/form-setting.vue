<template>
    <div>
        <q-toggle v-model="field.labelAffix" label="label affix" />
        <q-toggle v-model="field.dense" label="dense" />
        <q-toggle v-model="field.dark" label="dark" />
        <q-option-group inline emit-value v-model="formStyle" :options="inputStyles" type="radio" />
    </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';

const props = defineProps({
    modelValue: Object
})

const field = ref(props.modelValue || {});

const emit = defineEmits(['update:modelValue'])

function emitValue() {
    emit('update:modelValue', field)
}

// 字段样式
const formStyle = ref('standout');
const inputStyles = [
    { label: 'standout', value: 'standout' },
    { label: 'borderless', value: 'borderless' },
    { label: 'outlined', value: 'outlined' },
    { label: 'filled', value: 'filled' },
];
watch(() => formStyle.value, (key) => {
    console.log(key);
    inputStyles.forEach(({ value }) => {
        delete field.value[value]
    })
    field.value[key] = true
    emitValue()
})

</script>

<style lang="scss" scoped></style>