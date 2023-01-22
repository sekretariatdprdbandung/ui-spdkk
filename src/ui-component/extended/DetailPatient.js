import { useState } from 'react';

import { Grid, Stack, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/system';

// project imports
import Modal from './Modal';
import FilePreviewDialog from '../FilePreviewDialog';

function DetailPatient({ openDetail, setOpenDetail, selected }) {
  const theme = useTheme();

  const [openFile, setOpenFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');

  return (
    <>
      <Modal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        onConfirm={() => setOpenDetail(false)}
        title={'Detail Data Kunjungan'}
        btnConfirm="OK"
      >
        <Stack>
          {/* nama pengunjung */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Nama Pengunjung</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">{selected.nama_pengunjung}</Typography>
            </Grid>
          </Grid>
          {/* tanggal kunjungan */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Tanggal Kunjungan</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">{selected.tgl_kunjungan}</Typography>
            </Grid>
          </Grid>
          {/* asal */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Asal</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">{selected.asal}</Typography>
            </Grid>
          </Grid>
          {/* kepentingan */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Kepentingan</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">{selected.kepentingan}</Typography>
            </Grid>
          </Grid>
          {/* jumlah orang */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Jumlah Orang</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">{selected.jml_orang}</Typography>
            </Grid>
          </Grid>
          {/* file */}
          <Grid container mb={2} alignItems="center">
            <Grid item xs={2.5}>
              <Typography variant="title">File</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              {selected.file !== null ? (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenFile(true);
                    setSelectedFile(selected);
                  }}
                  size="small"
                  sx={{ fontSize: '0.9rem', fontWeight: 600, color: theme.mainTextPrimary }}
                >
                  Lihat File
                </Button>
              ) : (
                <Typography variant="title2">Tidak ada file yang terlampir</Typography>
              )}
            </Grid>
          </Grid>
        </Stack>
      </Modal>

      {/* open file */}
      {openFile && (
        <FilePreviewDialog
          open={openFile}
          data={{ path: selectedFile.file, file_ext: selectedFile.file.split('.').pop() }}
          onClose={() => {
            setOpenFile(false);
            setSelectedFile('');
          }}
        />
      )}
    </>
  );
}

export default DetailPatient;
