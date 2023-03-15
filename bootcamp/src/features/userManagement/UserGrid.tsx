import * as React from 'react';
import Box from '@mui/material/Box';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import { getAllUsers } from '../../data/UserApi';
import { Profile, User } from '../../models/UserProfileModel';
import API from "../../data/apiConfig";
import { AxiosError } from "axios";
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'id',
        width: 150,
        editable: false,
        hideable: true
      },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 190,
      editable: true,
    },
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
            width: 130,
      editable: true,
    }
  ];

export default function UserGrid() {
    const [isInitialized, setInitialized] = React.useState(false);
    const [users, setUsers] = useState([]);    
    
    async function fetchData() {
        const API_URL = '/users/';
        let response = await API.get(API_URL + 'getAll');  
        let users = response.data.users;
        setUsers(users);
        console.log(users);
      }
      
    useEffect(() => {
        fetchData();
    }, []);
      
	

  return (
    <Box sx={{ height: 400, width: '100%' }}>
    
    <DataGrid
        rows={users}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
