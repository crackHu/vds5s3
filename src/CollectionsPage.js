import React, {
    PropTypes,
} from "react"
import {
    Table,
    Button,
} from 'antd';

import CollectionForm from './CollectionForm'
import {
    get,
    post
} from './utils/ajax';
import fetch from 'isomorphic-fetch'
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
            visible: false,
            status: "新增",
            dataSource: undefined,
        }

        this.init()
    }

    componentWillMount = () => {
        this.getDataSource()
    }

    componentDidMount = () => {}

    init = () => {
        columns.push({
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <span>
                        <a href="#" onClick={() => this.showModal(`编 辑 - ${record.name.first}`)}>Edit</a>
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
        const {
            findByPage
        } = smscp
        const data = ''

        fetch(`${findByPage}?${data}`).then(response => response.json())
            .then(data => {
                this.setState({
                    dataSource: data.results
                })
            })
            .catch(e => console.log("Oops, error", e))
    }

    handleAdd = () => {
        this.handleModalVisible(true)
    }

    handleModalVisible = (visible = true) => {
        this.setState({
            modalVisible: visible
        })
    }


    showModal = (status) => {
        this.setState({
            visible: true,
            status,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
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
                visible: false,
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
                visible: false,
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
                    onClick={() => this.showModal('新 增')}
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
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                  onUpdate={this.handleUpdate}
                  status={this.state.status}
                />
                
                <Table
                    bordered
                    dataSource={dataSource}
                    //onRowClick={() => this.showModal('更新')}
                    columns={columns}
                />
            </div>
        );
    }
}