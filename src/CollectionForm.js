import React, {
    PropTypes,
} from "react"
import {
    Input,
    Button,
    Select,
    Row,
    Col,
    Modal,
    Form,
    Radio,
    Cascader,
    DatePicker,
} from 'antd';

import {
    FUNCTION,
    EditTableConfig
} from './plugin_config/config'
import {
    logger
} from './utils/util'

const FormItem = Form.Item;
const Option = Select.Option;
const {
    declare,
    plugin
} = FUNCTION

const {
    CREATE,
    DELETE,
    UPDATE,
    QUERY,
} = declare

const getSelectOptions = (data) => {
    return data.map((item, i) => {
        return <Option key={item.value}>{item.value}</Option>
    })
}

class CollectionForm extends React.Component {

    constructor(props) {
        super(props);

        this.form = EditTableConfig.form
        this.formWidth = this.form.width
        this.formLayout = this.form.layout
        this.formItem = this.form.item
        this.formItemLayout = this.form.itemLayout
    }

    componentDidMount = () => {}

    render() {

        const {
            visible,
            onCancel,
            onCreate,
            onUpdate,
            form,
            title,
            status,
            data
        } = this.props;

        const {
            getFieldDecorator
        } = form;

        const formItem = this.formItem.map((item, i) => {

            const {
                required,
                message,
                type,
                config,
                options,
                showIn
            } = item

            /*rules option*/
            let option
            if (required) {
                option = {
                    rules: [{
                        required,
                        message
                    }]
                }
            }

            /*rules display*/
            let itemDisplay
            if (showIn) {
                if (showIn.constructor === Object) {
                    const item_showIn = Object.keys(showIn).map(func => {
                        return showIn[func] ? func : Date.now()
                    })
                    itemDisplay = item_showIn.indexOf(status) > -1 ? true : false
                } else {
                    logger({
                        target: `showIn: ${showIn}`,
                        message: "[showIn] isn't a Object"
                    })
                }
            }

            let component
                //config['disabled'] = status == QUERY ? true : false

            switch (type) {
                case 'input':
                    component = <Input {...config} />
                    break
                case 'select':
                    component = (
                        <Select {...config}>
                            {options ? getSelectOptions(options) : null}
                        </Select>
                    )
                    break
                case 'datepicker':
                    let {
                        format,
                    } = item
                    component = <DatePicker {...config} format={format}/>
                    break
                case 'cascader':
                    component = <Cascader {...config} options={options}/>
                    break
                default:
                    component = <Input {...config} />
                    break
            }

            return (
                itemDisplay ? (
                    <Col span={8} key={i}>
                        <FormItem {...this.formItemLayout} key={i} label={item.label}>
                            {getFieldDecorator(item.name, option)(
                              component
                            )}
                        </FormItem>
                    </Col>
                ) : null
            )

        })

        let getFooter = (status = this.props.status) => {
            let handleOk, handleCancel = onCancel,
                okText = '提 交',
                cancelText = '取 消'
            let okBtn, cancelBtn

            switch (status) {
                case QUERY:
                    okBtn = null
                    cancelText = '关 闭'
                    break
                case CREATE:
                    handleOk = onCreate
                    break
                case UPDATE:
                    handleOk = onUpdate
                    break
                default:
                    break
            }

            if (okBtn !== null) {
                okBtn = (
                    <Button key="submit" type="primary" size="large" onClick={handleOk}>
                        {okText}
                    </Button>
                )
            }
            cancelBtn = (
                <Button key="back" type="ghost" size="large" onClick={handleCancel}>
                    {cancelText}
                </Button>
            )

            return [cancelBtn, okBtn]
        }


        return (
            <Modal
                visible={visible}
                title={title}
                footer={getFooter()}
                onCancel={onCancel}
                width={this.formWidth}
            >
                <Form {...this.formLayout}>
                    <Row gutter={40}>
                        {formItem}
                    </Row>
                    
                </Form>
            </Modal>
        )
    }

}

function onFieldsChange(props, fields) {
    console.log("CollectionForm onFieldsChange", props, fields)
    props.onFieldsChange(fields);
}

function mapPropsToFields(props) {
    console.log("CollectionForm mapPropsToFields", props)
    return props.data || {}
}

export default Form.create({
    onFieldsChange,
    mapPropsToFields
})(CollectionForm)