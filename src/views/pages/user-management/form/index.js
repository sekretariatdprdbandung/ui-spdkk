import { useState, useEffect, useContext } from 'react';
import { useMutation } from 'react-query';

// context
import { AuthContext } from 'context/AuthContext';

// mui material
import { Backdrop, CircularProgress, IconButton, Button, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Swal from 'sweetalert2';

// API
import { API } from 'config/API';

const Form = ({ onClose, mode, dataEdit }) => {
  const [loading, setLoading] = useState(false);

  // context
  const [state] = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // data
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 0,
    status: 0,
  });

  useEffect(() => {
    if (mode === 'edit') {
      setForm({
        name: dataEdit.name || '',
        email: dataEdit.email || '',
        password: dataEdit.password || '',
        role: dataEdit.role || 0,
        status: dataEdit.status || 0,
      });
    }
  }, []);

  // change value state form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // config
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // data
      const body = JSON.stringify(form);

      // API add
      let response;
      if (mode === 'add') {
        response = await API.post('/user/add-user', body, config);
      } else if (mode === 'edit') {
        response = await API.patch(`/user/update-user/${dataEdit.id}`, body, config);
      }

      if (response.data.status === 'Success') {
        setLoading(false);
        Swal.fire({
          title: 'Berhasil',
          text: 'Data Pengguna Berhasil Disimpan',
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
          {/* name */}
          <TextField id="name" name="name" placeholder="Nama Lengkap" label="Nama Lengkap *" value={form.name} onChange={handleChange} fullWidth />
          {/* email */}
          <TextField
            name="email"
            fullWidth
            autoComplete="false"
            placeholder="Email"
            label="Email *"
            value={form.email}
            onChange={handleChange}
            type="email"
          />
          {/* password */}
          <TextField
            id="password"
            name="password"
            placeholder="Password"
            label="Password *"
            autoComplete="new-password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={form.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility color="primary" /> : <VisibilityOff color="primary" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* role */}
          <TextField
            id="role"
            name="role"
            placeholder="Tipe Admin"
            label="Tipe Admin *"
            value={form.role}
            onChange={handleChange}
            fullWidth
            select
            disabled={mode === 'edit' && state.user.id === 1 ? true : false}
          >
            <MenuItem value={0} selected>
              Super Admin
            </MenuItem>
            <MenuItem value={1}>Admin</MenuItem>
          </TextField>
          {/* status */}
          <TextField
            id="status"
            name="status"
            placeholder="Status"
            label="Status *"
            value={form.status}
            onChange={handleChange}
            fullWidth
            select
            disabled={mode === 'edit' && state.user.id === 1 ? true : false}
          >
            <MenuItem value={0} selected>
              Aktif
            </MenuItem>
            <MenuItem value={1}>Tidak Aktif</MenuItem>
          </TextField>

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
