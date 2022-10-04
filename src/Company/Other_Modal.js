import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Modal_Info from "./Other_Modal_Info"
import Modal_Product from './Other_Modal_Catalog'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function Other_Modal({name, company_id,company_type,productList,finanData,cooperateList,catalogList }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => { 
    setValue(newValue);
  };
  return (
    <div>
      <Button onClick={handleOpen}>More Info</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="公司資訊" value="1" />
            <Tab label="產品目錄" value="2" />
            {/* <Tab label="區塊練資訊" value="3" /> */}
          </TabList>
        </Box>
        <TabPanel value="1"><Modal_Info company_ID={company_id} name={name}  company_type={company_type}  productList={productList}  finanData={finanData} cooperateList={cooperateList} /></TabPanel>
        <TabPanel value="2"><Modal_Product company_ID={company_id} name={name} catalogList={catalogList}/></TabPanel>
        {/* <TabPanel value="3">這一頁還沒建</TabPanel> */}
      </TabContext>
        </Box>
      </Modal>
    </div>
  )
};



