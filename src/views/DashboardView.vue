<template>
  <TopNav />
  <div class="canvasBoard canvasBoardDash">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 my-3">
          <div class="menuCard mx-auto rounded bg-white">
            <router-link to="/managedoctor" class="text-dark">
              <p class="text-center py-4 fs-5" style="font-weight: 450">
                Manage Doctors
              </p>
            </router-link>
          </div>
        </div>
        <div class="col-lg-3 my-3">
          <div class="menuCard mx-auto rounded bg-white">
            <router-link to="/makeappointment" class="text-dark">
              <p class="text-center py-4 fs-5" style="font-weight: 450">
                Make Appointment
              </p>
            </router-link>
          </div>
        </div>
        <div class="col-lg-3 my-3">
          <div class="menuCard mx-auto rounded bg-white">
            <router-link to="/docappointmentlist" class="text-dark">
              <p class="text-center py-4 fs-5" style="font-weight: 450">
                Dr. Appointments List
              </p>
            </router-link>
          </div>
        </div>
        <div class="col-lg-3 my-3">
          <div class="menuCard mx-auto rounded bg-white">
            <router-link to="/patient" class="text-dark">
              <p class="text-center py-4 fs-5" style="font-weight: 450">
                Patient User
              </p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-lg-9">
          <div class="doctorInfoCanvas bg-white">
            <div class="row py-2">
              <div class="col-lg-2">
                <p class="m-0 fs-4 text-center">Doctor Info</p>
              </div>
              <div class="col-lg-7 px-3">
                <input
                  type="search"
                  class="form-control rounded-0 border-dark"
                  id=""
                  v-model="doctorSearch"
                  placeholder="Search Doctor..."
                />
              </div>
              <div class="col-lg-3 pe-4">
                <select
                  class="form-select rounded-0 border-dark mx-auto"
                  v-model="deptSelect"
                >
                  <option value="">Choose Dept.</option>
                  <option v-for="dept in department">
                    {{ dept.department }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row table-padding">
              <div
                class="col-lg-12"
                style="height: 28.8rem; overflow-y: scroll; overflow-x: hidden"
              >
                <table class="table">
                  <thead class="text-center thead-color text-white sticky-top">
                    <tr>
                      <th class="fw-normal" scope="col" width="20%">
                        Doctor's name
                      </th>
                      <th class="fw-normal" scope="col" width="20%">
                        Designation
                      </th>
                      <th class="fw-normal" scope="col">Department</th>
                      <th class="fw-normal" scope="col">Room</th>
                      <th class="fw-normal" scope="col">Fee</th>
                      <th class="fw-normal" scope="col" width="15%">
                        Available
                      </th>
                      <th class="fw-normal" scope="col" width="10%">
                        On Leave
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-center">
                    <tr v-for="doc in filteredList" class="align-middle">
                      <template
                        v-if="
                          doc.department
                            .toString()
                            .toLowerCase()
                            .includes(this.deptSelect.toString().toLowerCase())
                        "
                      >
                        <td class="table-font-size">
                          <strong>{{ doc.doctor }}</strong>
                        </td>
                        <td
                          class="designation-font"
                          style="font-size: 12px !important"
                        >
                          {{ doc.qualification }}
                          Parkview Hospital
                        </td>
                        <td class="table-font-size">
                          <strong>{{ doc.department }}</strong>
                        </td>
                        <td class="table-font-size">{{ doc.room }}</td>
                        <td class="table-font-size">{{ doc.fee }} BDT</td>
                        <td class="table-font-size">
                          <div v-for="sche in docSchedule">
                            <div v-if="sche.doctorId === doc.id">
                              <p class="m-0" style="font-size: 12px">
                                {{ sche.startFrom }} - {{ sche.endTo }} (
                                {{ sche.day }} )
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="table-font-size">
                          <p v-if="doc.period == 'single'" class="m-0">
                            {{ doc.startDate }}
                          </p>
                          <p v-if="doc.period == 'more'" class="m-0">
                            {{ doc.startDate }} - {{ doc.endDate }}
                          </p>
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="availableDocCanvas bg-white" style="height: 32rem">
            <div
              class="row p-2 align-items-center border-bottom sticky-top bg-white"
            >
              <div class="col-lg-6">
                <p class="m-0 fw-bold">Available Today</p>
              </div>
              <div class="col-lg-6 text-center">
                <select
                  class="form-select form-select-sm rounded-0 border-dark"
                  v-model="docDeptSelect"
                >
                  <option value="">Choose Dept.</option>
                  <option v-for="dept in department">
                    {{ dept.department }}
                  </option>
                </select>
              </div>
            </div>
            <div
              class="row bg-light availDocMargin py-2 align-items-center border-bottom"
              v-for="docs in filteredDoc"
            >
              <template v-if="docs.department.includes(this.docDeptSelect)">
                <div class="col-lg-8">
                  <p class="m-0 fw-bold">
                    {{ docs.doctor }}
                  </p>
                  <p
                    class="m-0 designation-font"
                    style="font-size: 11px !important"
                  >
                    <b>{{ docs.department }}</b
                    ><br />
                    {{ docs.qualification }}
                    <br />({{ docs.session }})
                  </p>
                </div>
                <div class="col-lg-4">
                  <div class="roomNo rounded-pill text-white text-center">
                    <i class="fa-solid fa-door-open py-2"></i> {{ docs.room }}
                  </div>
                </div></template
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script>
import TopNav from "../components/TopNav.vue";
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {
      deptSelect: "",
      doctorList: [],
      docSchedule: [],
      department: [],
      doctorSearch: "",
      doctorSelect: "",
      docAppointments: [],
      thisDay: "",
      wdays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      docDeptSelect: "",
      toDay: "",
    };
  },
  name: "DashboardView",
  components: { TopNav, Footer },

  mounted() {
    this.getDoctorlist();
    this.getDepartment();
    this.getDocAppointment();
    let day = new Date();
    this.thisDay = Number(day.getDay());
    this.toDay = this.formatDate(day);
  },
  methods: {
    getDocAppointment() {
      fetch(
        "http://server.parkviewappointment.com/parkview/admin/getAppointmentInfo",
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.docAppointments = res.appointment;
          console.log(this.docAppointments);
        })
        .catch((err) => console.log(err));
    },
    getDoctorlist() {
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/getDoctor",
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.doctorList = res.doctors;
          this.docSchedule = res.schedules;
        })
        .catch((err) => console.log(err));
    },

    getDepartment() {
      const data = new FormData();
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/getDepartment",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.department = res.message;
          console.log(this.department);
        })
        .catch((err) => console.log(err.message));
    },

    formatDate(date) {
      var date = new Date(date);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour "0" should be "12"
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;

      var month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }

      var tdate = date.getDate();

      if (tdate < 10) {
        tdate = "0" + tdate;
      }

      return date.getFullYear() + "-" + month + "-" + tdate;
    },
  },

  computed: {
    filteredList() {
      return this.doctorList?.filter((post) => {
        if (
          post.doctor
            .toString()
            .toLowerCase()
            .includes(this.doctorSearch.toString().toLowerCase())
        ) {
          return post;
        }
      });
    },
    filteredDoc() {
      return this.docAppointments?.filter((post) => {
        if (
          post.period == "single" &&
          post.startDate.toString().includes(this.toDay.toString())
        ) {
          return false;
        }

        if (
          post.period == "more" &&
          this.toDay > post.startDate &&
          post.endDate > this.toDay
        ) {
          return false;
        }


        if (
          post.day
            .toString()
            .toLowerCase()
            .includes(this.wdays[this.thisDay].toString().toLowerCase())
        ) {
          return post;
        }
      });
    },
  },
};
</script>

<style></style>
