import { h } from 'vue'
import { QField, QInput, QFile, QSelect, QOptionGroup, QSlider, QRange, QDate, QPopupProxy, QEditor } from 'quasar'
import { UploadImage } from './use-image'

/**
 * 格式化选项
 * @param {Array} opts 
 * @returns []
 */
export function formatOptions(opts) {
    if (opts instanceof Array) {
        return opts.map(vo => vo instanceof Object ? vo : ({ label: vo, value: vo }))
    } else if (opts instanceof Object) {
        return Object.entries(opts).map(([label, value]) => ({ label, value }))
    } else {
        return []
    }
}

function dateRangeToStr(range) {
    if (typeof range === 'string') {
        return range;
    } else if (range instanceof Object) {
        return `${range.from}~${range.to}`;
    }
    return null;
}

// 输入包裹
function buildField(attr, input, slots) {
    const { label, ...wrapAttr } = attr
    const labClass = 'text-subtitle1 no-pointer-events ellipsis';
    const fieldPrepend = { ...slots, control: () => input };
    if (label) {
        fieldPrepend.prepend = () => h('div', { class: labClass }, label)
    }

    return h(QField, { ...wrapAttr }, fieldPrepend)
}

/**
 * 构建输入框
 * @param {*} props 
 * @param {*} ctx 
 * @returns 
 */
export function buildInput(innerValue, props, ctx) {
    const { slots, emit } = ctx;
    const { labelAffix } = props;
    // props传入的插槽
    const propSlots = props.slots instanceof Object ? props.slots : { default: props.slots }

    const inputSlots = {
        ...slots,
        ...propSlots
    }
    // 更新值
    function emitValue(val) {
        innerValue.value = val;
        emit('update:modelValue', val);
    }
    // 属性
    const attrs = {
        modelValue: innerValue.value,
        ...ctx.attrs,
        'onUpdate:modelValue': emitValue
    };

    const { type, label } = attrs;
    if (labelAffix) {
        delete attrs.label;
        if ((!type || ['input'].includes(type)) && !attrs.placeholder) {
            attrs.placeholder = '请输入' + label;
        }
    }

    let input = null;
    // 输入框
    switch (type) {
        case 'select':
            const options = formatOptions(attrs.options);
            const displayValue = options.filter(vo => vo.value === (attrs.modelValue))[0];
            input = h(QSelect, {
                emitValue: true,
                displayValue: displayValue ? displayValue[attrs.optionLabel || 'label'] : null,
                ...attrs,
                options,
            }, inputSlots);
            break;

        case 'checkbox':
        case 'toggle':
            attrs.modelValue = attrs.modelValue || [];
        case 'radio':
            attrs.options = formatOptions(attrs.options);
            input = buildField(attrs, h(QOptionGroup, { inline: true, ...attrs }, inputSlots));
            break;

        case 'range':
            const { label, ...rangeAttrs } = attrs
            const range = h(QRange, {
                min: 0,
                max: 100,
                ...rangeAttrs,
                modelValue: innerValue.value || { min: 20, max: 80 }
            }, inputSlots);
            input = buildField(attrs, h('div', { class: 'col q-mx-sm' }, range), inputSlots);
            break;
        case 'slider':
            const { label: sliderLabel, ...slideAttrs } = attrs;
            const slider = h(QSlider, {
                min: 0,
                max: 100,
                label: true,
                ...slideAttrs,
                modelValue: innerValue.value || 50
            }, inputSlots);
            input = buildField(attrs, h('div', { class: 'col q-mx-sm' }, slider), inputSlots);
            break;

        case 'date':
            const dateInput = h(QDate, {
                mask: 'YYYY-MM-DD',
                todayBtn: true,
                ...attrs,
                modelValue: innerValue.value || null
            });
            input = buildField(attrs, [
                dateRangeToStr(innerValue.value),
                h(QPopupProxy, {}, { default: () => dateInput })
            ], inputSlots)
            break;

        case 'file':
            input = h(QFile, { ...attrs, modelValue: innerValue.value || null }, inputSlots);
            break;

        case 'image':
            input = h(UploadImage, { ...attrs, modelValue: innerValue.value || null }, inputSlots);
            break;

        case 'editor':
            input = h('div', {}, [
                attrs.label ? h('label', { class: 'input-label' }, attrs.label) : null,
                h(QEditor, { ...attrs, modelValue: innerValue.value }, inputSlots)
            ]);
            break;

        default:
            input = h(QInput, attrs, inputSlots);
            break;
    }
    return input;
}