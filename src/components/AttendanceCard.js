import React, { Component } from "react"
import { Card, Calendar, Select, Radio, Col, Row, Popconfirm } from "antd"
import "./AttendanceCard.scss"
import { iteratee } from "lodash"

const { Meta } = Card
const { Group, Button } = Radio

let attendancePresent = [
    "01/09/2020",
    "05/09/2020",
    "08/09/2020",
    "10/09/2020",
    "15/09/2020",
    "19/09/2020",
    "04/08/2020",
    "18/08/2020",
]

let attendanceAbsent = [
    "03/09/2020",
    "12/09/2020",
    "17/09/2020",
    "20/08/2020",
    "15/08/2020",
]

function addAttendancePresent(value){
    let date =value.toDate().toLocaleDateString("en-GB")
    attendanceAbsent.includes(date) && attendanceAbsent.splice(attendanceAbsent.findIndex(e => e === date),1)
    attendancePresent.push(date)
    // console.log(attendancePresent, attendanceAbsent)
}

function addAttendanceAbsent(value){
    let date =value.toDate().toLocaleDateString("en-GB")
    attendancePresent.includes(date) && attendancePresent.splice(attendancePresent.findIndex(e => e === date),1)
    attendanceAbsent.push(date)
    // console.log(attendancePresent, attendanceAbsent)
}

function resetAttendance(value, type){
    let date = value.toDate().toLocaleDateString("en-GB")
    type === "P" && attendancePresent.splice(attendancePresent.findIndex(e => e === date),1)
    type === "A" && attendanceAbsent.splice(attendanceAbsent.findIndex(e => e === date),1)
    // console.log(attendancePresent, attendanceAbsent)
}
export default class AttendanceCard extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }     
    
    onPanelChange(value, mode) {
        console.log(value, mode)
    }

    // onSelect(value){                    
    // let date = value.toDate().toLocaleDateString("en-GB")
    // !attendancePresent.includes(date) && attendancePresent.push(date)
    // console.log(attendancePresent)
    // }

    dateCellRender(value){
        let date = ("0"+value.date()).slice(-2)
        let Present = attendancePresent.includes(value.toDate().toLocaleDateString("en-GB"))
        let Absent = attendanceAbsent.includes(value.toDate().toLocaleDateString("en-GB"))
        if(Present)
            return(
                <Popconfirm
                    title="Register Attendance"
                    okText="Reset"
                    cancelText="Absent"
                    onConfirm={()=>resetAttendance(value,"P")}
                    onCancel={()=>addAttendanceAbsent(value)}
                >
                    <div className="ant-fullcalendar-date">
                        <div className="ant-fullcalendar-value" style={{background: "#b7eb8f"}} >{date}</div>
                        <div className="ant-fullcalendar-content"/>
                    </div>
                </Popconfirm>
            )
        
        if(Absent)
            return(
                <Popconfirm
                    title="Register Attendance"
                    okText="Reset"
                    cancelText="Present"
                    onConfirm={()=>resetAttendance(value,"A")}
                    onCancel={()=>addAttendancePresent(value)}
                >
                    <div className="ant-fullcalendar-date">
                        <div className="ant-fullcalendar-value" style={{background:"#ffa39e"}}>{date}</div>
                        <div className="ant-fullcalendar-content"/>
                    </div>
                </Popconfirm>
            )

        if(!Present||!Absent)
            return(
                <Popconfirm
                    title="Register Attendance"
                    okText="Present"
                    cancelText="Absent"
                    onConfirm={(e)=>addAttendancePresent(value)}
                    onCancel={()=>addAttendanceAbsent(value)}
                >
                    <div className="ant-fullcalendar-date">
                        <div className="ant-fullcalendar-value" >{date}</div>
                        <div className="ant-fullcalendar-content"/>
                    </div>
                </Popconfirm>
            )
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
                    onSelect={this.onSelect}
                    dateFullCellRender={this.dateCellRender}
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
                    <li><span>Total Classes</span>&nbsp;&#58;&nbsp;&nbsp;<span>{attendancePresent.length + attendanceAbsent.length}</span></li>
                    <li><span>Classes Attended</span>&nbsp;&#58;&nbsp;&nbsp;<span>{attendancePresent.length}</span></li>
                    <li><span>Classes Absent</span>&nbsp;&#58;&nbsp;&nbsp;<span>{attendanceAbsent.length}</span></li>
                </ul>
            </Card>
            
        )
    }
}