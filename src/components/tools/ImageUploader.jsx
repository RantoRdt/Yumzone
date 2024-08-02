import React from "react";
import { Controller } from "react-hook-form";
import { IconButton, Stack, Box } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const ImageUploader = ({control, name, error, required=false, id, onChange, file}) =>{
    return <Stack width='30%' style={{aspectRatio: '1/1', alignItems: 'center', justifyContent: 'center', border: `1px solid ${error ? '#f00' : '#555'}`, overflow:'hidden', borderRadius: '50%'}}>
        {
            file ? <Box component="img" src={URL.createObjectURL(file)} style={{height: '80%', width: '80%'}}/>
            : <IconButton style={{width: '100%', height: '100%'}} onClick={()=> document.getElementById(id).click()}><AddPhotoAlternateIcon/></IconButton>
        }
        <Controller
            control={control} name={name}
            rules={{ required: required }}
            defaultValue=''
            render={({field: { onChange: fieldOnChange, ...rest }}) => 
                <input
                    type="file"
                    id={id}
                    accept="image/*"
                    style={{display: 'none'}}
                    {...rest}
                    onChange={e =>{
                        onChange(e.target.files[0])
                        fieldOnChange(e)
                    }}
                />
        }
        />
    </Stack>
}
export default ImageUploader