import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { setIsDashBoardVisible } from '../../redux-action/action';
import './style.css';
function SearchBody(props) {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const navigateTo = () => history.push('/patient');//eg.history.push('/login');
  useEffect(()=>{

  },[])
  

  const _handleKey = (e)=>{
    if (e.key === 'Enter') {
      setIsLoading(true);
      setIsLoading(false);
      dispatch(setIsDashBoardVisible(true));
    }
  }

  return (
    <div className='search-body'>

        <div className='search-title'>
            <p>Select patient</p>
        </div>

      <div className='search-box'>
      <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search Patient Id."
          onKeyDown={_handleKey}
        />
      </div>

      {
        isLoading &&
        <div className='loader' >
        <ClipLoader
        color={'rgba(0,0,0,0.09)'}
        loading={isLoading}
        // cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
        </div>
        
      }

    </div>
  )
}

const mapStateToProps=(state)=>{
  console.log("state  ",state.AppData);
}

export default connect(mapStateToProps)(SearchBody);

