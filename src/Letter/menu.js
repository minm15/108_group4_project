import React from "react";
import {
  Create, MailOutline, DraftsOutlined, ForwardToInboxOutlined,
  ExpandLess, ExpandMore
} from "@mui/icons-material";
import {
  List, ListItemButton, ListItemIcon, ListItemText, Collapse, Box
} from "@mui/material";
import { Link } from "react-router-dom";
// import { ThemeProvider } from '@mui/material/styles';
// import {list} from '../component/test';
// import { createTheme } from '@mui/material/styles';


/*const list = createTheme({
    
    overrides: {
      MuiList: {
        root: {
          backgroundColor: "yellow",
          "&$selected": {
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "orange",
            },
          },
        },
        button: {
          "&:hover": {
            backgroundColor: "yellow",
          },
        },
      },
    },
  });*/
function MenuList() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };


  return (
    //<ThemeProvider theme={list}>

    <List component="nav" sx={{
      bgcolor: '#FDF1EF', "&$selected": {
        backgroundColor: "red"
      }
    }}>
      <ListItemButton sx={{ "&:hover": { backgroundColor: "#E4513D", borderRadius: 5 } }} component={Link} to="/letter_writing" >
        <ListItemIcon sx={{ "&:hover": { color: "#ffffff" } }}>
          <Create />
        </ListItemIcon>
        <ListItemText primary="撰寫信件" disableTypography sx={{
          color: '#350D08', fontFamily: 'Noto Sans TC',
          fontSize: '18px', fontWeight: '400', lineHeight: '35px', letterSpacing: '0em', textAlign: 'left', "&:hover": { color: '#ffffff' }
        }} />
      </ListItemButton>

      <ListItemButton
        sx={{
          "&:hover": { backgroundColor: "#E4513D" },
          "&$selected": { backgroundColor: "#E4513D" }
        }}
        onClick={handleClick}
        component={Link} to="/letter_list"
      >
        <ListItemIcon sx={{ "&:hover": { color: "#ffffff" } }}>
          <MailOutline />
        </ListItemIcon>
        <ListItemText primary="所有信件" disableTypography sx={{
          color: '#350D08', fontFamily: 'Noto Sans TC',
          fontSize: '18px', fontWeight: '400', lineHeight: '35px', letterSpacing: '0em', textAlign: 'left', "&:hover": { color: '#ffffff' }
        }} />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              "&:hover": { backgroundColor: "#E4513D" },
              "&$selected": { backgroundColor: "#E4513D" }
            }}
            component={Link} to={
              JSON.parse(localStorage.getItem('user')).type === '供應' ?
                "/letter_list/quotation_request" :
                "/letter_list/quotation"
            }
          >
            <ListItemText primary={
              JSON.parse(localStorage.getItem('user')).type === '供應' ?
                "報價請求" : "報價單"}
              disableTypography sx={{
                fontFamily: 'Noto Sans TC',
                fontSize: '18px', fontWeight: '400', lineHeight: '35px', letterSpacing: '0em', textAlign: 'left'
              }} />
          </ListItemButton>
          <ListItemButton
            sx={{
              "&:hover": { backgroundColor: "#E4513D" },
              "&$selected": { backgroundColor: "#E4513D" }
            }}
            component={Link} to="/letter_list/negotiate"
          >
            <ListItemText primary="訂單協商" disableTypography sx={{
              fontFamily: 'Noto Sans TC',
              fontSize: '18px', fontWeight: '400', lineHeight: '35px', letterSpacing: '0em', textAlign: 'left'
            }} />
          </ListItemButton>
          <ListItemButton
            sx={{
              "&:hover": { backgroundColor: "#E4513D" },
              "&$selected": { backgroundColor: "#E4513D" }
            }}
            component={Link} to="/letter_list/operation"
          >
            <ListItemText primary="繳費通知" disableTypography sx={{
              fontFamily: 'Noto Sans TC',
              fontSize: '18px', fontWeight: '400', lineHeight: '35px', letterSpacing: '0em', textAlign: 'left'
            }} />
          </ListItemButton>
          <ListItemButton
            sx={{
              "&:hover": { backgroundColor: "#E4513D" },
              "&$selected": { backgroundColor: "#E4513D" }
            }}
            component={Link} to={
              JSON.parse(localStorage.getItem('user')).type === '供應' ?
                "/letter_list/igd" : "/letter_list/purchase"}
          >
            <ListItemText primary={
              JSON.parse(localStorage.getItem('user')).type === '供應' ?
                "採購合約" : "採購訂單"}
              disableTypography sx={{
                fontFamily: 'Noto Sans TC',
                fontSize: '18px', fontWeight: '400', lineHeight: '35px', letterSpacing: '0em', textAlign: 'left'
              }} />
          </ListItemButton>
          {/* <ListItemButton
          sx={{
            "&:hover": { backgroundColor: "#E4513D" },
            "&$selected": { backgroundColor: "#E4513D" }
          }}
          component={Link} to="/letter_list/contract"
          >
            <ListItemText primary="現有訂單" disableTypography sx={{
              fontFamily: 'Noto Sans TC',
              fontSize: '18px', fontWeight: '400', lineHeight: '35px', letterSpacing: '0em', textAlign: 'left'
            }} />
          </ListItemButton> */}
        </List>
      </Collapse>
      <List component="div" disablePadding>
        {/* <ListItemButton>
          <ListItemIcon>
            <DraftsOutlined />
          </ListItemIcon>
          <ListItemText primary="歷史信件" disableTypography sx={{
            fontFamily: 'Noto Sans TC',
            fontSize: '18px', fontWeight: '400', lineHeight: '35px', letterSpacing: '0em', textAlign: 'left'
          }} />
        </ListItemButton> */}
        <ListItemButton
          sx={{
            "&:hover": { backgroundColor: "#E4513D" },
            "&$selected": { backgroundColor: "#E4513D" }
          }}
          component={Link} to="/letter_list/sent"
        >
          <ListItemIcon>
            <ForwardToInboxOutlined />
          </ListItemIcon>
          <ListItemText primary="寄件備份" disableTypography sx={{
            fontFamily: 'Noto Sans TC',
            fontSize: '18px', fontWeight: '400', lineHeight: '35px', letterSpacing: '0em', textAlign: 'left'
          }} />
        </ListItemButton>
      </List>
    </List>

  );
}

export default MenuList;