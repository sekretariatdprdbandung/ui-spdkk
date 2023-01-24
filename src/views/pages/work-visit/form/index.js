import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

// mui material
import { useTheme } from '@mui/system';
import { Backdrop, CircularProgress, FormControlLabel, Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// assets
import UploadFile from 'assets/images/uploadFile.png';

import Swal from 'sweetalert2';

// API
import { API } from 'config/API';

const Form = ({ onClose, mode, dataEdit }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  // data
  const [form, setForm] = useState({
    name: '',
    date: null,
    origin: '',
    interest: '',
    qty: 0,
    filename: '',
    file: '',
  });

  useEffect(() => {
    if (mode === 'edit') {
      setForm({
        name: dataEdit.name || '',
        date: dataEdit.date || '',
        origin: dataEdit.origin || '',
        interest: dataEdit.interest || '',
        qty: dataEdit.qty || 0,
        filename: dataEdit.filename || '',
      });
    }
  }, []);

  // change value state form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
    if (e.target.type === 'file') {
      setForm({
        ...form,
        file: e.target.files,
        filename: e.target.files[0].name,
      });
    }
  };

  // handle submit
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      // config
      const config = {
        method: 'POST',
      };

      // data
      const formData = new FormData();
      if (form.file) {
        formData.set('file', form.file[0], form.file[0].name);
      }
      formData.set('name', form.name);
      formData.set('date', form.date);
      formData.set('origin', form.origin);
      formData.set('interest', form.interest);
      formData.set('qty', form.qty);

      // API add
      let response;
      if (mode === 'add') {
        response = await API.post('/work-visit/add-work-visit', formData, config);
      } else if (mode === 'edit') {
        response = await API.patch(`/work-visit/update-work-visit/${dataEdit.id}`, formData, config);
      }

      if (response.data.status === 'Success') {
        setLoading(false);
        Swal.fire({
          title: 'Berhasil',
          text: 'Data Kunjungan Kerja Berhasil Disimpan',
          icon: 'success',
          confirmButtonText: 'Oke',
        }).then((result) => {
          if (result.isConfirmed) {
            onClose();
          }
        });
      } else {
        setLoading(false);
        Swal.fire({
          title: 'Gagal',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Oke',
        });
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
  });

  return (
    <>
      {loading && (
        <Backdrop open={loading} sx={{ zIndex: 99999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {/* nama pengunjung */}
          <TextField
            id="name"
            name="name"
            placeholder="Nama Pengunjung"
            label="Nama Pengunjung *"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          {/* tanggal kunjungan */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              inputFormat="YYYY-MM-DD"
              label="Basic example"
              value={form.date}
              onChange={(newValue) => {
                setForm({
                  ...form,
                  date: newValue,
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {/* asal */}
          <TextField id="origin" name="origin" placeholder="Asal" label="Asal *" value={form.origin} onChange={handleChange} fullWidth />
          {/* kepentingan */}
          <TextField
            id="interest"
            name="interest"
            placeholder="Kepentingan"
            label="Kepentingan *"
            value={form.interest}
            onChange={handleChange}
            fullWidth
          />
          {/* jumlah orang */}
          <TextField
            id="qty"
            type="number"
            name="qty"
            placeholder="Jumlah Orang"
            label="Jumlah Orang *"
            value={form.qty}
            onChange={handleChange}
            fullWidth
          />
          {/* file */}
          <FormControlLabel
            sx={{ color: '#fff', background: theme.palette.primary.main, alignContent: 'center', justifyContent: 'center', borderRadius: 3 }}
            label={
              <Card sx={{ p: 2, background: theme.palette.primary.main, borderRadius: 3, cursor: 'pointer' }}>
                <Stack flexDirection="row" alignItems="center" justifyContent="center" gap={3}>
                  <Box component="img" src={UploadFile} sx={{ width: 68, height: 68 }} />
                  <Typography sx={{ color: '#fff' }}>{form.filename !== '' && form.filename !== null ? form.filename : 'Unggah File'}</Typography>
                </Stack>
              </Card>
            }
            control={<input type="file" id="file" name="file" hidden onChange={handleChange} />}
          />

          <Stack alignItems="flex-end">
            <Button variant="contained" size="small" type="submit">
              Simpan
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default Form;
