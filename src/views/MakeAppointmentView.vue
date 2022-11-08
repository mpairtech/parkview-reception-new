<template>
  <TopNav />
  <DashboardNav />

  <ModalSche
    :active="modalscheActive"
    :docId="doctor"
    :max="max"
    :min="min"
    :setData="setData"
    :visitDate="this.convertDate(this.visitDate)"
    :day="visitDay"
    :session="visitSession"
    :update="update"
    :setupdate="setupdate"
    :close="toggleModalsche"
  />

  <div class="canvasBoard">
    <div class="container-fluid p-4">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="row mb-3">
            <div class="col-lg-12">
              <div class="makeAppointmentForm rounded">
                <div class="row">
                  <div class="col-lg-12 appointHead rounded-top">
                    <h5
                      class="text-center align-item-center text-white py-2 mb-0"
                    >
                      Make Appointment
                    </h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12 appointBody">
                    <div class="row my-4 px-3">
                      <div class="col-lg-6">
                        <div class="mb-2">
                          <label class="form-label mb-1 label-font"
                            >Patient Name</label
                          >
                          <input
                            type="text"
                            class="form-control form-control-sm rounded-0"
                            v-model="name"
                          />
                          <small v-if="this.name == ''" class="reqField">{{
                            message
                          }}</small>
                        </div>
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="mb-2">
                              <label class="form-label mb-1 label-font"
                                >Contact Number</label
                              >
                              <input
                                type="text"
                                class="form-control form-control-sm rounded-0"
                                v-model="number"
                              />
                              <small
                                v-if="this.number == ''"
                                class="reqField"
                                >{{ message }}</small
                              >
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="mb-2">
                              <label class="form-label mb-1 label-font"
                                >Your Age</label
                              >
                              <input
                                type="text"
                                class="form-control form-control-sm rounded-0"
                                v-model="age"
                              />
                              <small v-if="this.age == ''" class="reqField">{{
                                message
                              }}</small>
                            </div>
                          </div>
                        </div>
                        <div class="mb-2">
                          <label class="form-label mb-1 label-font"
                            >Choose Department</label
                          >
                          <select
                            v-model="dept"
                            @change="getDeptname()"
                            class="form-select form-select-sm rounded-0 label-font"
                          >
                            <option value="">Department</option>
                            <option v-for="dept in department" :value="dept.id">
                              {{ dept.department }}
                            </option>
                          </select>
                        </div>
                        <div class="mb-2">
                          <div class="row">
                            <div class="col-lg-12">
                              <label class="form-label mb-1 label-font"
                                >Choose Doctor</label
                              >
                              <select
                                v-model="doctor"
                                @change="setMax"
                                class="form-select form-select-sm rounded-0 label-font"
                              >
                                <option value="">Choose Doctor</option>
                                <template v-for="doc in doctorList">
                                  <option
                                    v-if="doc.department === deptname"
                                    :value="doc.id"
                                  >
                                    {{ doc.doctor }}
                                  </option>
                                </template>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="mb-2">
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="mb-2">
                                <label class="form-label mb-1 label-font"
                                  >Day
                                </label>
                                <select
                                  v-model="visitDay"
                                  @change="getSerialSuggetion"
                                  class="form-select form-select-sm rounded-0 label-font"
                                >
                                  <option value="">Day</option>
                                  <template v-for="sche in docSchedule">
                                    <option
                                      v-if="sche.doctorId == this.doctor"
                                      :disabled="
                                        this.availAbleList.includes(sche.day)
                                          ? false
                                          : true
                                      "
                                    >
                                      {{ sche.day }}
                                    </option>
                                  </template>
                                </select>
                              </div>
                            </div>

                            <div class="col-lg-6">
                              <div class="mb-2">
                                <label class="form-label mb-1 label-font"
                                  >Session</label
                                >
                                <select
                                  v-model="visitSession"
                                  @change="getSerialSuggetion"
                                  class="form-select form-select-sm rounded-0 label-font"
                                >
                                  <option value="">Session</option>
                                  <template v-for="sche in docSchedule">
                                    <option
                                      v-if="
                                        sche.doctorId == this.doctor &&
                                        sche.day == this.visitDay
                                      "
                                    >
                                      {{ sche.session }}
                                    </option>
                                  </template>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="mb-2">
                              <label class="form-label mb-1 label-font"
                                >Appointment Date</label
                              >

                              <input
                                class="form-control"
                                type="date"
                                v-model="visitDate"
                                readonly
                              />
                              <!-- 
                              <button
                                @click="
                                  this.showDatepicker = !this.showDatepicker
                                "
                                class="form-control form-control-sm rounded-0 w-100"
                              >
                                {{
                                  visitDate === ""
                                    ? "Select Date"
                                    : convertDate(visitDate)
                                }}
                              </button> -->

                              <!-- <v-date-picker
                                v-if="showDatepicker"
                                v-model="visitDate"
                                @click="getSerialSuggetion"
                                mode="date"
                                timezone=""
                                :available-dates="{
                                  start: new Date(),
                                  end: this.addDays(7, toDay),
                                  weekdays: [
                                    Number(wdays.indexOf(visitDay) + 1),
                                  ],
                                }"
                                style="position: absolute"
                              /> -->
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <p class="label-font m-0 mb-1 fw-bold">Dr. Overview</p>

                        <div v-for="doc in doctorList" v-if="overview">
                          <template v-if="doc.id == this.doctor">
                            <div
                              class="drOverviewCard bg-white rounded px-3 py-2 mb-2"
                            >
                              <p class="fw-bold m-0">{{ doc.doctor }}</p>
                              <p class="m-0 designation-font">
                                {{ doc.qualification }}
                              </p>
                              <p class="m-0 designation-font">
                                {{ doc.department }}
                              </p>
                              <p class="mb-2 designation-font">
                                Parkview Hospital Ltd.
                              </p>
                              <div
                                class="roomInfo text-white text-center rounded-pill"
                              >
                                <p class="my-2 py-1">Room No: {{ doc.room }}</p>
                              </div>
                              <div
                                class="consultancyInfo text-white text-center rounded-pill"
                              >
                                <p class="m-0 py-1">
                                  Consultancy: {{ doc.fee }} BDT
                                </p>
                              </div>
                            </div>
                            <div class="row mb-2">
                              <div class="col-lg-5">
                                <label class="form-label mb-2 label-font"
                                  >Consultancy Period</label
                                >
                                <select
                                  class="form-select form-select-sm rounded-0 label-font"
                                  disabled
                                >
                                  <option>{{ period }} Min</option>
                                </select>
                              </div>
                              <div class="col-lg-3 ps-0">
                                <label class="form-label mb-2 label-font"
                                  >Auto Serial</label
                                >
                                <input
                                  type="text"
                                  class="form-control form-control-sm rounded-0"
                                  v-model="serial"
                                  disabled
                                />
                              </div>
                              <div class="col-lg-4 ps-0">
                                <div class="mt-4"></div>
                                <button
                                  class="btn btn-light chooseManualBtn border border-primary text-center w-100 mt-1"
                                  @click="
                                    toggleModalsche();
                                    this.update = 1;
                                  "
                                >
                                  Choose Manual
                                </button>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-lg-12">
                                <button
                                  @click="postAppointment"
                                  class="btn btn-sm downButton text-white w-100 rounded-0"
                                  style="margin-top: 1.7rem"
                                >
                                  Make An Appointment
                                </button>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 bg-white px-2">
              <p class="m-0 fs-5 px-3 py-2">Last Added Patient</p>
            </div>
            <div class="col-lg-12 appointBody px-0">
              <div v-for="appointment in appointments" class="row py-4 px-3">
                <div class="col-lg-4">
                  <p class="mb-1 px-3 label-font">Patient Info</p>
                  <p class="m-0 px-3 fw-bold">{{ appointment.name }}</p>
                  <p class="m-0 px-3 text-dark" style="font-size: 0.9rem">
                    {{ appointment.age }} Years
                  </p>
                  <p class="m-0 px-3 text-dark" style="font-size: 0.9rem">
                    {{ appointment.number }}
                  </p>
                </div>
                <div class="col-lg-3">
                  <p class="mb-1 px-3 label-font">Doctor Info</p>
                  <p class="m-0 px-3">
                    <b>{{ appointment.doctor }}</b>
                  </p>
                  <p class="m-0 px-3 designation-font">
                    {{ appointment.qualification }} (
                    {{ appointment.department }} )
                  </p>

                  <p class="m-0 px-3 designation-font">Parkview Hospital</p>
                </div>
                <div class="col-lg-2 my-auto">
                  <div class="slNo text-white text-center rounded-pill mx-auto">
                    <p class="m-0">SL:{{ appointment.serial }}</p>
                  </div>
                </div>
                <div class="col-lg-3 my-auto">
                  <div
                    class="appointTime text-center rounded text-white py-2 mx-auto"
                  >
                    <p class="m-0 border-bottom border-white text-center">
                      {{ appointment.visitDate }}
                    </p>
                    <p class="m-0 text-center">{{ appointment.period }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <Loading :active="load"/> -->

  <FooterVue />
</template>
<script>
import TopNav from '../components/TopNav.vue';
import DashboardNav from '../components/DashboardNav.vue';
import FooterVue from '@/components/Footer.vue';
import { ref } from 'vue';
import ModalSche from '@/modal/modalSche.vue';
import Loading from '@/common/loading.vue';
import { useToast } from 'vue-toastification';
export default {
  name: 'MakeAppointmentView',
  components: {
    TopNav,
    DashboardNav,
    ModalSche,
    ModalSche,
    Loading,
    FooterVue,
  },
  data() {
    return {
      name: '',
      number: '',
      age: '',
      dept: '',
      doctor: '',
      visitDate: '',
      visitDay: '',
      vistSession: '',
      serial: '',
      period: '',
      max: '',
      min: '',
      toDay: '',
      update: 0,
      startFrom: '',
      deptname: '',
      overview: false,
      load: false,
      doctorList: [],
      docSchedule: [],
      department: [],
      appointments: [],
      wdays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      showDatepicker: false,
      message: '',
      advance: '',
      availAbleList: [],
    };
  },

  mounted() {
    this.getDoctorlist();
    this.getDepartment();
    this.getAppointment();
    this.toDay = new Date();
  },

  watch: {
    update(update) {
      if (update == 1) {
        this.getAppointment();
      }
    },
  },
  methods: {
    checkAvailable() {
      var today = this.toDay.getDay();

      console.log(today);

      if (this.advance == 0) {
        this.availAbleList.push(this.wdays[today]);
      } else {
        for (var i = 0; i < Number(this.advance) + 1; i++) {
          if (i == 0) {
            today = today;
          } else {
            today = today + 1;
          }

          if (today > 6) {
            today = 0;
          }

          console.log(today);

          this.availAbleList.push(this.wdays[today]);
        }
      }

      console.log(this.advance);
      console.log(this.availAbleList);
    },
    clearField() {
      this.name = '';
      this.number = '';
      this.age = '';
      this.dept = '';
      this.visitDay = '';
      this.doctor = '';
      this.visitDate = '';
      this.overview = false;
    },

    getDeptname() {
      this.department.map((item) => {
        if (item.id == this.dept) {
          this.deptname = item.department;
          console.log(item.department);
        }
      });
    },

    postAppointment() {
      if (this.name == '') {
        this.message = '*Required Field';
        this.toast.error('Please fill out all the fields', {
          timeout: 4000,
        });
        return false;
      }
      if (this.number == '') {
        this.message = '*Required Field';
        this.toast.error('Please fill out all the fields', {
          timeout: 4000,
        });
        return false;
      }
      if (this.age == '') {
        this.message = '*Required Field';
        this.toast.error('Please fill out all the fields', {
          timeout: 4000,
        });
        return false;
      }

      this.load = true;
      const data = new FormData();
      data.append('name', this.name);
      data.append('number', this.number);
      data.append('age', this.age);
      data.append('department', this.dept);
      data.append('doctor', this.doctor);
      data.append('visitDate', this.convertDate(this.visitDate));
      data.append('visitDay', this.visitDay);
      data.append('visitSession', this.visitSession);
      data.append('serial', this.serial);
      data.append('period', this.period);

      fetch(
        'http://server.parkviewappointment.com/parkview/reception/postAppointment',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.clearField();
          this.update = 1;
          this.load = false;
        })
        .catch((err) => console.log(err.message));
    },

    getDoctorlist() {
      fetch(
        'http://server.parkviewappointment.com/parkview/reception/getDoctor',
        {
          method: 'POST',
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
        'http://server.parkviewappointment.com/parkview/reception/getAppointmentLast',
        {
          method: 'POST',
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
        'http://server.parkviewappointment.com/parkview/reception/getDepartment',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          this.department = res.message;
        })
        .catch((err) => console.log(err.message));
    },

    setData(serial, period) {
      this.serial = serial;
      this.period = period;
    },

    getSerialSuggetion() {
      var result = new Date();

      if (this.visitDay != '') {
        this.availAbleList.map((item, index) => {
          if (item.toLowerCase().includes(this.visitDay.toLocaleLowerCase())) {
            result.setDate(result.getDate() + index);

            this.visitDate = this.formatDate(result);
          }
        });
      }

      if (this.convertDate(this.visitDate) === 'NaN-NaN-NaN') {
      } else {
        this.showDatepicker = false;
        this.load = true;
        const data = new FormData();
        data.append('doctor', this.doctor);
        data.append('day', this.visitDay);
        data.append('session', this.visitSession);
        fetch(
          'http://server.parkviewappointment.com/parkview/reception/getSerialSuggetion',
          {
            method: 'POST',
            body: data,
          }
        )
          .then((res) => res.json())
          .then((res) => {
            var A = [];
            for (var i = 1; i <= this.max; i++) {
              if (res.reserved.includes(',' + i + '')) {
              } else {
                A.push(i);
              }
            }
            const B = res.serial;

            console.log(res.serial);
            console.log(res.reserved);
            this.serial = A.filter((n) => !B.includes(n))[0];
            // console.log(A.filter((n) => !B.includes(n)));

            this.startFrom = res.startfrom;
            this.load = false;

            this.period =
              this.addMinutes(Number(this.min) * (Number(this.serial) - 1)) +
              '-' +
              this.addMinutes(Number(this.min) * Number(this.serial));
            this.overview = true;
          })
          .catch((err) => console.log(err.message));
      }
    },

    addDays(numOfdays, date = new Date()) {
      date.setDate(date.getDate() + numOfdays);
      return date;
    },

    setupdate() {
      this.update = 0;
    },

    setMax() {
      this.doctorList.map((item) => {
        if (item.id == this.doctor) {
          this.max = item.max;
          this.min = item.min;
          this.advance = item.advanced;

          this.availAbleList = [];
          this.visitDate = '';
          this.visitDay = '';
          this.visitSession = '';
          this.serial = '';
          this.period = '';
        }
      });

      this.checkAvailable();
    },

    addMinutes(minutes) {
      var date = this.convertDate(this.visitDate) + ':' + this.startFrom;
      var newDate = new Date(date);
      newDate = new Date(newDate.getTime() + minutes * 60000);
      return this.DateFormat(newDate);
    },

    DateFormat(date) {
      var days = date.getDate();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var hours = date.getHours();
      hours = hours % 12 || 12;

      if (hours < 10) {
        hours = '0' + hours;
      }
      var minutes = date.getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes;
      return strTime;
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

    convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? '0' + s : s;
      }
      var d = new Date(inputFormat);
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join(
        '-'
      );
    },
  },
  setup() {
    const modalscheActive = ref(false);
    const toast = useToast();
    const toggleModalsche = () => {
      modalscheActive.value = !modalscheActive.value;
    };
    return { modalscheActive, toggleModalsche, toast };
  },

  computed: {
    filteredList() {
      return this.doctorList?.filter((post) => {
        if (
          post.id
            .toString()
            .toLowerCase()
            .includes(this.doctor.toString().toLowerCase())
        ) {
          return post;
        }
      });
    },
  },
};
</script>
<style></style>
