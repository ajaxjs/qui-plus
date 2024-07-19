import { h, defineComponent, ref } from "vue";
import BuildInput from "./BuildInput";

export default defineComponent({
    name: "BuildField",
    props: {
        modelValue: Object,
        fields: Array
    },
    emits: ['update:modelValue'],
    setup(props, { attrs, slots, emit }) {
        const innerValue = ref(props.modelValue || {});
        
        return () => {
            const fields = props.fields || [];
            return fields.filter(vo => vo).map(field => {
                const { name } = field;
                // 插槽处理
                Object.keys(slots).forEach(key => {
                    const keyrex = new RegExp(`^input-${name}-(\\w+)$`);
                    const mkey = key.match(keyrex);
                    if (mkey) {
                        field.slots = { ...field.slots, [mkey[1]]: slots[key] }
                    }
                })
                // 
                return h(BuildInput, {
                    modelValue: innerValue.value[name],
                    ...field,
                    ...attrs,
                    'onUpdate:modelValue': (val) => {
                        innerValue.value[name] = val;
                        emit('update:modelValue', innerValue.value)
                    }
                })
            })
        }
    }
})