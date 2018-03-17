import Home from '../Home';
import Login from '../Authentication/Login';
import TemperatureTaking from '../TemperatureTaking/TemperatureTaking';
import StudentInformation from '../StudentInformation/StudentInformation';

const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: Home,
    authorization: [
      'Parent',
      'Teacher',
      'Admin',
    ],
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    authorization: [],
  },
  {
    name: 'Temperature Taking',
    path: '/temperature',
    component: TemperatureTaking,
    authorization: [
      'Teacher',
    ],
  },
  {
    name: 'Student Information',
    path: '/information',
    component: StudentInformation,
    authorization: [
      'Parent',
    ],
  },
];

export default routes;
