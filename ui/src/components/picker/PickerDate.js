import { defineComponent } from "vue";


export default defineComponent({
    name: "PickerDate",
    props: {
        modelValue: {
            type: [String, Number, Object],
            default: ''
        },
        ...dateAttrs
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        
        return ()=>{
            return h('div', {}, 'date')
        }
    }
})