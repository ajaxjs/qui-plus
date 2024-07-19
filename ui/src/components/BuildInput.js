import { h, ref, resolveDirective } from 'vue'
import {QPopupProxy} from 'quasar'
import { buildInput } from './utils/use-input'

export default {
    name: 'BuildInput',
    // 禁止默认继承属性
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        labelCol: {
            type: Number,
            default: 3
        },
        labelAffix: Boolean,
        labelClass: String,
        labelAlign: {
            type: String,
            default: 'right',
            validator(val) {
                return ['left', 'right', 'center'].includes(val)
            }
        }
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
        const { attrs, solts, emit } = ctx;
        const innerValue = ref(props.modelValue);

        return () => {
            const { labelAffix, labelCol, labelAlign } = props;
            let input = buildInput(innerValue, props, ctx);
            if (labelAffix) {
                input = [
                    h('label', { name: attrs.name, class: ['affix-label', 'col-' + labelCol, 'text-' + labelAlign] }, attrs.label),
                    h('div', { class: 'build-input col' }, input)
                ]
            }

            return h('div', {
                class: [
                    'build-input-item', 
                    labelAffix ? 'row items-center' : '',
                    attrs.dark ? 'q-field--dark' : '',
                ]
            }, input);
        }
    }
}
