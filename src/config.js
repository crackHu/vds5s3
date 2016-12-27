const projectPath = 'http://172.16.1.127:8080/vds5s3'

export const api = {
	/*请求成功标识*/
	reqCorrectCode: ['code', 'code == 1001'],
	reqMessage: 'message',
	reqData: 'data',

	smscp: {
		base: `${projectPath}/v2/admin/smscp`,

		findByPage: function() {
			return `${this.base}/findByPage`
		},
		showById: function() {
			return `${this.base}/showById`
		},
		addEntity: function() {
			return `${this.base}/addEntity`
		},
		editByEntiry: function() {
			return `${this.base}/editByEntiry`
		},
	}

}

//************* Edit Table Config *************//
export const EditTableConfig = {
	/*数据源 属性*/
	dataSourcePro: 'data.content',
	/*表格字段*/
	columnsId: 'smsCpId',
	columnsDisplay: 'smsCpName',
	columns: [{
		title: '短信用户名称',
		dataIndex: 'smsCpName',
		width: '10%',
		render: {
			link: true,
			onClick: true,
			modaltitle: `查 看 - {smsCpName}`
		}
	}, {
		title: '短信用户appkey',
		dataIndex: 'smsCpAppKey',
	}, {
		title: '短信用户secret',
		dataIndex: 'smsCpSecret',
	}, {
		title: '是否删除',
		dataIndex: 'smsIsRemove',
		width: '10%',
	}, {
		title: '创建时间',
		dataIndex: 'smsCreateTime',
		width: '10%',
		render: {
			format: 'yyyy-MM-dd',
		}
	}, {
		title: '修改时间',
		dataIndex: 'smsModifyTime',
		width: '10%',
		render: {
			format: 'yyyy-MM-dd',
		}
	}, ],
	/*表单*/
	form: {
		width: 1000,
		//vertical horizontal inline
		layout: {
			'vertical': true
		},
		/*表单控件*/
		item: [{
			label: '短信用户名称',
			name: 'smsCpName',
			required: true,
			message: '不能为空',
			type: 'input',
			config: {
				placeholder: '请输入短信用户名称',
			}
		}, {
			label: 'appkey',
			name: 'smsCpAppKey',
			required: true,
			message: '不能为空',
			type: 'input',
			config: {
				placeholder: '请输入短信用户appkey',
			}
		}, {
			label: 'secret',
			name: 'smsCpSecret',
			type: 'input',
			required: true,
			message: '不能为空',
			config: {
				placeholder: '请输入短信用户secret',
			}
		}, ],
		/*控件布局*/
		itemLayout: {
			labelCol: {
				span: 8
			},
			wrapperCol: {
				span: 16
			},
		},
	}
}