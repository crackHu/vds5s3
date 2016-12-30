//const proxy = 'http://172.16.1.127:8080'
//const localhost = ’http://172.16.1.213:8080‘

export const __DEBUG__ = process.env.NODE_ENV === 'development'

export const APP = {
	host: '172.16.1.127:8080',
	projectName: '/vds5s3',
	buildPath: 'build',

	getBaseUrl: function() {
		return __DEBUG__ ? this.projectName : this.host + this.projectName
	}
}

export const DATE_FORMAT_STRING = 'YYYY-MM-DD HH:mm:ss'

/*功能配置*/
export const FUNCTION = {
	declare: {
		CREATE: 'CREATE',
		DELETE: 'DELETE',
		UPDATE: 'UPDATE',
		QUERY: 'QUERY',
	},
	/*该插件拥有的功能*/
	plugin: {
		CREATE: true,
		DELETE: true,
		UPDATE: true,
		QUERY: true
	}
}

export const API = {
	/*请求成功标识*/
	reqCorrectCode: ['code', 'code === \'1001\''],
	reqMessage: 'message',
	reqData: 'data',

	module: {
		base: `${APP.getBaseUrl()}/v2/admin/smscp`,

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
		delById: function() {
			return `${this.base}/delById`
		},
	}

}

//************* Entity Config *************//
export const EntityConfig = {
	showById: {
		property: 'data',
		fields: [
			'smsCpAppKey',
			'smsCpId',
			'smsCpName',
			'smsCpSecret',
			'smsIsRemove',
		],
		multiFields: [],
		dateFields: [
			'smsCreateTime',
			'smsModifyTime',
		],
		cascadeFields: [],

	}
}

//************* Edit Table Config *************//
export const EditTableConfig = {
	/*数据源 属性*/
	dataSourcePro: 'data.content',
	dataSourceTotal: 'data.totalElements',
	/*表格字段*/
	columnsId: 'smsCpId',
	columnsDisplay: 'smsCpName',
	defaultSort: 'smsModifyTime,desc',
	defaultPage: 1,
	defaultSize: 10,
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
			format: 'YYYY-MM-DD',
		}
	}, {
		title: '修改时间',
		dataIndex: 'smsModifyTime',
		width: '10%',
		render: {
			format: 'YYYY-MM-DD',
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
			showIn: {
				CREATE: true,
				UPDATE: true,
				QUERY: true
			},
			config: {
				placeholder: '请输入短信用户名称',
			}
		}, {
			label: 'appkey',
			name: 'smsCpAppKey',
			required: true,
			message: '不能为空',
			type: 'input',
			showIn: {
				CREATE: true,
				UPDATE: true,
				QUERY: true
			},
			config: {
				placeholder: '请输入短信用户appkey',
			}
		}, {
			label: 'secret',
			name: 'smsCpSecret',
			type: 'input',
			required: true,
			message: '不能为空',
			showIn: {
				CREATE: true,
				UPDATE: true,
				QUERY: true
			},
			config: {
				placeholder: '请输入短信用户secret',
			}
		}, {
			label: '创建时间',
			name: 'smsCreateTime',
			type: 'datepicker',
			format: DATE_FORMAT_STRING,
			required: true,
			message: '不能为空',
			showIn: {
				CREATE: false,
				UPDATE: false,
				QUERY: true
			},
			config: {
				showTime: true,
				style: {
					width: 197.33
				},
				placeholder: '请输入短信用户secret',
			}
		}, {
			label: '修改时间',
			name: 'smsModifyTime',
			type: 'datepicker',
			format: DATE_FORMAT_STRING,
			required: true,
			message: '不能为空',
			showIn: {
				CREATE: false,
				UPDATE: false,
				QUERY: true
			},
			config: {
				showTime: true,
				style: {
					width: 197.33
				},
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