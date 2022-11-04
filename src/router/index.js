import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/ReceptionLoginView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/managedoctor',
    name: 'managedoctor',
    component: () => import('../views/ManageDoctorView.vue'),
  },
  {
    path: '/patientinfo',
    name: 'patientinfo',
    component: () => import('../views/PatientInfo.vue'),
  },

  {
    path: '/patient',
    name: 'patient',
    component: () => import('../views/Patient.vue'),
  },

  {
    path: '/docappointmentlist',
    name: 'docappointmentlist',
    component: () => import('../views/DocAppointmentListView.vue'),
  },
  {
    path: '/makeappointment',
    name: 'makeappointment',
    component: () => import('../views/MakeAppointmentView.vue'),
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('../views/UserInfoView.vue'),
  },
  {
    path: '/editdoctor/:id',
    name: 'editdoctor',
    component: () => import('../views/EditDoctorView.vue'),
  },
  {
    path: '/adddoctor',
    name: 'adddoctor',
    component: () => import('../views/AddDoctorView.vue'),
    children: [
      {
        path: '',
        name: 'doctorinfo',
        component: () => import('../components/DoctorInfo.vue'),
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: () => import('../components/ScheduleReservation.vue'),
      },
      {
        path: 'accountinfo',
        name: 'accountinfo',
        component: () => import('../components/AccountInfo.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
