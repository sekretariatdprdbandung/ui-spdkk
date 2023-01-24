import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/system';
import { Grid, Box, Stack, Typography, IconButton, Button, Tooltip, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import Swal from 'sweetalert2';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// project imports
import CardCount from 'ui-component/Card/CardCount';
import Modal from 'ui-component/extended/Modal';
import Form from './form';

// API
import { API } from 'config/API';

export default function UserManagement() {
  const theme = useTheme();

  // data
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [length, setLength] = useState({
    superAdmin: 0,
    admin: 0,
  });

  const getUsers = async () => {
    try {
      const responseUsers = await API.get('/user/get-users');
      const responseRole = await API.get('/user/get-users-role');

      if (responseUsers.data.status === 'Success' && responseRole.data.status === 'Success') {
        setLength({
          superAdmin: responseRole.data.data.superAdmin,
          admin: responseRole.data.data.admin,
        });
        setData(responseUsers.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // delete data
  const deleteData = ({ id }) => {
    Swal.fire({
      icon: 'question',
      title: 'Konfirmasi',
      text: 'Anda yakin ingin menghapus user tersebut?',
      showDenyButton: true,
      confirmButtonText: 'Iya',
      denyButtonText: `Batal`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };
  const handleDelete = async (id) => {
    try {
      // config
      const config = {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic ' + localStorage.token,
        },
      };

      // API delete
      const response = await API.delete(`/user/delete-user/${id}`, config);

      // response
      if (response.data.status === 'Success') {
        Swal.fire({
          title: 'Berhasil',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'Oke',
        });
        setLoading(true);
        getUsers();
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Oke',
      });
      console.log(error);
    }
  };

  // modal
  const [openModal, setOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('add');

  // Data Table
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 70,
      align: 'center',
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'name',
      headerName: 'Nama',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => params.row.name || '-',
    },
    {
      field: 'email',
      headerName: 'Email',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
      renderCell: (params) => params.row.email || '-',
    },
    {
      field: 'role',
      headerName: 'Role',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (params.row.role === 0) {
          return 'Super Admin';
        } else {
          return 'Admin';
        }
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (params.row.status === 0) {
          return 'Aktif';
        } else {
          return 'Tidak Aktif';
        }
      },
    },
    {
      field: 'aksi',
      headerName: 'Aksi',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            {/* edit btn */}
            <Tooltip
              title="Ubah Data"
              sx={{
                fontSize: { sm: '2rem', md: '2.2rem' },
                cursor: 'pointer',
                color: theme.palette.primary.main,
              }}
            >
              <span>
                <IconButton
                  onClick={() => {
                    setOpenModal(true);
                    setModalTitle('Ubah Data Pengguna');
                    setMode('edit');
                    setDataEdit(params.row);
                  }}
                >
                  <EditIcon
                    sx={{
                      fontSize: { sm: '2rem', md: '2.2rem' },
                      cursor: 'pointer',
                      color: theme.palette.primary.main,
                      '&:hover': {
                        color: '#2c2c2c',
                      },
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>

            {/* hapus btn */}
            <Tooltip
              title="Hapus Data"
              sx={{
                fontSize: { sm: '2rem', md: '2.2rem' },
                cursor: 'pointer',
                color: theme.palette.primary.main,
              }}
            >
              <span>
                <IconButton
                  disabled={params.row.role === 0 && params.row.id === 1 ? true : false}
                  onClick={() => {
                    deleteData(params.row);
                  }}
                >
                  <DeleteIcon
                    sx={{
                      fontSize: { sm: '2rem', md: '2.2rem' },
                      cursor: 'pointer',
                      color: theme.palette.primary.main,
                      '&:hover': {
                        color: '#2c2c2c',
                      },
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {/* loading */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="93vh">
              <Stack justifyContent="center" alignItems="center" spacing={7}>
                <CircularProgress />
                <Typography>Sedang Memuat Data</Typography>
              </Stack>
            </Box>
          ) : (
            <Stack>
              <Box>
                <Typography variant="h3" sx={{ fontSize: { sm: '1.8rem' } }}>
                  Managemen Pengguna
                </Typography>
              </Box>
              <Box display="flex" alignContent="center" justifyContent="center" gap={2} pt={5}>
                {/* card */}
                <CardCount count={length?.superAdmin} title="Super Admin" />
                {/* card */}
                <CardCount count={length?.admin} title="Admin" />
              </Box>

              {/* content  */}
              <Stack mt={5}>
                {/* header */}
                <Box display="flex" flexDirection="row" justifyContent="space-between" alignContent="center">
                  <Typography variant="h3"></Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: '1.5rem' }}
                    onClick={() => {
                      setOpenModal(true);
                      setMode('add');
                      setModalTitle('Tambah Pengguna Baru');
                    }}
                  >
                    Tambah Data
                  </Button>
                </Box>
                {/* content */}
                {/* data */}
                <Box mt={4}>
                  <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    autoHeight
                    sx={{ fontSize: { sm: '1rem', md: '1rem' }, textAlign: 'center' }}
                  />
                </Box>
              </Stack>
            </Stack>
          )}
        </Grid>
      </Grid>

      {/* modal */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title={modalTitle}
      >
        <Form
          onClose={() => {
            setOpenModal(false);
            setLoading(true);
            getUsers();
          }}
          dataEdit={dataEdit}
          mode={mode}
        />
      </Modal>
    </>
  );
}
