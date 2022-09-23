import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import CompanyDrawer from './Drawer';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import myProductList from "./data/myProductList"
import {Checkbox,FormControl,FormControlLabel,FormLabel} from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Catalog_Manaul from './Catalog_Manaul';
import Button from '@mui/material/Button';
import { v4 as uuidv4} from 'uuid'
import {
    ArrowUpward,DeleteForeverOutlined,CreateNewFolder
  } from "@mui/icons-material";
let renderCount = 0;

function Catalog_Add2() {
    const { register, control, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
          
          content: [{product_name: " ", product_price: "",product_level:"",product_tag:"",product_desc:"" }]
        }
      });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
        {
          control,
          name: "content"
        }
      );
    const onSubmit = data => console.log(data);
  renderCount++;

  const N =12; 
  const arr = Array.from({length: N}, (_, index) => index + 1);
  const uniqProductName=[];

  for (let i=0;i<myProductList.length;i++) {
     if(!uniqProductName.includes(myProductList[i].product_name)){
      uniqProductName.push(myProductList[i].product_name)
   }
   
}


    return (
    <Box sx={{ display: 'flex', my:'25px',}}>
     <CompanyDrawer/>
     <Box sx={{ flexGrow: 1 }}>


     <Grid container spacing={0}>
     <Grid item xs={7.6}> 
     <Box sx={{overflowY:"scroll",height:550,width:680}}>

     <form onSubmit={handleSubmit(onSubmit)}>
     <Grid container spacing={0}>
     <Grid item xs={3.5}> <Catalog_Manaul/></Grid>
     <Grid item xs={7.5}>
       目錄標題：<input type="text" placeholder="必填"   size="50"  {...register("title", { })} />
      </Grid>
      <Grid item xs={1}>    
      <button type="submit" value={uuidv4()}  {...register("catalog_id", { })}>繳交</button>
       </Grid>
</Grid>
      <ul> 
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
                <Grid container spacing={0}>
                <Grid item xs={11}>
                <Card variant="outlined" sx={{width:550,height:90}}>
                <Grid container spacing={0}>
                {index+1}

                <Grid item xs={4.5}> 

             <b></b>  商品名稱： <select　       name={`content[${index}]product_name`}   {...register((`content.${index}.product_name`))}> 
              <option value=" "></option>
                {uniqProductName.map((row) => (
                  <option value={row}>{row}</option>
                      ))}
                </select>
                </Grid>
                  <Grid item xs={7}> 

                &emsp;等級： <FormInputMultiCheckbox
                  control={control}
                  setValue={setValue}
                  name={`content[${index}]product_level`}
                  {...register((`content.${index}.product_level`))}
                />
              </Grid>
            
                <br></br>
                <Grid item xs={4.5}> 

               售價：<input type="text" name={`content[${index}]product_price`} placeholder="必填"   size="7.5" 
                  {...register((`content.${index}.product_price`))} />
                  </Grid>
                  <Grid item xs={7.5}> 

                適用於： <input type="text" name={`content[${index}]product_tag`} placeholder="非必填"  size="25"  
                {...register((`content.${index}.product_tag`))} />
                </Grid>
                </Grid>
                <Grid item xs={12}> 

            簡介： <textarea  name={`content${index}product_desc`} rows="1"cols="55"  placeholder="非必填。"   
                  {...register((`content.${index}.product_desc`))}/>   
                         </Grid>

             </Card> 
             </Grid>
             <Grid item xs={1}>
             <Button  onClick={() => swap(index, index-1)}>
              <ArrowUpward/> 
            </Button>
            <br></br>
              <Button onClick={() => remove(index)}>
              <DeleteForeverOutlined/>
              </Button>
             
            </Grid></Grid>
            </div>
          );
        })}
      </ul>
      <section>
        <Button
          onClick={() => {
            append({  product_name: " ", product_price: "",product_level:"",product_tag:"",product_desc:"" });
          }}
        >
          <CreateNewFolder/>
        </Button>
       

      
      </section>

    </form>
    </Box>
    </Grid>
    <Grid item xs={4}>
    產品資訊 <Box sx={{overflowY:"scroll",height:530,width:340}}>
        <MyProduct/>
        </Box>

    </Grid> 

    </Grid>
  
  
    

  
 
    </Box>
</Box>
  );
}
export default Catalog_Add2;

const MyProduct=({})=>{

  return(
    <div>
    {myProductList.map((row) => (
      <Card variant="outlined" sx={{height:80,width:330}}>
     <Grid container spacing={0}>
     <Grid item xs={4}> 

   <big><b> {row.product_name}</b>  </big>
      </Grid>
      <Grid item xs={8}> 

      適用於：{row.product_tag}
      </Grid>
      </Grid>
      <Grid container spacing={0}>
     <Grid item xs={6}> 

      生產成本：{row.product_cost}
      </Grid>
      <Grid item xs={6}> 
      市場平均：{row.product_mean}
      </Grid>
      </Grid>
      <Grid container spacing={0}>
     <Grid item xs={3}> 
      庫存：
      </Grid>
      <Grid item xs={9}> 
    {row.stock.map((row1) => (
      <>
      {row1.rank}({row1.amount})&ensp;

      </>

          ))}
      </Grid>
      </Grid>

      </Card>

          ))}
        </div>  
  )};




const FormInputMultiCheckbox= ({name,control,setValue,label}) => {
  const options = [
    {
      label: "A",
      value: "A",
    },
    {
      label: "B",
      value: "B",
    },
    {
      label: "C",
      value: "C",
    },
    {
      label: "D",
      value: "D",
    },
    {
      label: "E",
      value: "E",
    },
  ];
  

  const [selectedItems, setSelectedItems] = useState([]);

  // we are handling the selection manually here
  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  // we are setting form value manually here
  useEffect(() => {
    setValue(name, selectedItems); 
  }, [selectedItems]);

  return (
    <FormControl size={"small"} variant={"outlined"}>
      <FormLabel component="legend">{label}</FormLabel>

      <div>
        {options.map((option) => {
          return (
            <FormControlLabel 
              control={
                <Controller 
                  name={name}
                  render={({}) => {
                    return (
                      <Checkbox 
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                        // size="small"
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}

                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </div>
    </FormControl>
  );
};

