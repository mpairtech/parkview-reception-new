<template>
  <TopNav />
  <DashboardNav />

  <!-- Modal -->
  <div
    class="modal fade"
    id="deleteConfirmModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete Schedule</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure to cancel this Appointment ?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="delAppo(this.delid)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->

  <div class="canvasBoard">
    <div class="container-fluid p-4">
      <div class="row">
        <div class="col-lg-9 ps-0">
          <div class="docAppointListBoard bg-white pb-3">
            <div class="row mb-2">
              <div class="col-lg-12">
                <p class="m-0 fs-5 px-3 py-2 border-bottom border-dark">
                  Doctor Appointment
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 px-4">
                <div class="row mb-2">
                  <div class="col-lg-12">
                    <select
                      v-model="dept"
                      @change="getDeptname()"
                      class="form-control form-control-sm rounded-0 border-dark"
                    >
                      <option value="">Choose Department</option>
                      <option v-for="dept in department" :value="dept.id">
                        {{ dept.department }}
                      </option>
                    </select>
                  </div>

                  <br />
                  <br />
                  <div class="col-lg-12">
                    <select
                      v-model="docId"
                      class="form-control form-control-sm rounded-0 border-dark"
                    >
                      <option value="">Choose Doctor</option>

                      <template v-for="doc in doctorList">
                        <option
                          v-if="doc.department == deptname"
                          :value="doc.id"
                        >
                          {{ doc.doctor }}
                        </option>
                      </template>
                    </select>
                  </div>
                </div>

                <template v-for="doc in doctorList">
                  <div v-if="doc.id == docId" class="row mb-2">
                    <div class="col-lg-12">
                      <div class="thBg p-3">
                        <p class="m-0 fw-bold">{{ doc.doctor }}</p>
                        <p class="m-0 designation-font">
                          {{ doc.qualification }} ( {{ doc.department }} )
                        </p>
                      </div>
                    </div>
                  </div>
                </template>

                <div class="row mb-2">
                  <div class="col-lg-3">
                    <input
                      type="date"
                      v-model="visitDatestart"
                      class="form-control rounded-0 filterColor px-3"
                    />
                  </div>

                  <div class="col-lg-3">
                    <input
                      type="date"
                      v-model="visitDateend"
                      class="form-control rounded-0 filterColor px-3"
                    />
                  </div>

                  <div class="col-lg-3">
                    <select
                      v-model="session"
                      class="form-select rounded-0 filterColor"
                    >
                      <option value="">Session</option>
                      <option value="morning">Morning</option>
                      <option value="evening">Evening</option>
                    </select>
                  </div>
                  <div class="col-lg-3">
                    <button
                      @click="tableToExcel('table', 'Patient Info')"
                      class="btn downButton rounded-0 text-white w-100"
                    >
                      Download
                    </button>
                  </div>
                </div>

                <!-- Hidden Table -->

                <div>
                  <table class="table hiddenTable" ref="table" id="loremTable">
                    <thead>
                      <tr v-for="index in 2">
                        <td v-if="index == 1" colspan="4">
                          <caption v-if="index == 1">
                            <p v-for="doc in doctorList">
                              <template v-if="doc.id == docId">
                                <strong>{{ doc.doctor }}</strong> <br />
                                {{ doc.qualification }}
                              </template>
                            </p>
                          </caption>
                        </td>
                      </tr>

                      <tr>
                        <th>Serial</th>
                        <th>Patient Name</th>
                        <th>Age</th>
                        <th>Session</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="appointment in filteredList">
                        <tr v-if="appointment.doctorId == docId">
                          <td class="border-0">{{ appointment.serial }}</td>
                          <td class="border-0">{{ appointment.name }}</td>
                          <td class="border-0">{{ appointment.age }}</td>
                          <td class="border-0">{{ appointment.period }}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>

                <!-- Actual Table -->

                <template v-for="appointment in filteredList">
                  <div v-if="appointment.doctorId == docId" class="row mb-2">
                    <div class="col-lg-10">
                      <div class="patientInfoCard">
                        <div class="row">
                          <div class="col-lg-2 pe-0">
                            <p class="m-0 pt-2 text-center thBg infoHeight">
                              <strong>SL : {{ appointment.serial }}</strong>
                            </p>
                          </div>
                          <div class="col-lg-4 px-0">
                            <p class="m-0 pt-2 bg-light px-3 infoHeight">
                              {{ appointment.name }}
                            </p>
                          </div>

                          <div class="col-lg-2 px-0">
                            <p class="m-0 pt-2 bg-light px-3 infoHeight">
                              Date : {{ appointment.visitDate }}
                            </p>
                          </div>


                          <div class="col-lg-2 px-0">
                            <p class="m-0 pt-2 text-center thBg infoHeight">
                              Age : {{ appointment.age }}
                            </p>
                          </div>
                          <div class="col-lg-2 ps-0">
                            <p class="m-0 pt-2 text-center bg-light infoHeight">
                              {{ appointment.period }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 ps-0">
                      <button
                        class="btn cancelBtn rounded-0 text-white w-100"
                        @click="this.delid = appointment.id"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteConfirmModal"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 ps-0">
          <div class="row mb-3">
            <div class="col-lg-12">
              <div class="todayAppo bg-white p-3">
                <h3 class="mb-1">{{ filteredListAppointment.length }}</h3>
                <p>Today's Appointment</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="availableDocCanvas bg-white">
                <div class="row p-2 align-items-center border-bottom">
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

                <template v-for="sche in docSchedule">
                  <template v-for="doctor in availableDoc">
                    <template
                      v-if="
                        sche.doctorId == doctor.id && sche.day == this.thisDay
                      "
                    >
                      <div
                        v-if="doctor.department.includes(this.docDeptSelect)"
                        class="row bg-light availDocMargin align-items-center"
                      >
                        <div class="col-lg-8">
                          <p class="m-0 fw-bold">{{ doctor.doctor }}</p>
                          <p class="m-0 designation-font">
                            <b>{{ doctor.department }}</b
                            ><br />
                            {{ doctor.qualification }}
                          </p>
                        </div>
                        <div class="col-lg-4">
                          <div
                            class="roomNo rounded-pill text-white text-center"
                          >
                            <i class="fa-solid fa-door-open py-2"></i>
                            {{ doctor.room }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                </template>
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
import DashboardNav from "../components/DashboardNav.vue";
import FooterVue from "@/components/Footer.vue";
import { useToast } from "vue-toastification";
export default {
  name: "DocAppointmentListView",
  components: { TopNav, DashboardNav, FooterVue },
  data() {
    return {
      dept: "",
      doctorList: [],
      docSchedule: [],
      appointments: [],
      appointmentsList: [],
      department: [],
      wdays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      docId: "",
      deptname: "",
      session: "",
      visitDate: "",
      delid: "",
      toDay: "",
      thisDay: "",
      update: 0,
      docDeptSelect: "",

      visitDatestart: "",
      visitDateend: "",

      excelName: "PatientInfo.xls",
      uri: "data:application/vnd.ms-excel;base64,",
      template:
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64: function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format: function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      },
    };
  },

  watch: {
    update(newVal) {
      if (newVal == 1) {
        this.getAppointment();
        this.update = 0;
      }
    },
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  mounted() {
    this.getDoctorlist();
    this.getDepartment();
    this.getAppointment();
    this.getAppointmentList();
    let day = new Date();
    this.thisDay = this.wdays[day.getDay()];
    this.toDay = this.formatDate(day);
    this.visitDate = this.toDay;
  },

  methods: {
    tableToExcel(table, name) {
      if (!table.nodeType) table = this.$refs.table;
      var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
      var link = document.createElement("a");
      link.download = !this.excelName.split(".").pop().length
        ? this.excelName + ".xls"
        : this.excelName;
      link.href = this.uri + this.base64(this.format(this.template, ctx));
      link.click();
    },
    delAppo(id) {
      const data = new FormData();
      data.append("id", id);
      fetch(
        "http://server.parkviewappointment.com/parkview/admin/deleteAppointment",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.update = 1;
          this.toast.success("Appointment Cancelled", {
            timeout: 4000,
          });
        })
        .catch((err) => console.log(err));
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

      var month = Number(date.getMonth()) + 1;
      var today = Number(date.getDate());

      if (month < 10) {
        month = "0" + month;
      }

      if (today < 10) {
        today = "0" + today;
      }

      return date.getFullYear() + "-" + month + "-" + today;
    },
    getDeptname() {
      this.department.map((item) => {
        if (item.id == this.dept) {
          this.deptname = item.department;
        }
      });
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

    getAppointment() {
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/getAppointment",
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.appointmentsList = res.appointment;
          console.log(this.appointmentsList);
        })
        .catch((err) => console.log(err));
    },
    getAppointmentList() {
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/getAppointmentList",
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.appointments = res.appointment;
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
        })
        .catch((err) => console.log(err.message));
    },
  },

  computed: {
    filteredListAppointment() {
      return this.appointmentsList?.filter((post) => {
        if (
          post.visitDate
            .toString()
            .toLowerCase()
            .includes(this.toDay.toString())
        ) {
          return post;
        }
      });
    },
    filteredList() {
      return this.appointmentsList?.filter((post) => {
        if (
          post.visitSession
            .toString()
            .toLowerCase()
            .includes(this.session.toString().toLowerCase()) &&
          (this.visitDatestart < post.visitDate || this.visitDatestart.includes(post.visitDate)) &&
          (post.visitDate < this.visitDateend || this.visitDateend.includes(post.visitDate)) || 
          this.visitDatestart == ''
        ) {
          return post;
          }
      });
    },

    availableDoc() {
      return this.doctorList.map((item) => {
        if (
          item.period == "single" &&
          item.startDate.toString().includes(this.toDay.toString())
        ) {
          return false;
        }

        if (
          item.period == "more" &&
          this.toDay > item.startDate &&
          item.endDate > this.toDay
        ) {
          return false;
        } else {
          return item;
        }
      });
    },
  },
};
</script>
