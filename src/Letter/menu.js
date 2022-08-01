import React from "react";
import {
    Create, MailOutline, DraftsOutlined, ForwardToInboxOutlined,
    ExpandLess, ExpandMore
} from "@mui/icons-material";
import {
    List, ListItemButton, ListItemIcon, ListItemText, Collapse
} from "@mui/material";

function MenuList() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List component="nav" >
            <ListItemButton>
                <ListItemIcon>
                    <Create />
                </ListItemIcon>
                <ListItemText primary="撰寫信件" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <MailOutline />
                </ListItemIcon>
                <ListItemText primary="所有信件" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open}>
                <List component="div" disablePadding>
                    <ListItemButton>
                        <ListItemText primary="報價請求" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="訂單協商" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="繳費通知" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="採購合約" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="現有訂單" />
                    </ListItemButton>
                </List>
            </Collapse>
            <List component="div" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <DraftsOutlined />
                    </ListItemIcon>
                    <ListItemText primary="歷史信件" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <ForwardToInboxOutlined />
                    </ListItemIcon>
                    <ListItemText primary="寄件備份" />
                </ListItemButton>
            </List>
        </List>
    );
}

export default MenuList;