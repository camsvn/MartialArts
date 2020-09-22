import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { DatePicker, Select, Card } from "antd"
import { Row, Col, Button, Spin, Divider, Table, Tooltip } from "antd"
import { InfoCircleFilled } from "@ant-design/icons"
const { Option } = Select
import moment from "moment"
import "./BeltTest.scss"

const dateFormat = "YYYY/MM/DD"
const cardBodyStyle = {
    padding: 15,
}

const data = [
    {
        Title: "10 Punches",
        "Time Allowed": 4,
        Allowance: "-15% to 30%",
        "Time Obtained": "3.6S",
        "Time Difference": "-0.4S",
        "Variance in %": "-10%",
        "Grade Obtained": "4.5",
        Status: "Grade Obtained: 4.5 Very Good!",
    },
    {
        Title: "10 Punches",
        "Time Allowed": 4,
        Allowance: "-15% to 30%",
        "Time Obtained": "3.6S",
        "Time Difference": "-0.4S",
        "Variance in %": "-10%",
        "Grade Obtained": "4.5",
        Status: "Grade Obtained: 4.5 Very Good!",
    },
    {
        Title: "10 Punches",
        "Time Allowed": 4,
        Allowance: "-15% to 30%",
        "Time Obtained": "3.6S",
        "Time Difference": "-0.4S",
        "Variance in %": "-10%",
        "Grade Obtained": "4.5",
        Status: "Grade Obtained: 4.5 Very Good!",
    },
]

const data1 = [
    {
        Title: "Basic Stance",
        Desc: "Qualitative Analysis conducted by black belt Ranjith",
        "Grade Obtained": "4.5",
        Status: "Grade Obtained: 4.5 Very Good!",
    },
    {
        Title: "Basic Self Defence",
        Desc: "Qualitative Analysis conducted by black belt Poonthanam",
        "Grade Obtained": "4.5",
        Status: "Grade Obtained: 4.5 Very Good!",
    },
    {
        Title: "Basic Self Defence",
        Desc: "Qualitative Analysis conducted by black belt Balraj",
        "Grade Obtained": "4.5",
        Status: "Grade Obtained: 4.5 Very Good!",
    },
]

const descVariance =
    "Variance% = ((Allowed Time - Actual Time) / Allowed Time) * 100"

class BeltTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
        }
        this.columns = [
            {
                title: () => (
                    <span>
                        Variance %
                        <Tooltip title={descVariance}>
                            &nbsp;&nbsp;
                            <InfoCircleFilled />
                        </Tooltip>
                    </span>
                ),
                dataIndex: "variance",
                key: "variance",
            },
            {
                title: "Grade",
                dataIndex: "grade",
                key: "grade",
            },
            {
                title: "Remarks",
                dataIndex: "remarks",
                key: "remarks",
            },
        ]

        this.data = [
            {
                key: "1",
                variance: "30%",
                grade: "1",
                remarks: "Needs Improvement",
            },
            {
                key: "2",
                variance: "15%",
                grade: "2",
                remarks: "Average",
            },
            {
                key: "3",
                variance: "On Time",
                grade: "3",
                remarks: "Good",
            },
            {
                key: "4",
                variance: "-5%",
                grade: "4",
                remarks: "Very Good",
            },
            {
                key: "5",
                variance: "-15%",
                grade: "5",
                remarks: "Excelent",
            },
        ]
    }

    componentDidMount() {}

    onFinish = (value) => {
        console.log(value)
    }
    render() {
        return (
            <div>
                <Spin size="large" spinning={false}>
                    <Divider orientation="left" style={{ marginTop: 0 }}>
                        🎖 Grading Scheme
                    </Divider>
                    <Row gutter={[16, 24]} type="flex" align="center">
                        <Col xs={{ span: 24 }} lg={{ span: 20 }}>
                            <p style={{ textAlign: "justify" }}>
                                Each Technique has a score card. Your grade is
                                calculate as follows. There is an expected time
                                and an allowance for each technique. The
                                student&#39;s actual time is compared with the
                                expected time, the time difference is calculated
                                in percentage value. Your variance in percentage
                                is used to calculate your grade according to the
                                table below.
                            </p>
                            <Table
                                className="Grade-paper"
                                columns={this.columns}
                                dataSource={this.data}
                                pagination={false}
                                style={{
                                    minWidth: "fit-content",
                                    maxWidth: "60%",
                                    margin: "auto",
                                }}
                                // scroll={{ x: "calc(700px + 50%)", y: 240 }}
                            />
                            <p
                                style={{
                                    textAlign: "justify",
                                    paddingTop: "1rem",
                                }}>
                                Some parameters like stance and self defense are
                                evaluated qualilatively. The grade obtained in
                                each technique is summed up. The maximum grade
                                per belt is 30
                            </p>
                            <p style={{ margin: 0 }}>
                                {" "}
                                Select your belt to view the grades obtained.
                            </p>
                        </Col>
                    </Row>
                    <Divider orientation="left">Result</Divider>
                    <Row
                        type="flex"
                        align="center"
                        style={{
                            alignItems: "baseline",
                            justifyContent: "center",
                        }}>
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 5, offset: 0 }}>
                            <DatePicker
                                defaultValue={moment("2015/01/01", dateFormat)}
                                format={dateFormat}
                                style={{ margin: 5, width: "100%" }}
                            />
                        </Col>
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 5, offset: 1 }}>
                            <Select
                                placeholder="Select Belt"
                                style={{ width: "100%", margin: 5 }}
                                onChange={this.handleChange}>
                                <Option value="b1">Belt 1</Option>
                                <Option value="b2">Belt 2</Option>
                            </Select>
                        </Col>
                        <Col
                            xs={{ span: 23, offset: 0 }}
                            lg={{ span: 5, offset: 1 }}
                            style={{ width: "fit-content" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginTop: "5px" }}>
                                Go
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[16, 24]}>
                        <Col
                            align={"center"}
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 6, offset: 0 }}>
                            <img
                                style={{ marginTop: 10, borderRadius: "50%" }}
                                width={150}
                                height={150}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </Col>
                        <Col
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: 20,
                            }}
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 18, offset: 0 }}>
                            <Card>
                                <div>Tiwari </div>
                                <div>Green Belt</div>
                                <div>Track - MMA</div>
                                <div>GPA - ?</div>
                                <div>LAST GRADING DONE : 1st Sept, 2019</div>
                            </Card>
                        </Col>
                    </Row>
                    <Row
                        gutter={[16, 24]}
                        type="flex"
                        align="center"
                        style={{ justifyContent: "space-evenly" }}>
                        {data.map((d, _idx) => {
                            return (
                                <Col
                                    xs={{ span: 24, offset: 0 }}
                                    lg={{ span: 6, offset: 0 }}
                                    key={_idx}
                                    style={{ minWidth: 300 }}>
                                    <Card
                                        title={d.Title}
                                        bordered={true}
                                        bodyStyle={cardBodyStyle}
                                        className="BeltTest-paper"
                                        style={{ width: "100%" }}>
                                        <p>Time Allowed:{d["Time Allowed"]}</p>
                                        <p>Allowance:{d["Allowance"]}</p>
                                        <p>
                                            Time Obtained:{d["Time Obtained"]}
                                        </p>
                                        <p>
                                            Time Difference:
                                            {d["Time Difference"]}
                                        </p>
                                        <p>
                                            Variance in %:{d["Variance in %"]}
                                        </p>
                                        <p>
                                            Grade Obtained:{d["Grade Obtained"]}
                                        </p>
                                        <b>{d["Status"]}</b>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                    <Row
                        gutter={[16, 24]}
                        type="flex"
                        align="center"
                        style={{ justifyContent: "space-evenly" }}>
                        {data1.map((d, _idx) => {
                            return (
                                <Col
                                    xs={{ span: 24, offset: 0 }}
                                    lg={{ span: 6, offset: 0 }}
                                    key={_idx}
                                    style={{ minWidth: 300 }}>
                                    <Card
                                        title={d.Title}
                                        bordered={true}
                                        bodyStyle={cardBodyStyle}
                                        className="BeltTest-paper"
                                        style={{ width: "100%" }}>
                                        <p>{d["Desc"]}</p>
                                        <p>
                                            Grade Obtained:{d["Grade Obtained"]}
                                        </p>
                                        <b>{d["Status"]}</b>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Spin>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state, ownProps)
    return {}
}

export default withRouter(connect(mapStateToProps, {})(BeltTest))
