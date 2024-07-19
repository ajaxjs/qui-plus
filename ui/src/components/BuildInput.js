import { h, ref  } from 'vue'
// import {QPopupProxy} from 'quasar'
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
        labelAffix: Boolean,
        // label宽度，labelAffix为true时有效
        labelCol: {
            type: Number,
            default: 3
        },
        // label样式
        labelClass: String,
        // label对齐方式
        labelAlign: {
            type: String,
            default: 'right',
            validator(val) {
                return ['left', 'right', 'center'].includes(val)
            }
        },
        // 输入框插槽: Object,
        slots: Object,
        wrapClass: [String, Array, Object],
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
        const { attrs } = ctx;
        const innerValue = ref(props.modelValue);

        return () => {
            const { labelAffix, labelCol, labelAlign, wrapClass } = props;
            let input = buildInput(innerValue, props, ctx);
            if (labelAffix) {
                input = [
                    h('label', { name: attrs.name, class: ['affix-label', 'col-' + labelCol, 'text-' + labelAlign] }, attrs.label),
                    h('div', { class: ['build-input col', wrapClass] }, input)
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
