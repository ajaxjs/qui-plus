import { h, ref, defineComponent, onMounted, onUnmounted, computed, nextTick, watch } from "vue";
import { formatOptions } from '../../utils/use-options.js';
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
BScroll.use(Wheel)

/**
 * 单列选择器
 * 滚动Wheel参考：https://better-scroll.github.io/docs/zh-CN/plugins/wheel.html
*/

export default defineComponent({
    name: "PickerView",
    props: {
        modelValue: {
            type: [String, Number, Object],
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        // 自定义选项值
        optionValue: String,
        // 自定义选项标签
        optionLabel: String,
        // 选项高度
        optionHeight: {
            type: String,
            default: '3em'
        },
        // 选项前缀
        optionPrefix: String,
        // 选项后缀
        optionSuffix: String,
        // 是否仅emit值
        emitValue: Boolean,
        // 行数量
        rowNumber: {
            type: Number,
            default: 5
        },
        // 隐藏遮罩
        hideMask: Boolean
    },
    setup(props, { emit, slots }) {
        const colRef = ref(null);
        // 滚动实例
        let bs = null;
        // 内部值
        const innerValue = ref(props.modelValue);
        // 是否仅emit值,如果option项都不是对象（即都是单值），那么默认返回值，否则参设置为准。
        const isEmitValue = computed(() => props.options.filter(vo=>typeof vo === 'object').length ? props.emitValue : true);
        watch(() => props.modelValue, (val) => {
            innerValue.value = val
        })
        // 格式化选项
        const options = computed(() => formatOptions(props.options));
        // 选项变化时，刷新
        watch(() => options.value, () => {
            nextTick(() => bs.refresh())
        })
        // 选中的索引
        const indexValue = computed(()=>getIndex(innerValue.value));

        // 读取Index值
        function getIndex(val) {
            const { emitValue } = props
            if (!val) return 0;
            const key = options.value.findIndex(vo => {
                return getValue(vo) == val ? val : getValue(val)
            })
            return key >= 0 ? key : 0;
        }

        // 读取Value值
        function getValue(item) {
            return item[props.optionValue || 'value']
        }
        // 更新值
        function updateValue(val, index) {
            innerValue.value = isEmitValue.value ? getValue(val) : val;
            emit('update:modelValue', innerValue.value, index);
        }

        function initScroll() {
            bs = new BScroll(colRef.value, {
                scrollX: false,
                scrollY: true,
                wheel: {
                    selectedIndex: indexValue.value,
                    wheelWrapperClass: 'kv-picker-inner',
                    wheelItemClass: 'kv-picker-item',
                    wheelDisabledItemClass: 'wheel-disabled-item',
                    probeType: 3,
                    rotate: 15,
                    // 当点击某一项的时候，滚动过去的动画时长。
                    adjustTime: 400,
                },
            })
            bs.on('wheelIndexChanged', (index) => {
                updateValue(options.value[index], index)
            })
            
            // 卸载时销毁
            onUnmounted(() => {
                bs.destroy();
            })
        }
        onMounted(initScroll)


        return () => {
            const { optionHeight, optionLabel, optionPrefix, optionSuffix, rowNumber, hideMask } = props
            // 选项
            const optionItems = options.value.map((vo, key) => {
                // 插槽参数
                const slotAttrs = { optionHeight, optionLabel, optionPrefix, optionSuffix, rowNumber, item: vo };
                // 渲染项
                const itemInner = slots['option-item'] ? slots['option-item'](slotAttrs) : [
                    optionPrefix ? h('div', { class: 'kv-picker-item__prefix ellipsis' }, optionPrefix) : null,
                    h('div', { class: 'kv-picker-item__label ellipsis' }, vo[optionLabel || 'label']),
                    optionSuffix ? h('div', { class: 'kv-picker-item__suffix ellipsis' }, optionSuffix) : null,
                ];

                return h('div', {
                    class: 'kv-picker-item row items-center justify-center',
                    style: {
                        height: optionHeight,
                    },
                }, itemInner);
            })

            function buildMask() {
                const heightNum = parseFloat(optionHeight);
                const maskSideStyl = {height: heightNum * (rowNumber - 1) / 2 + 'em'};
                return h('div', { class: 'kv-picker-mask no-pointer-events	absolute-full' }, [
                    h('div', { class: 'kv-picker-mask__top absolute-top', style: maskSideStyl }),
                    h('div', { class: 'kv-picker-mask__bottom absolute-bottom', style: maskSideStyl }),
                    h('div', {
                        class: 'kv-picker-mask__pointer absolute full-width',
                        style: { height: optionHeight, top: '50%', marginTop: `calc(-${optionHeight} * 0.5 - 1px)` }
                    }),
                ])
            }

            return h('div', {
                ref: colRef,
                class: 'kv-picker-view',
                style: {
                    height: `calc(${optionHeight} * ${rowNumber})`
                }
            }, [
                h('div', {
                    class: 'kv-picker-inner',
                    style: {
                        marginTop: `calc(${optionHeight} * ${Math.floor(rowNumber / 2)})`
                    }
                }, optionItems),
                // 遮罩
                hideMask ? null : buildMask(),
            ]);
        }
    }
})