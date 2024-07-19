
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