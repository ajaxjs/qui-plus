import { h, defineComponent, ref } from "vue";
import BuildInput from "./BuildInput";

export default defineComponent({
    name: "BuildField",
    props: {
        modelValue: Object,
        fields: Array
    },
    emits: ['update:modelValue'],
    setup(props, {attrs,emit}) {
        const innerValue = ref(props.modelValue);

        return () => {
            const { fields } = props
            return fields.filter(vo => vo).map(field => {
                return h(BuildInput, {
                    modelValue: innerValue.value[field.name], 
                    ...field, 
                    ...attrs,
                    'onUpdate:modelValue': (val) => {
                        innerValue.value[field.name] = val;
                        emit('update:modelValue', innerValue.value)
                    }
                })
            })
        }
    }
})