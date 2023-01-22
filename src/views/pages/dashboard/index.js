import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/system';
import { Grid, Box, Stack, Card, CardContent, Typography, IconButton, Button, Tooltip, ButtonBase } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

// project imports
import ModalDetailPatient from 'ui-component/extended/DetailPatient';
import CardCount from 'ui-component/Card/CardCount';

export default function Dashboard() {
  const theme = useTheme();
  let navigate = useNavigate();

  // open data
  const [openDetail, setOpenDetail] = useState(false);
  const [selected, setSelected] = useState('');

  // delete data
  const [openAlert, setOpenAlert] = useState(false);
  const [getData, setGetData] = useState([]);
  const [data, setData] = useState([
    {
      id: 1,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: null,
    },
    {
      id: 2,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: 'document.pdf',
    },
    {
      id: 3,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: 'document.pdf',
    },
    {
      id: 4,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: 'document.pdf',
    },
    {
      id: 5,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: 'document.pdf',
    },
    {
      id: 6,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: 'document.pdf',
    },
    {
      id: 7,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: 'document.pdf',
    },
    {
      id: 8,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: 'document.pdf',
    },
    {
      id: 9,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: 'document.pdf',
    },
    {
      id: 10,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: 'document.pdf',
    },
    {
      id: 11,
      nama_pengunjung: 'Perusahaan 1',
      tgl_kunjungan: '25-09-2023',
      asal: 'Rumah Sakit',
      kepentingan: 'Ingin mengurus dokumen pembelian',
      jml_orang: 5,
      file: 'document.pdf',
    },
  ]);

  const handleOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
    setGetData('');
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
      field: 'nama_pengunjung',
      headerName: 'Nama Pengunjung',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      flex: 2,
      renderCell: (params) => params.row.nama_pengunjung || '-',
    },
    {
      field: 'tgl_kunjungan',
      headerName: 'Tanggal Kunjungan',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
      renderCell: (params) => params.row.tgl_kunjungan || '-',
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
            {/* lihat btn */}
            <Tooltip
              title="Lihat Data"
              sx={{
                fontSize: '22px',
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
                onClick={() =>
                  navigate('/doctor/patient/edit-form', {
                    replace: true,
                    state: params.row,
                  })
                }
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
              title="Lihat Data"
              sx={{
                fontSize: '22px',
                cursor: 'pointer',
                color: theme.palette.primary.main,
              }}
            >
              <IconButton
                onClick={() => {
                  handleOpen();
                  setGetData(params.row);
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
          <Stack>
            <Box>
              <Typography variant="h3">Dashboard</Typography>
            </Box>
            <Box display="flex" alignContent="center" justifyContent="center" pt={5}>
              {/* card */}
              <CardCount count={data?.length} title="Total Kunjungan" />
            </Box>

            {/* content  */}
            <Stack mt={3}>
              {/* header */}
              <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography>Kunjungan</Typography>
                <Button variant="outlined" size="small" sx={{ fontSize: '1rem' }}>
                  Tambah Data
                </Button>
              </Box>
              {/* content */}
              {/* data */}
              <Box mt={4}>
                <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} autoHeight />
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* modal */}
      <ModalDetailPatient selected={selected} openDetail={openDetail} setOpenDetail={setOpenDetail} />
    </>
  );
}
