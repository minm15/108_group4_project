import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {


  KeyboardCapslock
} from "@mui/icons-material";


/*levelList=[1,2,3,4,5] 依照 倉儲>生產>品質>商品>工廠的順序紀錄各設施目前的等級(lv1~lv5)
service紀錄設施的名稱 levelNo紀錄要升級的話要改的是levelList中的哪一個 
*/
export default function Service_Modal({ nowLevel, service, levelNo }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState('1');
  const level = parseInt(nowLevel);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <div>
      <Button onClick={handleOpen} sx={{
      }}><KeyboardCapslock />升級</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <p>
          {(() => {
            switch (level) {
              case 5: return (<Level5 />);
              default: return (<Upgrade handleClose={handleClose} level={level} service={service} levelNo={levelNo}/>);
            }
          })()}
        </p>
      </Dialog>
    </div>
  )

};




const Upgrade = ({ handleClose, level, service, levelNo }) => {
  const handleUpgrade = () => {
    let user_list = JSON.parse(localStorage.getItem('user'));
    user_list.levelList.splice(levelNo, 1, level+1);
    localStorage.setItem('user', JSON.stringify(user_list));
    let company_list = JSON.parse(localStorage.getItem('company_list'));
    company_list = company_list.map(
      (company) => {
        if (company.name === user_list.name) {
          company.levelList.splice(levelNo, 1, level+1);
          return company;
        } else {
          return company;
        }
      }
    );
    localStorage.setItem('company_list', JSON.stringify(company_list));
    handleClose();
    window.location.href = `../Company_Service`;
  };
  return (
    <div >
      <DialogTitle>
        將<b>{service}</b>從<b>lv{level}</b>升級到<b>lv{level + 1}</b>?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleUpgrade}>是</Button>
        {/* 後端
          levelList[levelNo]++ 
          */}
        <Button onClick={handleClose} > 否 </Button>
      </DialogActions>
    </div>
  )
};

const Level5 = ({ }) => (
  <div >
    <DialogTitle>
      已達到lv5，無法再進行升級。
    </DialogTitle>
  </div>
);
