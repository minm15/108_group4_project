import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import  Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';


import CompanyDrawer from './Drawer';
import CustomerModal from './Other_Modal'
import CardHeader from '@mui/material/CardHeader';
import {ChatBubbleOutline,Email,KeyboardArrowLeft,KeyboardArrowRight,KeyboardArrowDown,KeyboardArrowUp} from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import companyList from "./data/companyList.js"
import productList from "./data/productList.js"


function Company_Other() {
  const [selectedProduct, setSelectedProduct] = useState("total"); //預設選項
// ref：倒數第三 https://stackoverflow.com/questions/52182673/how-to-set-default-value-in-material-ui-select-box-in-react 


  const [cotypes, setCotypes] = useState([
    { id: 1, checked: true, label: '供應' },
    { id: 2, checked: true, label: '製造' },
    { id: 3, checked: true, label: '材料' },
    { id: 4, checked: true, label: '車商' },


  ]);

  const [list, setList] = useState(companyList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');


const [rightshow2, setrightshow2] = useState(false);

const handleSelectProduct = (event, value) =>
!value ? null : setSelectedProduct(event.target.value);

  const handleChangeChecked = (id) => {
    const cotypesStateList = cotypes; 
    const changeCheckedCotypes = cotypesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCotypes(changeCheckedCotypes);
  };
 


  const applyFilters = () => {
    let updatedList = companyList;

    if (selectedProduct!="total") {
      updatedList = updatedList.filter(
        (item) => item.company_id===selectedProduct 
      );
    }
    const cotypesChecked = cotypes 
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (cotypesChecked.length) {
      updatedList = updatedList.filter((item) => 
      cotypesChecked.includes(item.company_type) 
      );
    }

    if (searchInput) {
      updatedList = updatedList.filter(
        (item) => 
          item.name.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1 
    

      );
    } 
    setList(updatedList);
    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };  

  useEffect(() => {
    applyFilters();
  }, [ selectedProduct,cotypes, searchInput]);

    return (
    <Box sx={{ display: 'flex', my:'25px',}}>
     <CompanyDrawer/>

     <Box sx={{ flexGrow: 1 ,ml:'25px'}}>
     <div align="center"> 

       
   <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
                {
                    rightshow2 === true ?
                        <KeyboardArrowDown onClick={
                            () => {
                                setrightshow2(false)
                            }
                        } /> 
                        :
                        <div>
                             <KeyboardArrowUp onClick={
                                () => { 
                                    setrightshow2(true)
                                }
                            } />
                            <Card  sx={{width:600,height:150,bgcolor:'black',color:'white', borderRadius: 3}}> 
            <div align="left">
            <FilterPanel 
            cotypes={cotypes} 
            changeChecked={handleChangeChecked}
            selectedProduct={selectedProduct}
            selectProduct={handleSelectProduct}
          />
          </div>
          <div align="left">

          </div>
          
                 </Card>             
          
                        </div>
                }
              
              </div>        
     
       

        <div>


          {resultsFound ? <List list={list} /> 
          :<div> No result </div>
  }
      {/* </Grid> */}
        {/* </Grid> */}
        </div>
    
    </Box>
</Box>
  );
}
export default Company_Other;


const SearchBar = ({ value, changeInput }) => (
  <div className='searchBar-wrap'>
    查詢：&emsp;
    <input
      type='text'
      placeholder='搜尋公司名'
      value={value}
      onChange={changeInput} 
    />
  </div>
);



const FilterPanel = ({
  cotypes, 
  changeChecked,

  selectedProduct,
  selectProduct,

}) => (
<>
    <div className='input-group'>
      &emsp;   類型：&emsp;
    {cotypes.map((cotype) => (

        <CheckboxProton
          key={cotype.id} 
          cotype={cotype}
          changeChecked={changeChecked}
        />
             

      ))} 
    </div>
   <div>
    {/*先寫下來佔位子，之後如果不需要就拿掉*/}
   &emsp;   公司實力： 
   {cotypes.map((cotype) => (
<CheckboxProton
  key={cotype.id} 
  cotype={cotype}
  changeChecked={changeChecked}
/>
))} 
   </div>
    <div className='input-group'>
    &emsp;   提供商品：&emsp;      
    <FilterListToggle 
        options={productList}
        value={selectedProduct}
        selectToggle={selectProduct}
      />
     先用公司ID測試篩選功能
    </div>
    </>

);
const CheckboxProton = ({ changeChecked, cotype }) => {
  const { checked, label, id } = cotype;
  return (
      <FormControlLabel
    
        control={
          <Checkbox

            size='small'
            checked={checked}
            onChange={() => changeChecked(id)}
           inputProps={{ 'aria-label': 'checkbox with small size' }}

          />
        }
        label={label}
      />
  );
};
const List = ({ list }) => (
  <div className='list-wrap'>
    <Grid container spacing={2}>

    {list.map((row, index) => (
              <Grid item xs={3}>

      <ListItem key={row.company_id} item={row} />
      </Grid>
    ))}
       </Grid>

  </div>
);
const ListItem = ({
  item: {name, company_id,company_type },
}) => (
     <Card variant="outlined" sx={{width:250,height:200}}>
        <CardHeader
        action={
          <>
          <div>
        <Button >
         <ChatBubbleOutline />
        </Button>
        </div>
        <div>
          <Button  >
          <Email />
         </Button>
         </div>
         </>
            } 
            title={name} />
                <div align="center">id: {company_id}</div>
                <div align="center" >{company_type}</div>

                <CustomerModal name={name} company_id={company_id }company_type={company_type} />

              </Card>
  
);


const FilterListToggle = ({ options, value, selectToggle }) => {
  return (
    <FormControl >

    <Select 
      value={value}
      exclusive
      onChange={selectToggle}
      sx={{bgcolor:'white'}}
      defaultValue={"total"}
    >
      {options.map(({ label, id, value }) => (
        <MenuItem  key={id} value={value}       
        >
          商品{label}
        </MenuItem >
      ))}
    </Select>
    </FormControl>

  );
};

