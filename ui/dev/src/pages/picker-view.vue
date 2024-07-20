<template>
    <q-page padding>
        <q-card flat bordered>
            <div class="text-h6 q-pa-sm">基础</div>
            <q-separator />
            <Picker-View v-model="pick1" v-bind="pickerViewAttrs" />
            <q-separator />
            <div class="row items-center q-pa-sm q-gutter-x-sm">
                <div>
                    <q-toggle v-model="pickerViewAttrs.emitValue" label="仅值" />
                </div>
                <q-separator vertical />
                <div>value: {{ pick1 }}</div>
            </div>
        </q-card>
        <q-btn label="添加项" @click="hobbys.unshift({ label: '游泳'+hobbys.length, value: hobbys.length })" />

        <q-card flat bordered class="q-mt-md">
            <div class="text-h6 q-pa-sm">插槽</div>
            <q-separator />
            <Picker-View v-model="pick1" v-bind="pickerViewAttrs">
                <template v-slot:option-item="{item}">
                    <div>{{ item.label }} - ☀️</div>
                </template>
            </Picker-View>
            <q-separator />
            <div class="row items-center q-pa-sm q-gutter-x-sm">
                <div>
                    <q-toggle v-model="pickerViewAttrs.emitValue" label="仅值" />
                </div>
                <q-separator vertical />
                <div>value: {{ pick1 }}</div>
            </div>
        </q-card>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';
const hobbys = ref([
    { label: '听音乐', value: 1 },
    { label: '打蓝球', value: 2 },
    { label: '看电影', value: 3 },
    { label: '玩游戏', value: 4 },
    { label: '搞搞阵', value: 5 },
    { label: '看电视', value: 6 },
    { label: '打豆豆', value: 7 },
    { label: '看书仔', value: 8 },
]);

const pick1 = ref()

const pickerViewAttrs = ref({
    options: hobbys,
    emitValue: false,
    optionPrefix: '我要-',
    optionSuffix: '-项',
})
</script>

<style lang="scss" scoped></style>