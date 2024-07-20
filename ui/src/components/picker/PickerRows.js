import { h, ref, defineComponent, computed } from "vue"
import PickerView from "./PickerView"

export default defineComponent({
    name: "PickerRows",
    props: {
        modelValue: {
            type: Array,
            default: []
        },
        // 列数据，二维数组
        rows: {
            type: Array,
            default: []
        },
        // 列数
        rowNum: Number,
        // 是否树形结构
        isTreeData: Boolean,
        // 下级数据name
        childKey: {
            type: [String, Array],
            default: 'children'
        },
        prefix: String,
        suffix: String,
    },
    emits: ['update:modelValue'],
    setup(props, { emit, attrs }) {
        // 选中的值
        const innerValue = ref([...props.modelValue]);
        const indexValue = ref([]);
        // 格式化后的数据
        const rowOpts = computed(() => {
            const { rowNum } = props;
            let rowArr = props.isTreeData ? formatTree() : formatRows();
            // 行数不足时，补齐
            const rowLen = rowArr.length;
            if (rowLen > rowNum) {
                rowArr = rowArr.slice(0, rowNum);
            } else if (rowLen < rowNum) {
                rowArr = rowArr.concat(new Array(rowNum - rowLen).fill([]))
            }
            return rowArr;
        });
        const rowNum = computed(() => props.rowNum || rowOpts.value.length);

        // 格式化树
        function formatTree() {
            const { rows, childKey } = props;
            let result = [];
            function recurse(node) {
                let level = result.length;
                const item = node.map(vo => {
                    vo = { ...vo }
                    delete vo[childKey]
                    return vo;
                })
                result.push(item)
                const child = node.find(vo => getItemValue(vo) == innerValue.value[level]) || node[0];
                if (child[childKey]) {
                    recurse(child[childKey])
                }
            }
            recurse(rows)

            return result
        }
        // 格式化列数据
        function formatRows() {
            return props.rows;
        }

        // 获取值
        function getItemValue(item) {
            return typeof item === 'object' ? item[attrs['option-value'] || 'value'] : item;
        }

        // 更新值
        function updateValue(colKey, val, index) {
            for (let i = 0; i < rowNum.value; i++) {
                if (i === colKey) {
                    innerValue.value[i] = val;
                    indexValue.value[i] = index;
                } else if (innerValue.value[i] === undefined) {
                    innerValue.value[i] = getItemValue(rowOpts.value[i][0]);
                    indexValue.value[i] = 0;
                } else {
                    let ckey = indexValue.value[i];
                    ckey = ckey > rowOpts.value[i].length - 1 ? rowOpts.value[i].length - 1 : ckey;
                    innerValue.value[i] = getItemValue(rowOpts.value[i][ckey])
                }
            }
            emit('update:modelValue', [...innerValue.value], [ ...indexValue.value ]);
        }

        return () => {
            
            const rowCols = rowOpts.value.map((options, colKey) => {
                if (!Array.isArray(options)) return null;
                return [
                    h(PickerView, {
                        ...attrs,
                        modelValue: innerValue.value[colKey],
                        class: 'col',
                        options,
                        'onUpdate:modelValue': (val, index) => {
                            updateValue(colKey, val, index)
                        }
                    })
                ]
            })
            // console.log(rowCols.filter(vo=>vo).length);
            return h('div', { class: 'row' }, rowCols)
        }
    }
})