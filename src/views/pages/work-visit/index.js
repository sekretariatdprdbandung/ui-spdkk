import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/system';
import { Grid, Box, Stack, Typography, IconButton, Button, Tooltip, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import Swal from 'sweetalert2';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

// project imports
import CardCount from 'ui-component/Card/CardCount';
import Detail from 'ui-component/extended/Detail';
import Modal from 'ui-component/extended/Modal';
import Form from './form';

// API
import { API } from 'config/API';

export default function UserManagement() {
  const theme = useTheme();

  // open data
  const [openDetail, setOpenDetail] = useState(false);
  const [selected, setSelected] = useState('');

  // delete data
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getWorkVisit = async () => {
    try {
      setLoading(true);
      const response = await API.get('/work-visit/get-work-visits');

      if (response.data.status === 'Success') {
        setData(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkVisit();
  }, []);

  // modal
  const [openModal, setOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('add');

  // delete data
  const deleteData = ({ id }) => {
    Swal.fire({
      icon: 'question',
      title: 'Konfirmasi',
      text: 'Anda yakin ingin menghapus data tersebut?',
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
      setLoading(true);
      // config
      const config = {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic ' + localStorage.token,
        },
      };

      // API delete
      const response = await API.delete(`/work-visit/delete-work-visit/${id}`, config);

      // response
      if (response.data.status === 'Success') {
        setLoading(false);
        Swal.fire({
          title: 'Berhasil',
          text: 'Data Kunjungan Kerja Berhasil Dihapus',
          icon: 'success',
          confirmButtonText: 'Oke',
        });
        getWorkVisit();
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Gagal',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Oke',
      });
      console.log(error);
    }
  };

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
      headerName: 'Nama Pengunjung',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      flex: 2,
      renderCell: (params) => params.row.name || '-',
    },
    {
      field: 'date',
      headerName: 'Tanggal Kunjungan',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
      renderCell: (params) => params.row.date || '-',
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
          <Stack direction="row" alignItems="center" justifyContent="center">
            {/* lihat btn */}
            <Tooltip
              title="Lihat Data"
              sx={{
                fontSize: { sm: '2rem', md: '2.2rem' },
                cursor: 'pointer',
                color: theme.palette.primary.main,
              }}
            >
              <IconButton
                onClick={() => {
                  setSelected(params.row);
                  setOpenDetail(true);
                }}
              >
                <VisibilityIcon
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
            </Tooltip>
            {/* edit btn */}
            <Tooltip
              title="Ubah Data"
              sx={{
                fontSize: { sm: '2rem', md: '2.2rem' },
                cursor: 'pointer',
                color: theme.palette.primary.main,
              }}
            >
              <IconButton
                onClick={() => {
                  setOpenModal(true);
                  setModalTitle('Ubah Data Kunjungan Kerja');
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
            </Tooltip>
            {/* hapus btn */}
            <Tooltip
              title="Lihat Data"
              sx={{
                fontSize: { sm: '2rem', md: '2.2rem' },
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
                    fontSize: { sm: '2rem', md: '2.2rem' },
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
                <Typography variant="h3" sx={{ fontSize: { sm: '1.8rem' } }}>
                  Kunjungan Kerja
                </Typography>
              </Box>
              <Box display="flex" alignContent="center" justifyContent="center" pt={5}>
                {/* card */}
                <CardCount count={data?.length} title="Kunjungan" />
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
                      setModalTitle('Tambah Kunjugan Baru');
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
                    sx={{ fontSize: { sm: '1rem', md: '1.5rem' } }}
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
            getWorkVisit();
          }}
          dataEdit={dataEdit}
          mode={mode}
        />
      </Modal>

      <Detail selected={selected} openDetail={openDetail} setOpenDetail={setOpenDetail} />
    </>
  );
}
