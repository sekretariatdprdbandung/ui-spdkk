import SvgIcons from 'assets/images/menu';

const SuperAdminMenu = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    url: '/dashboard',
    icon: SvgIcons.DashboardSVG,
    breadcrumbs: false,
  },
  {
    id: 'user-management',
    title: 'User Management',
    type: 'item',
    url: '/user-management',
    icon: SvgIcons.UsersSVG,
    breadcrumbs: false,
  },
];

export default SuperAdminMenu;
