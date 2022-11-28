<template>
  <div>
    <TopNav />
    <DashboardNav />
    <div class="canvasBoard">
      <div class="container-fluid p-4">
        <div class="row">
          <div class="col-lg-9 ps-0">
            <div class="patientInfoBoard bg-white">
              <div class="row mb-2">
                <div class="col-lg-12">
                  <p class="m-0 fs-5 px-3 py-2 border-bottom border-dark">
                    Patient Info
                  </p>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-lg-12 px-4">
                  <input
                    type="text"
                    class="form-control form-control-sm rounded-0 border-dark"
                    id=""
                    v-model="appointSearch"
                  />
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-lg-12">
                  <table class="table" ref="table" id="loremTable">
                    <thead class="text-center thBg">
                      <!-- <tr v-for="index in 6">
                        <td v-if="index == 1" colspan="6" rowspan="4">
                          <caption v-if="index == 1">
                            <img
                              src="https://i0.wp.com/parkview.com.bd/wp-content/uploads/2018/09/parkview_logo_color.png?fit=464%2C76&ssl=1"
                              alt=""
                              style="height: 20px"
                            />
                          </caption>
                        </td>
                      </tr> -->

                      <tr>
                        <th scope="col" class="border-dark">ID</th>
                        <th scope="col" class="border-dark">Patient Name</th>
                        <th scope="col" class="border-dark">Doctor's Name</th>
                        <th scope="col" class="border-dark">Department</th>
                        <th scope="col" class="border-dark">
                          Appointment Date
                        </th>
                        <th scope="col" class="border-dark">
                          Appointment Time
                        </th>
                        <th scope="col" class="border-dark">Serial</th>
                      </tr>
                    </thead>
                    <tbody class="text-center">
                      <template v-for="appointment in filteredList">
                        <tr
                          class="border-bottom"
                          style="font-size: small"
                          v-if="
                            appointment.department
                              .toString()
                              .includes(this.choseDept.toString()) &&
                            appointment.visitDate
                              .toString()
                              .includes(this.fdate.toString())
                          "
                        >
                          <td class="border-0">
                            {{
                              appointment.patientId == 0
                                ? appointment.id
                                : appointment.patientId
                            }}
                          </td>
                          <td class="border-0">{{ appointment.name }}</td>
                          <td class="border-0">{{ appointment.doctor }}</td>
                          <td class="border-0">{{ appointment.department }}</td>
                          <td class="border-0">{{ appointment.visitDate }}</td>
                          <td class="border-0">{{ appointment.period }}</td>
                          <td class="border-0">{{ appointment.serial }}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 pe-0">
            <div class="patientFilter bg-white mb-4">
              <div class="row mb-2">
                <div class="col-lg-12">
                  <p class="m-0 fs-6 px-3 py-2 border-bottom border-dark">
                    <strong>Filter</strong>
                  </p>
                </div>
              </div>
              <div class="row mb-2 px-3">
                <p class="m-0">Filter by Date</p>
              </div>
              <div class="row mb-4 px-4">
                <input
                  type="date"
                  v-model="fdate"
                  class="form-control form-control-sm rounded-pill filterColor px-3"
                />
              </div>
              <div class="row mb-2 px-3">
                <p class="m-0">Filter by Department</p>
              </div>
              <div class="row mb-3 px-4">
                <select
                  v-model="choseDept"
                  class="form-select form-select-sm rounded-pill filterColor"
                >
                  <option value="">Choose Department</option>
                  <option v-for="dept in department">
                    {{ dept.department }}
                  </option>
                </select>
              </div>
              <div class="row mb-2 px-4">
                <button
                  @click="tableToExcel('table', 'Patient Info')"
                  class="btn downButton rounded-0 text-white"
                >
                  Download
                </button>
              </div>
            </div>
            <div class="filterCard bg-white">
              <div class="row">
                <div class="col-lg-12 pt-3">
                  <h3>
                    <p class="m-0 px-3">{{ filteredListAppointment.length }}</p>
                  </h3>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <p class="m-0 border-bottom border-dark px-3 pb-3">
                    Today Appointed
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 pt-3">
                  <h3>
                    <p class="m-0 px-3">{{ appointments.length }}</p>
                  </h3>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <p class="m-0 px-3 pb-3">Total Appointed</p>
                </div>
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
import TopNav from '../components/TopNav.vue';
import DashboardNav from '../components/DashboardNav.vue';
import FooterVue from '@/components/Footer.vue';
export default {
  name: 'PatientView',
  components: { TopNav, DashboardNav, FooterVue },

  data() {
    return {
      appointments: [],
      department: [],
      appointSearch: '',
      choseDept: '',
      fdate: '',
      toDay: '',
      excelName: 'PatientInfo.xls',
      uri: 'data:application/vnd.ms-excel;base64,',
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

  mounted() {
    this.getAppointment();
    this.getDepartment();
    let day = new Date();
    this.toDay = this.formatDate(day);
  },

  methods: {
    tableToExcel(table, name) {
      if (!table.nodeType) table = this.$refs.table;
      var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
      var link = document.createElement('a');
      link.download = !this.excelName.split('.').pop().length
        ? this.excelName + '.xls'
        : this.excelName;
      link.href = this.uri + this.base64(this.format(this.template, ctx));
      link.click();
    },
    formatDate(date) {
      var date = new Date(date);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour "0" should be "12"
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;

      var month = date.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }

      var tdate = date.getDate();

      if (tdate < 10) {
        tdate = '0' + tdate;
      }

      return date.getFullYear() + '-' + month + '-' + tdate;
    },
    getAppointment() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/reception/getAppointment`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          this.appointments = res.appointment;
        })
        .catch((err) => console.log(err));
    },

    getDepartment() {
      const data = new FormData();
      fetch(`${process.env.VUE_APP_SERVER_URL}/reception/getDepartment`, {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.department = res.message;
        })
        .catch((err) => console.log(err.message));
    },
  },

  computed: {
    filteredList() {
      return this.appointments?.filter((post) => {
        if (
          post.name
            .toString()
            .toLowerCase()
            .includes(this.appointSearch.toString().toLowerCase()) ||
          post.patientId
            .toString()
            .toLowerCase()
            .includes(this.appointSearch.toString().toLowerCase())
        ) {
          return post;
        }
      });
    },
    filteredListAppointment() {
      return this.appointments?.filter((post) => {
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
  },
};
</script>
<style></style>
