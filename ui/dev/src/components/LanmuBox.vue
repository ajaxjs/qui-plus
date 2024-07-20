<template>
    <q-card>
        <template v-if="title">
            <div class="row q-pa-sm text-h6">{{ title }}</div>
            <q-separator />
        </template>
        <div class="q-pa-sm">
            <div><slot /></div>
        </div>
        <template v-if="$slots.footer">
            <q-separator />
            <div class="row q-pa-sm">
                <slot name="footer" />
            </div>
        </template>
    </q-card>
</template>

<script setup>
const props = defineProps({
    title: String,
})
</script>

<style lang="scss" scoped></style>