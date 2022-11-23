<template>
  <ul class="nav justify-content-center bg-white">
    <li
      :class="
        location == '/managedoctor'
          ? 'nav-item mx-5 dashboardNavActive'
          : 'nav-item mx-5'
      "
    >
      <router-link to="/managedoctor">
        <a class="nav-link"
          ><p
            class="m-0"
            style="color: #565656; font-size: 1.2rem; font-weight: 450"
          >
            Manage Doctors
          </p></a
        >
      </router-link>
    </li>
    <li
      :class="
        location == '/makeappointment'
          ? 'nav-item mx-5 dashboardNavActive'
          : 'nav-item mx-5'
      "
    >
      <router-link to="/makeappointment">
        <a class="nav-link"
          ><p
            class="m-0"
            style="color: #565656; font-size: 1.2rem; font-weight: 450"
          >
            Make Appointment
          </p></a
        >
      </router-link>
    </li>
    <li
      :class="
        location == '/docappointmentlist'
          ? 'nav-item mx-5 dashboardNavActive'
          : 'nav-item mx-5'
      "
    >
      <router-link to="/docappointmentlist">
        <a class="nav-link"
          ><p
            class="m-0"
            style="color: #565656; font-size: 1.2rem; font-weight: 450"
          >
            Dr. Appointments List
          </p></a
        >
      </router-link>
    </li>
    <!-- <li
      :class="
        location == '/patientinfo'
          ? 'nav-item mx-5 dashboardNavActive'
          : 'nav-item mx-5'
      "
    >
      <router-link to="/patientinfo">
        <a class="nav-link"
          ><p
            class="m-0"
            style="color: #565656; font-size: 1.2rem; font-weight: 450"
          >
            Patient List
          </p></a
        >
      </router-link>
    </li>
 -->

    <li
      :class="
        location == '/patient'
          ? 'nav-item mx-5 dashboardNavActive'
          : 'nav-item mx-5'
      "
    >
      <router-link to="/patient">
        <a class="nav-link"
          ><p
            class="m-0"
            style="color: #565656; font-size: 1.2rem; font-weight: 450"
          >
            User Patient
          </p></a
        >
      </router-link>
    </li>

  </ul>
</template>

<script>
export default {
  name: 'DashboardNav',
  data() {
    return {
      location: '',
    };
  },
  mounted() {
    this.location = window.location.pathname;
  },
};
</script>
