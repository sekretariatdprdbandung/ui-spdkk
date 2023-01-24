import SvgIcons from 'assets/images/menu';

const SuperAdminMenu = [
  {
    id: 'kunjungan-kerja',
    title: 'Kunjungan Kerja',
    type: 'item',
    url: '/work-visit',
    icon: SvgIcons.FileSVG,
    breadcrumbs: false,
  },
  {
    id: 'manajemen-pengguna',
    title: 'Manajemen Pengguna',
    type: 'item',
    url: '/user-management',
    icon: SvgIcons.UsersSVG,
    breadcrumbs: false,
  },
];

export default SuperAdminMenu;
