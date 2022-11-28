<template>
  <TopNav />
  <DashboardNav />

  <Department :active="depaModal" :close="modalStat" />

  <Modal :modalActive="modalActive" @close="toggleModal">
    <div
      class="modal-content-a"
      style="height: 45rem; overflow-x: hidden; overflow-y: scroll"
    >
      <div class="row">
        <div class="col-lg-12 mx-auto">
          <p class="m-0 fs-6 text-dark px-4 py-2 border-bottom border-dark">
            <strong>Change Reservation</strong>
          </p>
          <div class="row my-3 px-4">
            <div class="col-lg-6">
              <label class="form-label mb-2 label-font"
                >Choose Department</label
              >
              <select
                class="form-select form-select-sm label-font bg-light"
                v-model="chooseDept"
              >
                <option value="">Department</option>
                <option v-for="dept in department">
                  {{ dept.department }}
                </option>
              </select>
            </div>
            <div class="col-lg-6">
              <label class="form-label mb-2 label-font">Choose Doctor</label>
              <select
                class="form-select form-select-sm label-font bg-light"
                v-model="chooseDoc"
                @change="setMax"
              >
                <option value="">Doctor</option>
                <template v-for="doc in doctorList">
                  <option
                    v-if="doc.department == this.chooseDept"
                    :value="doc.id"
                  >
                    {{ doc.doctor }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="row my-3 px-4">
            <div class="col-lg-12">
              <div class="thBg p-3 rounded">
                <template v-for="doc in doctorList">
                  <div class="row" v-if="doc.id == chooseDoc">
                    <div class="col-lg-7">
                      <p class="m-0 fw-bold">{{ doc.doctor }}</p>
                      <p class="m-0 designation-font">
                        {{ doc.qualification }} ({{ doc.department }} )
                      </p>
                      <p class="m-0 designation-font">
                        {{ doc.department }}
                      </p>
                      <p class="m-0 designation-font">Parkview Hospital</p>
                    </div>
                    <div class="col-lg-5">
                      <div
                        class="roomInfo text-white text-center rounded-pill"
                        style="width: 8rem; font-size: 0.7rem"
                      >
                        <p class="my-2 py-1">Room No: {{ doc.room }}</p>
                      </div>
                      <div
                        class="consultancyInfo text-white text-center rounded-pill"
                        style="width: 8rem; font-size: 0.7rem"
                      >
                        <p class="m-0 py-1">Consultancy: {{ doc.fee }} BDT</p>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="thBg" style="min-height: 29rem">
            <div class="row px-4 mb-3">
              <div class="col-lg-8">
                <p class="m-0 fs-6 text-dark my-2">
                  <strong>Appointment Schedule</strong>
                </p>
              </div>
            </div>
            <div class="row px-4 mb-4">
              <div class="col-lg-12">
                <div class="row">
                  <div
                    v-for="index in Number(max)"
                    class="changeSchButton px-1 mb-1"
                  >
                    <button
                      @click="changeReserved(index)"
                      :class="[
                        this.reserveList.indexOf(index) > -1
                          ? 'btn changeSchButtonClick rounded-0 w-100 activebtn'
                          : 'btn changeSchButtonClick rounded-0 w-100',
                      ]"
                      style="font-size: 0.8rem"
                    >
                      {{ index }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-8 mx-auto">
                <button
                  class="btn downButton text-white w-100"
                  @click="updateDocreserve"
                >
                  Update Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>

  <DocModal
    :active="modaldrActive"
    :activeDoc="activeDoc"
    :update="update"
    :changeUp="changeUp"
    :close="toggleModaldr"
  />

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
        <div class="modal-body">
          Are you sure to delete this Doctor Profile ?
        </div>
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
            @click="delDoc(this.delid)"
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
      <div class="row mb-3">
        <div class="col-lg-9">
          <div class="docInfoBoard bg-white py-2">
            <div class="row">
              <div class="col-lg-2">
                <p class="fs-4 text-center">Doctor Info</p>
              </div>
              <div class="col-lg-7">
                <input
                  type="search"
                  class="form-control rounded-0 border-dark"
                  id=""
                  v-model="doctorSearch"
                  placeholder="Search Doctor....."
                />
              </div>
              <div class="col-lg-3 pe-4">
                <select
                  class="form-select rounded-0 border-dark mx-auto"
                  v-model="deptSelect"
                >
                  <option value="" selected>Choose Department</option>
                  <option v-for="dept in department">
                    {{ dept.department }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div
                class="col-lg-12"
                style="height: 30.3rem; overflow-y: scroll; overflow-x: hidden"
              >
                <table class="table">
                  <thead class="text-center thead-color text-white sticky-top">
                    <tr class="align-middle">
                      <th class="fw-normal" scope="col" width="20%">
                        Doctor's name
                      </th>
                      <th class="fw-normal" scope="col" width="20%">
                        Designation
                      </th>
                      <th class="fw-normal" scope="col" width="10%">
                        Department
                      </th>
                      <th class="fw-normal" scope="col" width="10%">Room</th>
                      <th class="fw-normal" scope="col" width="10%">Fee</th>
                      <th class="fw-normal" scope="col" width="20%">
                        Available
                      </th>
                      <th class="fw-normal" scope="col" width="10">Action</th>
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

                          <p class="mb-0 font-10">
                            <center>
                              <div
                                v-if="doc.activeStatus == 1"
                                class="d-flex"
                                style="width: 80px"
                              >
                                <div class="led m-1"></div>
                                <p>Active Now</p>
                              </div>
                            </center>
                          </p>

                          <p class="mb-0 font-10">
                            <center>
                              <div
                                v-if="doc.activeStatus == 0"
                                class="d-flex"
                                style="width: 80px"
                              >
                                <div class="led m-1" style="background-color:red"></div>
                                <p>Inactive</p>
                              </div>
                            </center>
                          </p>
                        </td>
                        <td class="designation-font">
                          {{ doc.qualification }}
                        </td>
                        <td class="table-font-size">
                          <strong>{{ doc.department }}</strong>
                        </td>
                        <td class="table-font-size">{{ doc.room }}</td>
                        <td class="table-font-size">{{ doc.fee }} BDT</td>
                        <td class="table-font-size">
                          <div v-for="sche in docSchedule">
                            <div v-if="sche.doctorId === doc.id">
                              <p class="m-0">
                                {{ sche.startFrom }} - {{ sche.endTo }},({{
                                  sche.day
                                }})
                              </p>
                            </div>
                          </div>
                        </td>

                        <td class="designation-font">
                          <button
                            class="btn viewButton rounded-pill designation-font w-100 text-white"
                            @click="
                              toggleModaldr();
                              this.activeDoc = doc.id;
                              this.update = 1;
                            "
                          >
                            View
                          </button>

                          <router-link :to="`/editdoctor/${doc.id}`"
                            ><button
                              class="btn downButton rounded-pill designation-font w-100 text-white"
                            >
                              Edit
                            </button></router-link
                          >

                          <button
                            class="btn btn-danger rounded-pill designation-font w-100 text-white"
                            @click="this.delid = doc.id"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteConfirmModal"
                          >
                            Delete
                          </button>
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
          <router-link to="/adddoctor">
            <button class="btn downButton text-white w-100 rounded-0 py-3 mb-2">
              Add New Doctor Profile
            </button>
          </router-link>
          <button
            @click="toggleModal"
            class="btn reservButton text-white w-100 rounded-0 py-3 mb-2"
          >
            Change Dr. Reservation
          </button>

          <button
            @click="modalStat"
            class="btn reservButton text-white w-100 rounded-0 py-3 mb-2"
          >
            Add New Department
          </button>

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

  <Footer />
</template>
<script>
import TopNav from "../components/TopNav.vue";
import DashboardNav from "../components/DashboardNav.vue";
import Modal from "@/components/Modal.vue";
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import BasicInfo from "@/components/BasicInfo.vue";
import ConsultancyPeriod from "../components/ConsultancyPeriod.vue";
import UserInfo from "@/components/UserInfo.vue";
import Department from "@/modal/newDepartment.vue";
import DocModal from "@/modal/docModal.vue";
import { useToast } from "vue-toastification";

export default {
  props: ["manageDoc"],

  data() {
    return {
      appointments: [],
      deptSelect: "",
      doctorSearch: "",
      doctorList: [],
      department: [],
      docSchedule: [],
      reserveList: [],
      basicInfo: true,
      consultPeriod: false,
      userInfo: false,
      depaModal: false,
      docModal: false,
      activeDoc: 0,
      update: 0,
      chooseDept: "",
      chooseDoc: "",
      max: "",
      min: "",
      delid: "",
      mreserved: "",
    };
  },

  mounted() {
    this.getDoctorlist();
    this.getDepartment();
    this.getAppointment();
    let day = new Date();
    this.toDay = this.formatDate(day);
  },
  methods: {
    delDoc(id) {
      const data = new FormData();
      data.append("id", id);
      fetch(
        "http://server.parkviewappointment.com/parkview/admin/deleteDoctor",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.update = 1;
          this.toast.success("Doctor Profile Deleted", {
            timeout: 4000,
          });
        })
        .catch((err) => console.log(err));
    },
    changeReserved(index) {
      console.log(this.reserveList);

      if (this.reserveList.indexOf(index) > -1) {
        console.log("delete");
        this.reserveList.splice(this.reserveList.indexOf(index), 1);
      } else {
        console.log("pushed");
        this.reserveList.push(index);
      }
      console.log(this.reserveList);
    },
    setMax() {
      this.doctorList.map((item) => {
        if (item.id == this.chooseDoc) {
          this.max = item.max;
          this.min = item.min;
        }
      });

      this.docSchedule.map((item) => {
        if (item.doctorId == this.chooseDoc) {
          this.mreserved = item.reserved.split(",");
        }
      });

      this.mreserved.map((reserve) => {
        if (Number(reserve) != 0) {
          this.reserveList.push(Number(reserve));
        }
      });
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
    getDoctorlist() {
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/getDoctor",
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
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
          console.log(res.appointment);
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

    updateDocreserve() {
      const data = new FormData();
      data.append("id", this.chooseDoc);
      data.append("reserved", this.reserveList);

      fetch(
        "http://server.parkviewappointment.com/parkview/reception/updateDocreserve",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.toast.success("Reservation Updated", {
            timeout: 4000,
          });
        })
        .catch((err) => console.log(err.message));
    },

    changeUp() {
      this.update = 0;
    },

    changeBasic() {
      this.basicInfo = true;
      this.consultPeriod = false;
      this.userInfo = false;
    },
    changeConsult() {
      this.basicInfo = false;
      this.consultPeriod = true;
      this.userInfo = false;
    },
    changeUser() {
      this.basicInfo = false;
      this.consultPeriod = false;
      this.userInfo = true;
    },

    modalStat() {
      this.depaModal = !this.depaModal;
    },
  },

  computed: {
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
  },

  setup() {
    const modalActive = ref(false);
    const modaldrActive = ref(false);
    const toast = useToast();
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    const toggleModaldr = () => {
      modaldrActive.value = !modaldrActive.value;
    };
    return {
      modalActive,
      toggleModal,
      modaldrActive,
      toggleModaldr,
      toast,
    };
  },
  watch: {
    update(newVal) {
      if (newVal == 1) {
        this.getDoctorlist();
        this.update = 1;
      }
    },
  },
  name: "ManageDoctorView",
  components: {
    TopNav,
    DashboardNav,
    Modal,
    Footer,
    BasicInfo,
    ConsultancyPeriod,
    UserInfo,
    Department,
    DocModal,
  },
};
</script>
