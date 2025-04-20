import React from 'react';
import { Modal } from '@mui/material';

const SearchPass = (props) =>{
    return (
        <div>
            <Modal visible={props.search_id_password} 
                    width="400" height="380"
                    effect="fadeInDown" 
                >
                This is Search Password
            </Modal>
        </div>
    );
  
}

export default SearchPass;