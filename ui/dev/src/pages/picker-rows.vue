<template>
    <q-page padding>
        <LanmuBox title="基础">
            <PickerRows v-model="pick" :rows="rows1" emit-value />
            <template v-slot:footer>
                {{ pick }}
            </template>
        </LanmuBox>

        <LanmuBox title="多级" class="q-mt-md">
            <PickerRows v-model="pick2" :rows="address" is-tree-data option-label="name" option-value="name" emit-value />
            <template v-slot:footer>
                <div>value：{{ pick2 }}</div>
            </template>
        </LanmuBox>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';
import address from 'src/components/address.json'

const pick = ref([])
const pick2 = ref()

const rows1 = ref([
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
])


</script>

<style lang="scss" scoped>

</style>