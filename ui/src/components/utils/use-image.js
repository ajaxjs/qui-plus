import { h, ref, defineComponent, watch } from "vue";
import { QImg, QBtn, QIcon, QAvatar, QDialog } from 'quasar';

const imgIcon = `img:data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-plus"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;

function stopEvent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
}
// 是否文件对象
function isFile(file) {
    return file instanceof File;
}

/**
 * 文件选择器
 * @param {*} opts 
 * @returns 
 */
export function filePicker(opts) {
    const fileElm = document.createElement('input');
    fileElm.type = 'file';
    fileElm.style.display = 'none';
    if (opts instanceof Object) {
        Object.keys(opts).forEach(key => {
            fileElm[key] = opts[key];
        })
    }
    document.body.appendChild(fileElm);
    fileElm.click();
    return new Promise((resolve) => {
        fileElm.addEventListener('change', (evt) => {
            const files = opts.multiple ? evt.target.files : evt.target.files[0];
            resolve(files);
            fileElm.remove();
        })
    });
}

export function imageToBase64(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}

const imageAttrs = {
    width: {
        type: [String, Number],
        default: '6em'
    },
    height: {
        type: [String, Number],
        default: '6em'
    },
    index: Number,
    // Name
    name: String,
    // 标题
    label: String,
    // 多文件
    multiple: Boolean,
    // 返回Base64
    base64: Boolean,
    // 最大文件数
    maxFile: Number,
}

const ImagePicker = defineComponent({
    name: "ImagePicker",
    props: {
        modelValue: {
            type: [String, Object],
            default: ''
        },
        ...imageAttrs
    },
    emits: ['update:modelValue', 'clear'],
    setup(props, { emit }) {
        const loading = ref(false);
        const preview = ref(initValue(props.modelValue));
        const imgVisib = ref(false)

        watch(() => props.modelValue, async (val) => {
            console.log('--watch---', val);
            if (val instanceof File) {
                loading.value = true
                imageToBase64(val).then(base64 => {
                    preview.value = base64
                }).finally(() => {
                    loading.value = false
                })
            } else {
                preview.value = val;
            }
        })
        function initValue(file) {
            if (file instanceof File) {
                loading.value = true
                imageToBase64(file).then(base64 => {
                    preview.value = base64
                }).finally(() => {
                    loading.value = false
                })
                return '';
            } else {
                return file;
            }
        }


        const emitValue = (base64, files) => {
            emit('update:modelValue', base64, files);
        }
        // 点击上传
        function onPicker(evt) {
            const { maxFile, multiple, base64: isBase64 } = props;
            if (preview.value) {
                imgVisib.value = true
                return;
            }

            filePicker({ accept: 'image/*', multiple }).then(files => {
                loading.value = true
                if (multiple) {
                    files = Array.from(files)
                    if (maxFile > 0) {
                        files = files.slice(0, maxFile)
                    }
                    Promise.all(files.map(file => imageToBase64(file))).then(base64s => {
                        emitValue(isBase64 ? base64s : files);
                    }).finally(() => {
                        loading.value = false
                    })
                } else {
                    imageToBase64(files).then(base64 => {
                        preview.value = base64
                        emitValue(isBase64 ? base64 : files);
                        //emitValue(base64, files);
                    }).finally(() => {
                        loading.value = false
                    })
                }
            });
            //stopEvent(evt);
        }
        // 点击移除
        function onRemove(evt) {
            preview.value = null
            emitValue(null);
            emit('clear');
            stopEvent(evt);
        }
        return () => {
            const { modelValue, ratio, name, multiple, index } = props;
            let { label, width, height } = props;
            const btnAttrs = {
                type: 'a',
                class: 'bg-grey-3',
                flat: true,
                dense: true,
                color: 'grey',
                loading: loading.value,
                onClick: onPicker
            }

            // 图片预览
            const imageElm = h(QImg, {
                src: preview.value,
                class: 'picker-image',
                rounded: true,
                width,
                height,
                ratio
            }, {
                default: () => [
                    preview.value ? null : h(QIcon, { name: imgIcon, class: 'add absolute-center' })
                ]
            })
            // 关闭按扭
            const closeBtnAttr = {
                icon: 'close', dense: true, size: 'sm', color: 'black', class: 'btn-delete absolute-top-right q-ma-xs'
            }
            // 标签名
            if (label && index > 0) {
                label = label + index;
            }

            return h('div', { class: 'image-picker-box relative-position' }, [
                h('div', { class: 'image-box relative-position' }, [
                    // 关闭按扭
                    preview.value ? h(QBtn, { ...closeBtnAttr, onClick: onRemove }) : null,
                    // 图片上传
                    h(QBtn, btnAttrs, { default: () => imageElm }),
                    // 隐藏域
                    name ? h('input', { name, multiple, type: isFile(modelValue) ? '' : 'hidden', value: modelValue, style: 'display:none' }) : null,
                ]),
                // 标签
                label ? h('label', { class: 'input-label ellipsis text-center', style: { width }, title: label }, label) : null,
                // 预览对话框
                h(QDialog, { class: 'img-preview-box', modelValue: imgVisib.value, onHide: () => imgVisib.value = false }, {
                    default: () => h(QImg, {
                        maxWidth: '100%',
                        maxHeight: '100%',
                        src: preview.value,
                    }, {
                        default: () => h(QBtn, { ...closeBtnAttr, onClick: () => imgVisib.value = false })
                    }),
                })
            ])
        }
    }
})

/**
 * 图片上传
 */
export const UploadImage = defineComponent({
    name: "UploadImage",
    props: {
        modelValue: {
            type: [String, Array, Object],
            default: ''
        },
        ...imageAttrs
    },
    emits: ['update:modelValue', 'input'],
    setup(props, { emit }) {

        function emitValue(base64) {
            emit('update:modelValue', base64);
        }

        return () => {
            const { multiple, modelValue } = props;
            // 默认图
            let image = h(ImagePicker, {
                ...props,
                modelValue: null,
                'onUpdate:modelValue': (base64, files) => {
                    if (multiple) {
                        emitValue((Array.isArray(modelValue) ? modelValue : []).concat(base64));
                    } else {
                        emitValue(base64);
                    }
                }
            });
            if (multiple) {
                const imgs = Array.isArray(modelValue) ? modelValue : [];
                image = (imgs).filter(vo => vo).map((url, key) => {
                    return h(ImagePicker, {
                        ...props,
                        index: key + 1,
                        multiple: false,
                        modelValue: url,
                        'onUpdate:modelValue': (base64) => {
                            modelValue[key] = base64;
                            emitValue(modelValue.filter(vo => vo));
                        }
                    });
                }).concat([image]);
            }
            return h('div', { class: 'image-wrap row q-gutter-sm' }, image)
        }
    }
})