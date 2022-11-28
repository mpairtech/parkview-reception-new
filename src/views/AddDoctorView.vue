<template>
  <TopNav />
  <DashboardNav />
  <div class="canvasBoard">
    <div class="container-fluid p-4">
      <div class="row">
        <div class="col-lg-11 mx-auto bg-white">
          <div class="row">
            <div class="col-lg-12 bg-light">
              <ul class="nav my-1">
                <li
                  :class="docInfo ? 'nav-item mx-5 navactive' : 'nav-item mx-5'"
                >
                  <a class="nav-link" style="cursor: pointer"
                    ><p class="m-0 fs-6 text-dark">
                      <strong>Doctor Info</strong>
                    </p></a
                  >
                </li>
                <li
                  :class="
                    scheInfo ? 'nav-item mx-5 navactive' : 'nav-item mx-5'
                  "
                >
                  <a class="nav-link" style="cursor: pointer"
                    ><p class="m-0 fs-6 text-dark">
                      <strong>Schedule & Reservation</strong>
                    </p></a
                  >
                </li>
                <li
                  :class="accInfo ? 'nav-item mx-5 navactive' : 'nav-item mx-5'"
                >
                  <a class="nav-link" style="cursor: pointer"
                    ><p class="m-0 fs-6 text-dark">
                      <strong>Account Info</strong>
                    </p></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="" v-if="docInfo">
                <DoctorInfo
                  :next="changeSche"
                  :docId="getDocId"
                  :max="getMax"
                />
              </div>
              <div class="" v-if="scheInfo">
                <ScheduleReservation
                  :next="changeAcc"
                  :docId="docId"
                  :max="max"
                />
              </div>
              <div class="" v-if="accInfo">
                <AccountInfo :next="changeAcc" :docId="docId" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterVue />
</template>
<script>
import TopNav from "../components/TopNav.vue";
import FooterVue from "@/components/Footer.vue";
import DoctorInfo from "../components/DoctorInfo.vue";
import AccountInfo from "../components/AccountInfo.vue";
import ScheduleReservation from "../components/ScheduleReservation.vue";

import DashboardNav from "../components/DashboardNav.vue";
export default {
  data() {
    return {
      docDeptSelect: "",
      docInfo: true,      
      scheInfo: false,   
      accInfo: false,
      docId: 0,
      max: 0,
    };
  },

  methods: {
    changeDoc() {
      this.docInfo = true;
      this.scheInfo = false;
      this.accInfo = false;
    },
    changeSche() {
      this.docInfo = false;
      this.scheInfo = true;
      this.accInfo = false;
    },
    changeAcc() {
      this.docInfo = false;
      this.scheInfo = false;
      this.accInfo = true;
    },

    getDocId(id) {
      this.docId = id;
    },

    getMax(value) {
      this.max = value;
    },
  },
  name: "AddDoctorView",
  components: {
    TopNav,
    FooterVue,
    DashboardNav,
    DoctorInfo,
    ScheduleReservation,
    AccountInfo,
  },
};
</script>
<style></style>
