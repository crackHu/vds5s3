const projectPath = 'http://172.16.1.127:8080/vds5s3'

export functoin api() {
	return {
		smscp: {
			base: `${projectPath}/v2/admin/smscp`,
			findByPage: `${this.base}/findByPage`,
			showById: `${this.base}/showById`,
			addEntity: `${this.base}/addEntity`,
			editByEntiry: `${this.base}/editByEntiry`,

		}
	}
}

//************* Edit Table Config *************//
export const EditTableConfig = {
	/*表格字段*/
	columns: [{
		title: 'Name',
		dataIndex: 'name',
		render: name => `${name.first} ${name.last}`,
		width: '20%',
	}, {
		title: 'Gender',
		dataIndex: 'gender',
		width: '20%',
	}, {
		title: 'Email',
		dataIndex: 'email',
	}],
	/*表单*/
	form: {
		width: 1000,
		//vertical horizontal inline
		layout: {
			'horizontal': true
		},
		itemLayout: {
			labelCol: {
				span: 5
			},
			wrapperCol: {
				span: 19
			},
		},
		item: [{
			label: '账号',
			name: 'username',
			required: true,
			message: '请输入账号',
			type: 'input',
			config: {
				placeholder: '请输入账号',
				style: {
					width: 200
				}
			}
		}, {
			label: '密码11',
			name: 'password',
			type: 'select',
			options: [{
				value: '无症状'
			}, {
				value: '多饮'
			}, {
				value: '多食'
			}, ]
		}, {
			label: '账号',
			name: 'username1',
			type: 'input',
			required: true,
			message: '请输入账号'
		}, {
			label: '密码11',
			name: 'password1',
			type: 'select',
		}, {
			label: '账号',
			name: 'username2',
			required: true,
			message: '请输入账号',
			type: 'cascader',
			options: [{
				value: 'zhejiang',
				label: 'Zhejiang',
				children: [{
					value: 'hangzhou',
					label: 'Hangzhou',
					children: [{
						value: 'xihu',
						label: 'West Lake',
					}],
				}],
			}, {
				value: 'jiangsu',
				label: 'Jiangsu',
				children: [{
					value: 'nanjing',
					label: 'Nanjing',
					children: [{
						value: 'zhonghuamen',
						label: 'Zhong Hua Men',
					}],
				}],
			}]
		}, {
			label: '密码11',
			name: 'password2',
			type: 'datepicker',
		}, ]
	}
}