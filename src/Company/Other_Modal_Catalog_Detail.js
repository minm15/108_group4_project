import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Modal_Info from "./Other_Modal_Info"
import Modal_Product from './Other_Modal_Catalog'
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import  Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
    ForwardToInbox,DriveFolderUpload,TurnedIn,TurnedInNot} from "@mui/icons-material";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 788,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY:"scroll"
}

export default function Other_Modal_Catalog_Detail({title, content,catalog_id }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [value, setValue] = React.useState('1');

  const handleLunch=(event)=>{};


  return (
    <div>
      <Button onClick={handleOpen}>查看目錄內容</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}> 

        <Paper elevation={3} sx={{width:768,bgcolor:'#FDF1EF'}}>
<Typography variant="h5" sx={{color:'black',fontWeight: 'bold'}}>
目錄名稱： {title}

</Typography>
    
        <Grid container spacing={1}>

        {content.map((row, index) => (
                <Grid item={3}>

   <ItemGrid product_name={row.product_name} product_price={row.product_price} product_tag={row.product_tag}
   product_desc={row.product_desc} product_level={row.product_level}>
    
   </ItemGrid>
                       </Grid>  

            ))}   
  
            </Grid>  
            </Paper>

             </Box>
      </Modal>
    </div>
  )
};



const ItemGrid = ({ product_name, product_price, product_tag,product_desc,product_level
}) => {
  var product_level_list="";
 for(let i=0;i<product_level.length;i++){
  product_level_list=product_level_list+product_level[i]+" ";
 }
          return (
  <Card  sx={{width:250,height:150,borderRadius: '10%' 
  }} >
            <Grid container spacing={0}>
<Grid item xs={6}>  <big> <b><TurnedIn/>{product_name}</b></big> </Grid>
<Grid item xs={6}> 售價：{product_price} </Grid>
</Grid>
   &emsp; 適用於：{product_tag}
    <br/>
    &emsp; 可提供品質： {product_level_list}級
   <br/>
   <Divider/>
     {product_desc}
    </Card>
  );
};