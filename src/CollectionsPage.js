import React, {
    PropTypes,
} from "react"
import {
    Table,
    Button,
} from 'antd';

import CollectionForm from './CollectionForm'
import {
    get as fetchGet
} from './utils/fetch';
import {
    api,
    EditTableConfig
} from './config'

const {
    smscp
} = api
let columns = EditTableConfig.columns;

export default class CollectionsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalStatus: undefined,
            modalTitle: undefined,
            modalData: undefined,
            dataSource: undefined,
        }

        this.init()
    }

    componentWillMount = () => {
        this.getDataSource()
    }

    componentDidMount = () => {}

    init = () => {
        let {
            columnsId,
            columnsDisplay,
        } = EditTableConfig

        columns = columns.map(column => {
            if (column.hasOwnProperty('render')) {
                let render = column['render']
                if (render && render.constructor == Object) {
                    if ('format' in render) {
                        let format = render.format
                        column['render'] = text => {
                            return new Date(parseInt(text)).format(format)
                        }
                    }
                    if ('link' in render && 'onClick' in render) {
                        if (render['link'] && render['onClick']) {
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
                                this.handelQuery(title, record[columnsId])
                            }
                        }
                    }
                }
            }
            return column
        })
        columns.push({
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <span>
                        <a href="#" onClick={() => this.showModal(`编 辑 - ${record[columnsDisplay]}`, 'uapdte')}>Edit</a>
                        <span className="ant-divider" />
                        <a href="#" onClick={this.delete}>Delete</a>
                        {/*
                            <span className="ant-divider" />
                            <a href="#" className="ant-dropdown-link">
                                更多 <Icon type="down" />
                            </a>
                        */}
                    </span>
                )
            }
        })
    }

    getDataSource = () => {
        let dataSourcePro = EditTableConfig.dataSourcePro;
        const data = ''

        fetchGet(smscp.findByPage(), (data) => {
            let dataSource
            dataSourcePro.split('.').map(pro => {
                dataSource = dataSource ? dataSource[pro] : data[pro]
            })
            this.setState({
                dataSource
            })
        })
    }

    handleAdd = () => {
        this.handleModalVisible(true)
    }

    handleModalVisible = (visible = true) => {
        this.setState({
            modalVisible: visible
        })
    }


    showModal = (modalTitle, modalStatus) => {
        this.setState({
            modalVisible: true,
            modalTitle,
            modalStatus,
        });
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false
        });
    }

    handelQuery = (title = '查 看', id) => {

        fetchGet(`${smscp.showById()}?id=${id}`, (data) => {
            this.setState({
                modalData: data
            }, this.showModal(title, 'query'))
        })
    }

    onFieldsChange = (fields) => {
        this.setState({
            data: fields
        })
    }

    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({
                modalVisible: false,
                dataSource: this.state.dataSource.concat({
                    key: Date.now(),
                    name: values.name,
                    age: 2016 - values.birthdate.weekYear(),
                    address: values.address.join(' '),
                })
            });
        });
    }

    handleUpdate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({
                modalVisible: false,
                dataSource: this.state.dataSource.concat({
                    key: Date.now(),
                    name: values.name,
                    age: 2016 - values.birthdate.weekYear(),
                    address: values.address.join(' '),
                })
            });
        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    delete = () => {
        let len = this.state.dataSource.length
        let data = this.state.dataSource.slice()
        data.splice(len - 1, 1)

        this.setState({
            dataSource: data
        });
    }

    render() {

        const dataSource = this.state.dataSource

        return (
            <div>
                <Button
                    className="editable-add-btn"
                    type="primary"
                    onClick={() => this.showModal('新 增', 'create')}
                >
                    新 增
                </Button>

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
                />
                
                <Table
                    bordered
                    dataSource={dataSource}
                    //onRowClick={() => this.showModal('更 新', 'update')}
                    columns={columns}
                />
            </div>
        );
    }
}