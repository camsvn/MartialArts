import React, { Component } from "react"
import { Form, Input, Button, DatePicker, Upload, Icon, message ,Cascader, Select} from "antd"
import { UploadOutlined, InboxOutlined } from "@ant-design/icons"

const { Option } = Select
const { TextArea } = Input
const { Dragger } = Upload

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
}

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not validate email!",
        number: "${label} is not a validate number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
}

const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
        const { status } = info.file
        if (status !== "uploading") {
            console.log(info.file, info.fileList)
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`)
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`)
        }
    },    
}

class AddCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    onFinish = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            console.log("Received values of form: ", values)
        })
    }

    normFile = (e) => {
        console.log("Upload event:", e)
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }

    handleChange = (value) => {
        console.log(`selected ${value}`)
    }

    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <div>
                <Form
                    {...layout}
                    name="nest-messages"
                    onSubmit={this.onFinish}
                    validateMessages={validateMessages}>
                    <Form.Item label="Belt">
                        {getFieldDecorator("belt", {
                            rules: [
                                { required: true, message: "Please choose a belt!" },
                            ],
                        })(<Select placeholder={"Choose Belt"} onChange={this.handleChange}>
                            <Option value="belt1">Belt 1</Option>
                            <Option value="belt2">Belt 2</Option>
                            <Option value="belt3">Belt 3</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="Batch">
                        {getFieldDecorator("belt", {
                            rules: [
                                { required: true, message: "Please choose a batch!" },
                            ],
                        })(<Select placeholder={"Choose Batch"} onChange={this.handleChange}>
                            <Option value="batch1">Batch 1</Option>
                            <Option value="batch2">Batch 2</Option>
                            <Option value="batch3">Batch 3</Option>
                            <Option value="batch4">Batch 4</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item
                        name={"event.lessonname"}
                        label="Lesson Name"
                        rules={[{ required: true }]}>
                        {getFieldDecorator("event.lessonname", {
                            rules: [
                                {
                                    required: true,
                                    message: "Lesson Name is Required!",
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item
                        name={"event.lessondesc"}
                        label="Lesson Description"
                        rules={[{ required: true }]}>
                        {getFieldDecorator("event.lessondesc", {
                            rules: [
                                {
                                    required: true,
                                    message: "Lesson Description is Required!",
                                },
                            ],
                        })(<TextArea rows={5}/>)}
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        label="Upload Video"
                        valuePropName="fileList"
                        getValueFromEvent={this.normFile}
                        // extra="Select your new profile picture"
                    >
                        <Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for single upload of Video file</p>
                        </Dragger>

                        {/* <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
                        </Upload> */}
                    </Form.Item>        
                    <Form.Item
                        wrapperCol={{ ...layout.wrapperCol }}
                        align="center">
                        <Button type="primary" htmlType="submit">
                            Upload
                        </Button>
                        <Button
                            align="right"
                            style={{ marginLeft: 10 }}
                            onClick={() => {}}>
                            Go to Library
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state, ownProps)
    return {
        navigation: ownProps.router,
    }
}

const WrappedAdvancedSearchForm = Form.create({ name: "advanced_search" })(
    AddCourse
)

export default WrappedAdvancedSearchForm //withRouter(connect(mapStateToProps, {})(AddEvents))
