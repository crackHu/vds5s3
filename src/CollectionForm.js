import React, {
    PropTypes,
} from "react"
import {
    Input,
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
    EditTableConfig
} from './config'

const FormItem = Form.Item;
const Option = Select.Option;

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
            form,
            status,
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
                options
            } = item

            let option
            if (required) {
                option = {
                    rules: [{
                        required,
                        message
                    }]
                }
            }

            let component
            switch (type) {
                case 'input':
                    component = <Input {...config}/>
                    break
                case 'select':
                    component = (
                        <Select>
                            {options ? getSelectOptions(options) : null}
                        </Select>
                    )
                    break
                case 'datepicker':
                    component = <DatePicker />
                    break
                case 'cascader':
                    component = <Cascader options={options}/>
                    break
                default:
                    component = <Input />
                    break
            }

            return (
                <Col span={8} key={i}>
                    <FormItem {...this.formItemLayout} key={i} label={item.label}>
                        {getFieldDecorator(item.name, option)(
                          component
                        )}
                    </FormItem>
                </Col>
            )

        })

        return (
            <Modal
                visible={visible}
                title={status}
                okText={'保存'}
                onCancel={onCancel}
                onOk={onCreate}
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

export default Form.create()(CollectionForm)