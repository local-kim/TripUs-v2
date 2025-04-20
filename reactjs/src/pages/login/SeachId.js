import React from 'react';
import { Modal } from '@mui/material';

const SearchId = (props) =>{
    return (
        <div>
            <Modal visible={props.search_id_modal} 
                    width="400" height="380"
                    effect="fadeInDown" 
                >
                This is Search ID
            </Modal>
        </div>
    );
  
}

export default SearchId;