import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

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
import FormAdmin from './FormAdmin';

// API
import { API } from 'config/API';

export default function Dashboard() {
  const theme = useTheme();
  let navigate = useNavigate();

  // open data
  const [openDetail, setOpenDetail] = useState(false);
  const [selected, setSelected] = useState('');

  // data
  const [openAlert, setOpenAlert] = useState(false);
  const [getData, setGetData] = useState([]);
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

  const handleOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
    setGetData('');
  };

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
        {
          handleDelete(id);
        }
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
      flex: 2,
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
                fontSize: '22px',
                cursor: 'pointer',
                color: theme.palette.primary.main,
              }}
            >
              <IconButton
                onClick={() => {
                  setOpenModal(true);
                  setModalTitle('Ubah Data Admin');
                  setMode('edit');
                  setDataEdit(params.row);
                }}
              >
                <EditIcon
                  sx={{
                    fontSize: '22px',
                    cursor: 'pointer',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      color: '#2c2c2c',
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
            {/* hapus btn */}
            <Tooltip
              title="Hapus Data"
              sx={{
                fontSize: '22px',
                cursor: 'pointer',
                color: theme.palette.primary.main,
              }}
            >
              <IconButton
                onClick={() => {
                  deleteData(params.row);
                }}
              >
                <DeleteIcon
                  sx={{
                    fontSize: '22px',
                    cursor: 'pointer',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      color: '#2c2c2c',
                    },
                  }}
                />
              </IconButton>
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
                <Typography variant="h3">User Management</Typography>
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
                  <Typography variant="h3">User</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: '1.5rem' }}
                    onClick={() => {
                      setOpenModal(true);
                      setMode('add');
                      setModalTitle('Tambah Admin Baru');
                    }}
                  >
                    Tambah Data
                  </Button>
                </Box>
                {/* content */}
                {/* data */}
                <Box mt={4}>
                  <DataGrid rows={data} columns={columns} pageSize={6} rowsPerPageOptions={[6]} autoHeight />
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
        <FormAdmin
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
