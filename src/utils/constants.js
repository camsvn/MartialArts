import React from "react"
import {
    CheckOutlined,
    BookOutlined,
    UserOutlined,
    HomeOutlined,
    CalendarOutlined,
} from "@ant-design/icons"

export const MAIN_NAV_MENU = [
    { title: "Home", path: "/" ,icon: <HomeOutlined /> },
    { title: "Attendance", path: "attendance", icon: <CheckOutlined /> },
    { title: "Library", path: "library", icon: <BookOutlined /> },
    { title: "Belt Test", path: "belttest" },
    { title: "Events", path: "events", icon: <CalendarOutlined /> },
    { title: "My Profile", path: "myprofile", icon: <UserOutlined /> },
    { title: "Add Events", path: "addevents", highlight:"events", nolink: true, icon: <UserOutlined /> },
    { title: "Edit Profile", path: "editprofile", highlight:"myprofile", nolink: true, icon: <UserOutlined /> },
    { title: "Add Course", path: "addcourse", highlight:"library", nolink: true, icon: <UserOutlined /> },
]
