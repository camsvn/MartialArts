import React, { Component } from "react"
import { Form, Input, Button, DatePicker, Upload,Icon, message,Cascader, Select} from "antd"
import { UploadOutlined, InboxOutlined } from "@ant-design/icons"

const { Option } = Select

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

const role = [{
    value:"admin",
    label: "Admin",
},{
    value:"student",
    label: "Student",
},{
    value:"teacher",
    label: "Teacher",
}]

function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result))
    reader.readAsDataURL(img)
}
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
}

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleChange = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true })
            return
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            )
        }
    };    

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

    render() {
        const { getFieldDecorator } = this.props.form
        const { imageUrl } = this.state
        
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">Upload</div>
            </div>
        )

        const prefixSelector = getFieldDecorator("prefix", {
            initialValue: "91",
        })(
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
                {/* <Option value="87">+87</Option> */}
            </Select>,
        )

        return (
            <div>
                <Form
                    {...layout}
                    name="nest-messages"
                    onSubmit={this.onFinish}
                    validateMessages={validateMessages}>
                    <Form.Item
                        name="upload"
                        label="Profile Picture"
                        valuePropName="fileList"
                        getValueFromEvent={this.normFile}
                        extra="Select your new profile picture">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name={"event.name"}
                        label="Name"
                        rules={[{ required: true }]}>
                        {getFieldDecorator("event.name", {
                            rules: [
                                {
                                    required: true,
                                    message: "Name is Required!",
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    {/* <Form.Item
                        name={["event", "lname"]}
                        label="Last Name">
                        <Input />
                    </Form.Item> */}
                    <Form.Item label="User Role">
                        {getFieldDecorator("role", {
                            initialValue: ["admin"],
                            rules: [
                                { type: "array", required: true, message: "Please select user role!" },
                            ],
                        })(<Cascader options={role} />)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator("email", {
                            rules: [
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },
                                {
                                    required: true,
                                    message: "Please input your E-mail!",
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item
                        name={["event", "phome"]}
                        label="Phone">
                        {getFieldDecorator("phone", {
                            rules: [
                                { required: true, message: "Please input your phone number!" },
                                { max: 10, message: "Please input valid phone number!" }],
                        })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
                    </Form.Item>        
                    <Form.Item
                        wrapperCol={{ ...layout.wrapperCol }}
                        align="center">
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                        {/* <Button
                            style={{ marginLeft: 10 }}
                            onClick={(e) => {
                                this.props.form.resetFields()
                            }}>
                            Clear
                        </Button> */}
                        <Button
                            align="right"
                            style={{ marginLeft: 10 }}
                            onClick={() => {}}>
                            Go to Profile
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
    EditProfile
)

export default WrappedAdvancedSearchForm //withRouter(connect(mapStateToProps, {})(AddEvents))
