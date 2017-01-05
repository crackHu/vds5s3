import React, {
    PropTypes,
} from "react"
import {
    Table,
    Button,
    Popconfirm,
} from 'antd';

import CollectionForm from './CollectionForm'
import {
    getFieldsValueObj,
} from './utils/util'

import {
    getDataSource,
    getModalDataById,
    addItem,
    updateItem,
    deleteItem,
} from './utils/fetch';
import {
    FUNCTION,
    EditTableConfig,
} from './plugin_config/config'

const {
    declare,
    plugin
} = FUNCTION
let {
    columns,
    columnsId,
    columnsDisplay,
    defaultPage,
    defaultSize,
    defaultSort,
    dataSourcePro,
    dataSourceTotal,
} = EditTableConfig;
const {
    CREATE,
    DELETE,
    UPDATE,
    QUERY,
} = declare
const PLUGIN_FUNC = Object.keys(plugin).map(func => {
    return plugin[func] ? func : Date.now()
})

export default class CollectionsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: undefined,
            pageSize: defaultSize,
            pageNo: defaultPage,
            sort: defaultSort,
            total: undefined,

            modalVisible: false,
            modalStatus: undefined,
            modalTitle: undefined,
            modalId: undefined,
            modalData: undefined,
        }

        this.HAS_CREATE = PLUGIN_FUNC.indexOf(CREATE) > -1
        this.HAS_DELETE = PLUGIN_FUNC.indexOf(DELETE) > -1
        this.HAS_UPDATE = PLUGIN_FUNC.indexOf(UPDATE) > -1
        this.HAS_QUERY = PLUGIN_FUNC.indexOf(QUERY) > -1

        this.init()
    }

    componentWillMount = () => {
        this.getDataSource()
    }

    componentDidMount = () => {}

    getDataSource = (pageNo = this.state.defaultPage,
        pageSize = this.state.defaultSize,
        sort = this.state.defaultSort) => {

        getDataSource(pageNo, pageSize, sort).then(data => {
            let dataSource, total
            dataSourcePro.split('.').map(pro => {
                dataSource = dataSource ? dataSource[pro] : data[pro]
            })
            dataSourceTotal.split('.').map(pro => {
                total = total ? total[pro] : data[pro]
            })
            this.setState({
                dataSource,
                total
            })
        })
    }

    init = () => {

        columns = columns.map(column => {
            if (column.hasOwnProperty('render')) {
                let render = column['render']
                if (render && render.constructor === Object) {
                    if ('format' in render) {
                        let format = render.format
                        column['render'] = text => {
                            return new Date(parseInt(text)).format(format)
                        }
                    }
                    if ('link' in render && 'onClick' in render) {
                        if (this.HAS_QUERY && render['link'] && render['onClick']) {
                            column['render'] = text => {
                                return <a>{text}</a>
                            }
                            column['onCellClick'] = record => {
                                let title = render['modaltitle']
                                let reg = new RegExp('\\{(.+?)\\}', "g");
                                let arrMactches = title.match(reg)
                                arrMactches.forEach(match => {
                                    let rep = match.substring(1, match.length - 1)
                                    title = title.replace(match, record[rep])
                                })
                                this.handleQuery(title, record[columnsId])
                            }
                        } else {
                            delete column['render']
                        }
                    }
                }
            }
            return column
        })

        const {
            pageNo,
            pageSize,
        } = this.state

        this.genSerialNumber(false, pageNo, pageSize)
        if (this.HAS_QUERY || this.HAS_UPDATE || this.HAS_DELETE) {
            columns.push({
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    let title = `编 辑 - ${record[columnsDisplay]}`
                    let id = record[columnsId]

                    let query = this.HAS_QUERY ? <a href="#" onClick={() => this.handleQuery(title, id)}>查看</a> : null
                    let edit = this.HAS_UPDATE ? <a href="#" onClick={() => this.handleEdit(title, id)}>编辑</a> : null
                    let drop = this.HAS_DELETE ? (
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(id)}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    ) : null
                    return (
                        <span>
                            {query}
                            {this.HAS_QUERY && this.HAS_UPDATE ? <span className="ant-divider" /> : null}
                            {edit}
                            {this.HAS_UPDATE && this.HAS_DELETE ? <span className="ant-divider" /> : null}
                            {drop}
                        </span>
                    )
                }
            })
        }
    }

    genSerialNumber = (isExist = true, pageNo = this.state.pageNo, pageSize = this.state.pageSize) => {
        if (isExist) {
            columns.shift()
        }
        columns.unshift({
            title: '序号',
            dataIndex: 'index',
            render: (text, record, index) => (pageNo - 1) * pageSize + (index + 1)
        })
    }

    showModal = (modalTitle, modalStatus) => {
        this.setState({
            modalVisible: true,
            modalTitle,
            modalStatus,
        });
    }

    handleModalVisible = (visible = true) => {
        this.setState({
            modalVisible: visible
        })
    }

    handleCancel = () => {
        this.setState({
            modalData: null,
            modalVisible: false
        });
    }

    handleQuery = (title = '查 看', id) => {
        getModalDataById(id).then(modalData => {
            this.setState({
                modalData
            }, this.showModal(title, QUERY))
        })
    }

    handleAdd = () => {
        this.handleModalVisible(true)
    }

    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            addItem(values).then(() => {
                this.setState({
                    modalVisible: false
                }, () => this.getDataSource())
            })
        });
    }

    handleEdit = (title = '编 辑 ', id) => {
        this.setState({
            modalId: id
        }, () => {
            getModalDataById(id).then(modalData => {
                this.setState({
                    modalData
                }, this.showModal(title, UPDATE))
            })
        })
    }

    handleUpdate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            Object.assign(values, {
                [columnsId]: this.state.modalId
            })
            updateItem(values).then(() => {
                this.setState({
                    modalVisible: false
                }, () => this.getDataSource())
            })
        });
    }

    handleDelete = (id) => {
        deleteItem(id).then(() => {
            this.getDataSource()
        })
    }

    onFieldsChange = (fields) => {
        let modalData = this.state.modalData
        this.setState({
            modalData: {
                ...modalData,
                ...fields
            }
        }, console.log('onFieldsChange', fields, this.state.modalData))
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    render() {

        const dataSource = this.state.dataSource
        let addBtn =
            this.HAS_CREATE ?
            (
                <Button
                    className="editable-add-btn"
                    type="primary"
                    onClick={() => this.showModal('新 增', CREATE)}
                >
                    新 增
                </Button>
            ) : null
        const pagination = {
            current: this.state.pageNo,
            total: this.state.total,
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                this.setState({
                    pageNo: current,
                    pageSize: pageSize
                }, () => {
                    this.getDataSource(current, pageSize)
                })
                console.log('Current: ', current, '; PageSize: ', pageSize);
                this.genSerialNumber(true, current, pageSize)
            },
            onChange: (current) => {
                console.log('onChange', this.state)
                const pageSize = this.state.pageSize
                this.setState({
                    pageNo: current,
                }, () => {
                    this.getDataSource(current, pageSize)
                    console.log('Current: ', current, this.state);
                })
                this.genSerialNumber(true, current, pageSize)
            },
            showQuickJumper: true,
            pageSize: this.state.pageSize,
            showTotal: (total, range) => `共 ${total} 条 （${range[0]}-${range[1]}）`
        };

        return (
            <div>
                {addBtn}
                {/*<DDModal
                    title={'Create a new collection'}
                    width={'50%'}
                    visible={this.state.modalVisible}
                />*/}

                <CollectionForm
                  ref={this.saveFormRef}
                  visible={this.state.modalVisible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                  onUpdate={this.handleUpdate}
                  title={this.state.modalTitle}
                  status={this.state.modalStatus}
                  data={this.state.modalData}
                  onFieldsChange={this.onFieldsChange}
                />
                
                <Table
                    bordered
                    dataSource={dataSource}
                    //onRowClick={() => this.showModal('更 新', UPDATE)}
                    columns={columns}
                    pagination={pagination}
                />
            </div>
        );
    }
}