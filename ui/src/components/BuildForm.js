import { h, ref } from 'vue'
import { QForm, QBtn } from 'quasar'
import BuildField from './BuildField'



function buildButton(btn, key) {
	if (btn.__v_isVNode) return btn;
	if (typeof btn === 'string') btn = { label: btn }
	const typeOpts = ['submit', 'reset'];
	const color = key === 0 ? 'primary' : 'secondary';
	return h(QBtn, { color, type: typeOpts[key], ...btn })
}

export default {
	name: 'BuildForm',
	// 禁止默认继承属性
	inheritAttrs: false,
	props: {
		// 提交地址
		action: String,
		// 提交方式
		method: {
			type: String,
			default: 'post'
		},
		// 是否异步提交，true: fetch异步提交，Function: Axios异步提交
		ajaxSubmit: [Boolean, Function],
		// 表单按扭
		buttons: Array,
		// 按钮包裹元素样式
		btnWrapClass: [Array, String]
	},
	emits: ['update:modelValue', 'response', 'success', 'fail'],
	setup(props, { attrs, slots, emit }) {
		let { buttons, action, method, ajaxSubmit } = props;
		// 构建按钮
		buttons = buttons ? buttons.map(buildButton) : [buildButton('提交', 0)];
		// 异步提交
		const ajaxSubmitFun = () => {
			
			const url = action || location.href;
			let request = null;
			if (ajaxSubmit instanceof Function) {
				request = ajaxSubmit({ url, method });
			} else {
				request = fetch(url, {
					method,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-Requested-With': 'XMLHttpRequest'
					},
					body: new URLSearchParams(attrs.modelValue)
				}).then(res=>{
					try {
						return res.json()
					} catch (error) {
						return res.text()
					}
				})
			}
			request.then(res => {
				console.log(res);
				emit('success', res);
				emit('response', res);
			}).catch(err => {
				console.log(err);
				emit('fail', err);
				emit('response', err);
			})
		}

		return () => {
			const { btnWrapClass } = props;
			console.log(ajaxSubmit);
			// 解构出表单参数
			const {
				class: className,
				style,
				autofocus,
				noErrorFocus,
				noResetFocus,
				greedy,
				onSubmit,
				...fieldAttrs
			} = attrs;

			return h(QForm, {
				class: ['build-form', className],
				style,
				autofocus,
				noErrorFocus,
				noResetFocus,
				greedy,
				action,
				method,
				onSubmit: ajaxSubmit ? ajaxSubmitFun : onSubmit,
			}, {
				default: () => [
					// 字段前
					slots.prepend ? slots.prepend() : null,
					// 表单字段
					h(BuildField, fieldAttrs),
					// 字段后
					slots.append ? slots.append() : null,
					h('div', { class: ['btn-wrap', btnWrapClass] }, buttons),
					slots.default ? slots.default() : null
				]
			})
		}
	}
}
