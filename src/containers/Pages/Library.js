import React, { Component } from "react"
import { DatePicker, Button, Select } from "antd"
import { Row, Col, Table, Divider, Spin, Card, Tag } from "antd"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import "video-react/dist/video-react.css"
import { Player } from "video-react"
const { Meta } = Card
const { Option } = Select
import "./Library.scss"


class Library extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onChange = (date, dateString) => {
        console.log(date, dateString)
    }
    handleChange = (value) => {
        console.log(`selected ${value}`)
    }

    render() {
        return (
            <div>
                <Spin size="large" spinning={false}>
                    <Row
                        style={{ marginBottom: 20, alignItems:"baseline" }}
                        type="flex"
                        align="center">
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 5, offset: 0 }}>
                            <Select
                                placeholder="Select Belt"
                                style={{ width: "100%", margin: 5 }}
                                onChange={this.handleChange}>
                                <Option value="b1">Belt 1</Option>
                                <Option value="b2">Belt 2</Option>
                            </Select>
                        </Col>
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 5, offset: 1 }}>
                            <Select
                                placeholder="Select Batch"
                                style={{ width: "100%", margin: 5 }}
                                onChange={this.handleChange}>
                                <Option value="b1">Batch 1</Option>
                                <Option value="b2">Batch 2</Option>
                            </Select>
                        </Col>
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 5, offset: 1 }}>
                            <Select
                                placeholder="Select Video"
                                style={{ width: "100%", margin: 5 }}
                                onChange={this.handleChange}>
                                <Option value="batch1">Video 1</Option>
                                <Option value="batch2">Video 2</Option>
                                <Option value="batch3">Video 3</Option>
                            </Select>
                        </Col>
                        <Col
                            xs={{ span: 23, offset: 0 }}
                            lg={{ span: 5, offset: 1 }}
                            style={{ width: "fit-content"}}>
                            <Button type="primary" htmlType="submit" style={{marginTop: "5px"}}>Go</Button>
                        </Col>
                    </Row>  
                    <Row
                        type="flex"
                        align="center"
                        // style={{ marginTop: 20, width: "500px"}}
                        // xs={{ span: 24, offset: 0 }}
                        // sm={{ span: 5, offset: 1 }}
                    >
                        <Col className="player" style={{width:"80%", minWidth: "325px", maxWidth:"1080px"}}>
                            <Card cover={
                                <Player >
                                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                                </Player>
                            }>
                                <Meta title="Back Kick" description="Full Stance, Basic Fitness Drills, Practised By the Indian Military introduced to TSMA curriculam by Master S.K. Murthy." />
                                <div style={{marginTop: "10px"}}>
                                    <Tag color="red">Tag 1</Tag>
                                    <Tag color="volcano">Tag 2</Tag>
                                    <Tag color="green">Tag 3</Tag>
                                    <Tag color="blue">Tag 4</Tag>
                                    <Tag color="geekblue">Tag 5</Tag>
                                    <Tag color="purple">Tag 6</Tag>
                                </div>
                            </Card>

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
