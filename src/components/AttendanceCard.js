import React, { Component } from "react"
import { Card, Calendar, Select, Radio, Col, Row } from "antd"
import "./AttendanceCard.scss"

const { Meta } = Card
const { Group, Button } = Radio

export default class AttendanceCard extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    onPanelChange(value, mode) {
        console.log(value, mode)
    }

    renderCalendar = () =>{
        return(
            <div style={{ width: 300, border: "1px solid #d9d9d9", borderRadius: 4, backgroundColor:"#FFF" }}>
                <Calendar
                    fullscreen={false}
                    headerRender={({ value, type, onChange, onTypeChange }) => {
                        const start = 0
                        const end = 12
                        const monthOptions = []
    
                        const current = value.clone()
                        const localeData = value.localeData()
                        const months = []
                        for (let i = 0; i < 12; i++) {
                            current.month(i)
                            months.push(localeData.monthsShort(current))
                        }
    
                        for (let index = start; index < end; index++) {
                            monthOptions.push(
                                <Select.Option className="month-item" key={`${index}`}>
                                    {months[index]}
                                </Select.Option>,
                            )
                        }
                        const month = value.month()
    
                        const year = value.year()
                        const options = []
                        for (let i = year - 3; i <= year+5; i += 1) {
                            options.push(
                                <Select.Option key={i} value={i} className="year-item">
                                    {i}
                                </Select.Option>,
                            )
                        }
            
                        return (
                            <div style={{ padding: 10 }}>
                                <h3 style={{ marginBottom: "10px" }}>Attendance Sheet </h3>
                                <Row type="flex" justify="space-between">
                                    <Col>
                                        <Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                                            <Button value="month">Month</Button>
                                            <Button value="year">Year</Button>
                                        </Group>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            dropdownMatchSelectWidth={false}
                                            className="my-year-select"
                                            onChange={newYear => {
                                                const now = value.clone().year(newYear)
                                                onChange(now)
                                            }}
                                            value={String(year)}
                                        >
                                            {options}
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            dropdownMatchSelectWidth={false}
                                            value={String(month)}
                                            onChange={selectedMonth => {
                                                const newValue = value.clone()
                                                newValue.month(parseInt(selectedMonth, 10))
                                                onChange(newValue)
                                            }}
                                        >
                                            {monthOptions}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }}
                    onPanelChange={this.onPanelChange}
                />
            </div>
        )
    }

    render(){
        return( 
            <Card
                hoverable
                style={{ width: 300, backgroundColor:"#FAFAFA" }}
                cover={<this.renderCalendar/>}
            >
                <Meta title="Student Name" style={{marginBottom: 5}}/>
                <ul className="additional" style={{marginBottom:0}}>
                    <li><span>Total Classes</span>&nbsp;&#58;&nbsp;&nbsp;<span>16</span></li>
                    <li><span>Classes Attended</span>&nbsp;&#58;&nbsp;&nbsp;<span>9</span></li>
                    <li><span>Classes Absent</span>&nbsp;&#58;&nbsp;&nbsp;<span>7</span></li>
                </ul>
            </Card>
            
        )
    }
}