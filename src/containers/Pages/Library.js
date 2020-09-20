import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import {
    Row,
    Col,
    Button,
    Spin,
    Divider,
} from "antd"
import "video-react/dist/video-react.css"
import "./Profile.scss"

class Library extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            videoPopupOpen: false,
        }
    }
    render() {
        return (
            <div>
                <Spin size="large" spinning={false}>
                    <Row style={{ border: "1px solid #CCC" }} gutter={[16, 24]}>
                        <Col
                            align={"center"}
                            style={{ borderRight: "1px solid #CCC" }}
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 6, offset: 0 }}>
                            <img
                                style={{ borderRadius: "50%" }}
                                width={200}
                                height={200}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </Col>
                        <Col
                            className="profile-desc"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                lineHeight: 1.9,
                            }}
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 18, offset: 0 }}>
                            <div style={{ padding: 20 }}>
                                <p><b>Name</b>&#9;: Xio Pan </p>
                                <p><b>Role</b>&#9;: Tutor</p>
                                <p><b>Email</b>&#9;: xyz@gmail.com</p>
                                <p><b>Phone</b>&#9;: +91 123 456 7890</p>
                            </div>
                        </Col>
                    </Row>
                    <Divider orientation="left" style={{margin: "2rem 0"}}>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.props.navigation.push({
                                    pathname: "addcourse",
                                })
                            }}>
                            Add Course
                        </Button>
                    </Divider>
                </Spin>
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

export default withRouter(connect(mapStateToProps, {})(Library))
