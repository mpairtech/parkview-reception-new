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
        <div class="modal-body">Are you sure to delete this schedule ?</div>
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
            @click="delSche(this.delid)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="canvasBoard">
    <div class="container-fluid p-4">
      <div class="row">
        <div class="col-lg-11 mx-auto bg-white">
          <div class="row">
            <div class="col-lg-12 bg-light">
              <ul class="nav my-1">
                <li
                  @click="changeStat('doctor')"
                  :class="
                    activeTab == 'doctor'
                      ? 'nav-item mx-5 navactive'
                      : 'nav-item mx-5'
                  "
                >
                  <a class="nav-link" style="cursor: pointer"
                    ><p class="m-0 fs-6 text-dark">
                      <strong>Doctor Info</strong>
                    </p></a
                  >
                </li>
                <li
                  @click="changeStat('schedule')"
                  :class="
                    activeTab == 'schedule'
                      ? 'nav-item mx-5 navactive'
                      : 'nav-item mx-5'
                  "
                >
                  <a
                    class="nav-link"
                    @click="this.activeTab = 'schedule'"
                    style="cursor: pointer"
                    ><p class="m-0 fs-6 text-dark">
                      <strong>Schedule & Reservation</strong>
                    </p></a
                  >
                </li>
                <li
                  @click="changeStat('available')"
                  :class="
                    activeTab == 'available'
                      ? 'nav-item mx-5 navactive'
                      : 'nav-item mx-5'
                  "
                >
                  <a
                    class="nav-link"
                    @click="this.activeTab = 'available'"
                    style="cursor: pointer"
                    ><p class="m-0 fs-6 text-dark">
                      <strong>On Leave</strong>
                    </p></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="" v-if="activeTab == 'doctor'">
                <div class="row py-3 px-4">
                  <div class="col-lg-5">
                    <div class="row">
                      <div class="col-lg-3 pt-3 mx-auto">
                        <label for="docPic" class="form-label">
                          <img
                            v-if="preview == false && image != ''"
                            :src="[
                              'http://parkviewappointment.com/image/' + image,
                            ]"
                            class="doctorDP"
                            alt="..."
                          />

                          <img
                            v-if="preview"
                            :src="[url]"
                            class="doctorDP"
                            alt="..."
                          />
                          <p v-if="image == ''" style="cursor: pointer">
                            <img
                              :src="[
                                'http://parkviewappointment.com/image/pngegg.png',
                              ]"
                              alt=""
                            />
                            Choose Photo
                          </p>
                        </label>
                        <input
                          class="form-control form-control-sm rounded-0 border-dark"
                          type="file"
                          @change="doctorPic"
                          id="docPic"
                          ref="file1"
                          style="visibility: hidden; cursor: pointer"
                        />
                      </div>
                    </div>
                    <div class="mb-2">
                      <label for="" class="form-label">Department</label>
                      <select
                        class="form-select form-select-sm rounded-0 border-dark"
                        v-model="depts"
                      >
                        <option>
                          {{ depts }}
                        </option>
                      </select>
                    </div>
                    <div class="mb-2">
                      <label for="" class="form-label">Doctor Name</label>
                      <input
                        type="text"
                        class="form-control form-control-sm rounded-0 border-dark"
                        v-model="docName"
                      />
                      <small v-if="this.docName == ''" class="reqField">{{
                        message
                      }}</small>
                    </div>
                    <div class="mb-2">
                      <label for="" class="form-label">Qualification</label>
                      <textarea
                        class="form-control form-control-sm rounded-0 border-dark"
                        rows="4"
                        v-model="qualification"
                      ></textarea>
                      <small v-if="this.qualification == ''" class="reqField">{{
                        message
                      }}</small>
                    </div>
                    <div class="mb-2">
                      <label for="" class="form-label">Room Number</label>
                      <input
                        type="text"
                        class="form-control form-control-sm rounded-0 border-dark"
                        v-model="roomNo"
                      />
                      <small v-if="this.roomNo == ''" class="reqField">{{
                        message
                      }}</small>
                    </div>
                    <div class="mb-2">
                      <label for="" class="form-label">Consultancy Fee</label>
                      <input
                        type="text"
                        class="form-control form-control-sm rounded-0 border-dark"
                        v-model="consFee"
                      />
                      <small v-if="this.consFee == ''" class="reqField">{{
                        message
                      }}</small>
                    </div>
                  </div>
                  <div class="col-lg-5">
                    <div class="mb-2">
                      <label for="" class="form-label"
                        >Maximum Consultancy</label
                      >
                      <input
                        type="text"
                        class="form-control form-control-sm rounded-0 border-dark"
                        v-model="maxCons"
                      />
                      <small v-if="this.maxCons == ''" class="reqField">{{
                        message
                      }}</small>
                    </div>
                    <div class="mb-2">
                      <label for="" class="form-label"
                        >Minimum Consultancy Period</label
                      >
                      <input
                        type="text"
                        class="form-control form-control-sm rounded-0 border-dark"
                        v-model="minCons"
                      />
                      <small v-if="this.minCons == ''" class="reqField">{{
                        message
                      }}</small>
                    </div>

                    <div class="mb-2">
                      <label for="" class="form-label"
                        >Advanced Reservation</label
                      >

                      <select
                        class="form-control form-control-sm rounded-0 border-dark"
                        v-model="advanced"
                      >
                        <option value="0">Same Day</option>
                        <option value="2">Three Days Ago</option>
                        <option value="4">Five Days Ago</option>
                        <option value="6">Seven Days Ago</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <button
                      class="btn downButton btnMargin text-white w-100 rounded-0 py-3 mb-2"
                      @click="updateDoctor"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <div class="" v-if="activeTab == 'schedule'">
                <div class="row py-3 px-4">
                  <div class="col-lg-12">
                    <div class="row mb-1" v-for="sche in prevSchedule">
                      <div class="col-sm-2">
                        <p class="mb-1">{{ sche.day }}</p>
                      </div>
                      <div class="col-sm-2">
                        <p class="mb-1">{{ sche.session }}</p>
                      </div>
                      <div class="col-sm-2">
                        <p class="mb-1">{{ sche.startFrom }}</p>
                      </div>
                      <div class="col-sm-2">
                        <p class="mb-1">{{ sche.endTo }}</p>
                      </div>
                      <div class="col-sm-2">
                        <p class="mb-1">
                          <button
                            class="btn btn-danger btn-sm"
                            @click="this.delid = sche.id"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteConfirmModal"
                          >
                            Delete
                          </button>
                        </p>
                      </div>
                    </div>

                    <h6>Select Schedule</h6>
                    <form @submit="makeSave" id="scheFrm" class="row mb-3">
                      <div class="col-lg-2">
                        <select
                          class="form-select form-select-sm border-dark w-75"
                          v-model="daySelect"
                        >
                          <option value="">Day</option>
                          <option v-for="day in days">{{ day }}</option>
                        </select>
                      </div>
                      <div class="col-lg-2">
                        <select
                          class="form-select form-select-sm border-dark w-75"
                          v-model="sessionSelect"
                        >
                          <option value="">Session</option>
                          <option value="morning">Morning</option>
                          <option value="evening">Evening</option>
                        </select>
                      </div>
                      <div class="col-lg-2 pe-0">
                        <div class="row">
                          <div class="col-lg-8 pe-0">
                            <input
                              type="time"
                              class="form-control form-control-sm border-dark"
                              v-model="startTime"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2 pe-0">
                        <div class="row">
                          <div class="col-lg-8 pe-0">
                            <input
                              type="time"
                              class="form-control form-control-sm border-dark"
                              v-model="endTime"
                            />
                          </div>
                          <div class="col-lg-4 ps-1 d-flex">
                            <button
                              class="btn btn-light"
                              style="margin-left: 80px"
                            >
                              <i
                                class="fa fa-check"
                                style="font-size: 14px"
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div class="" v-if="activeTab == 'available'">
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-lg-8 py-3">
                      <div class="card bg-light border-0 p-2">
                        <div class="card-body">
                          <p class="fw-bold font-14 mb-0">Unavailable Period</p>

                          <div class="form-check my-2">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              value=""
                              v-model="period"
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Available
                            </label>
                          </div>

                          <div class="form-check my-2">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              value="single"
                              v-model="period"
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Single Day
                            </label>
                          </div>
                          <div class="row">
                            <div class="col-lg-5">
                              <input
                                type="date"
                                class="form-control form-control-sm border-dark shadow-none w-100"
                                id=""
                                placeholder=""
                                v-if="period == 'single'"
                                v-model="startDate"
                              />
                            </div>
                            <div class="col-lg-2"></div>
                          </div>
                          <div class="form-check my-2">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id=""
                              value="more"
                              v-model="period"
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault1"
                            >
                              More Day
                            </label>
                          </div>
                          <div class="row my-2 mb-3">
                            <div class="col-lg-8 d-flex my-auto">
                              <input
                                type="date"
                                class="form-control form-control-sm border-dark shadow-none w-100"
                                v-if="period == 'more'"
                                v-model="startDate"
                              />
                              <i class="fa-solid fa-minus mx-2 my-auto"></i>
                              <input
                                type="date"
                                class="form-control form-control-sm border-dark shadow-none w-100"
                                v-if="period == 'more'"
                                v-model="endDate"
                              />
                            </div>
                          </div>

                          <button
                            @click="upAvailable"
                            class="btn downButton text-white w-100 rounded-0 py-3 mb-2"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
import TopNav from "../components/TopNav.vue";
import FooterVue from "@/components/Footer.vue";
import DashboardNav from "../components/DashboardNav.vue";

import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      docDeptSelect: "",
      depts: "",
      docs: "",
      delid: "",
      docName: "",
      roomNo: "",
      consFee: "",
      maxCons: "",
      minCons: "",
      activeTab: "doctor",
      prevSchedule: [],
      daySelect: "",
      sessionSelect: "",
      startTime: "",
      endTime: "",
      indexCheck: -1,
      update: 0,
      selectId: 0,
      scheDuleId: 0,
      reserved: [],
      load: false,
      image: "",
      max: "",
      message: "",
      advanced: "",
      days: ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"],
      preview: false,
      url: "",
      period: "",
      startDate: "",
      endDate: "",
    };
  },
  watch: {
    update(newVal) {
      if (newVal == 1) {
        this.getDocIndividual();
        this.getSchedule();
        this.update = 0;
      }
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.getDocIndividual();
    this.getSchedule();
  },
  methods: {
    doctorPic() {
      this.preview = true;

      this.image = this.$refs.file1.files[0];

      this.url = URL.createObjectURL(this.image);
    },
    getDocIndividual() {
      this.id = this.$route.params.id;
      const data = new FormData();
      data.append("id", this.id);

      fetch(
        `http://server.parkviewappointment.com/parkview/reception/getDoctorById`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message[0].docimage == "") {
            // this.preview = true;
          }

          this.docName = data.message[0].doctor;
          this.image = data.message[0].docimage;
          this.depts = data.message[0].department;
          this.qualification = data.message[0].qualification;
          this.roomNo = data.message[0].room;
          this.consFee = data.message[0].fee;
          this.maxCons = data.message[0].max;
          this.max = data.message[0].max;
          this.minCons = data.message[0].min;
          this.advanced = data.message[0].advanced;
          this.reserved = data.schedule[0].reserved;

          this.period = data.message[0].period;
          this.startDate = data.message[0].startDate;
          this.endDate = data.message[0].endDate;

          console.log(data.message[0].period);
        })
        .catch((err) => console.log(err.message));
    },
    delSche(id) {
      const data = new FormData();
      data.append("id", id);
      fetch(
        "http://server.parkviewappointment.com/parkview/admin/deleteSchedule",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.update = 1;
        })
        .catch((err) => console.log(err));
    },
    selectReserve() {
      if (this.reserved.includes(this.selectId)) {
        console.log("Already reserved");
      } else {
        this.reserved.push(this.selectId);
      }
    },
    clearField() {
      this.daySelect = "";
      this.sessionSelect = "";
      this.startTime = "";
      this.endTime = "";
    },
    tConvert(time) {
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(""); // return adjusted time or original string
    },

    makeSave(e) {
      e.preventDefault();

      if (this.daySelect == "") {
        this.message = "*Required Field";
        this.toast.error("Please select Schedule Day", {
          timeout: 4000,
        });
        return false;
      }
      if (this.sessionSelect == "") {
        this.message = "*Required Field";
        this.toast.error("Please select Schedule Session", {
          timeout: 4000,
        });
        return false;
      }
      if (this.startTime == "") {
        this.message = "*Required Field";
        this.toast.error("Please select Start Time", {
          timeout: 4000,
        });
        return false;
      }
      if (this.endTime == "") {
        this.message = "*Required Field";
        this.toast.error("Please select End Time", {
          timeout: 4000,
        });
        return false;
      }

      this.load = true;
      const data = new FormData();
      data.append("day", this.daySelect);
      data.append("session", this.sessionSelect);
      data.append("startFrom", this.tConvert(this.startTime));
      data.append("endTo", this.tConvert(this.endTime));
      data.append("doctorId", this.docId);
      data.append("reserved", this.reserved);
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/docSchedulePost",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.load = false;
          this.update = 1;
          this.scheDuleId = res.scheId;
        })
        .catch((err) => console.log(err.message));
      this.clearField();
    },
    getSchedule() {
      this.docId = this.$route.params.id;
      const data = new FormData();
      data.append("doctorId", this.docId);
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/getSchedule",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.prevSchedule = res.message;
        })
        .catch((err) => console.log(err.message));
    },
    changeStat(value) {
      this.activeTab = value;
    },
    changeDoc() {
      this.docInfo = true;
      this.scheInfo = false;
    },
    changeSche() {
      this.docInfo = false;
      this.scheInfo = true;
    },
    updateDoctor() {
      if (this.docName == "") {
        this.message = "*Required Field";
        this.toast.error("Please fill out all the fields", {
          timeout: 4000,
        });
        return false;
      }

      if (this.qualification == "") {
        this.message = "*Required Field";
        this.toast.error("Please fill out all the fields", {
          timeout: 4000,
        });
        return false;
      }
      if (this.roomNo == "") {
        this.message = "*Required Field";
        this.toast.error("Please fill out all the fields", {
          timeout: 4000,
        });
        return false;
      }
      if (this.consFee == "") {
        this.message = "*Required Field";
        this.toast.error("Please fill out all the fields", {
          timeout: 4000,
        });
        return false;
      }
      if (this.maxCons == "") {
        this.message = "*Required Field";
        this.toast.error("Please fill out all the fields", {
          timeout: 4000,
        });
        return false;
      }
      if (this.minConsPeriod == "") {
        this.message = "*Required Field";
        this.toast.error("Please fill out all the fields", {
          timeout: 4000,
        });
        return false;
      }

      const data = new FormData();
      data.append("id", this.id);
      data.append("department", this.depts);
      data.append("docimage", this.image);
      data.append("doctor", this.docName);
      data.append("qualification", this.qualification);
      data.append("room", this.roomNo);
      data.append("fee", this.consFee);
      data.append("max", this.maxCons);
      data.append("min", this.minCons);
      data.append("advanced", this.advanced);

      fetch(
        "http://server.parkviewappointment.com/parkview/reception/updateDoctor",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.update = 1;

          this.toast.success("Doctor Info has been updated", {
            timeout: 4000,
          });
        })
        .catch((err) => console.log(err));
    },

    upAvailable() {
      const data = new FormData();

      this.id = this.$route.params.id;

      data.append("period", this.period);
      data.append("startDate", this.startDate);
      data.append("endDate", this.endDate);
      data.append("id", this.id);

      fetch(
        "http://server.parkviewappointment.com/parkview/reception/upAvailable",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.toast.success("Availability Info Updated", {
            timeout: 4000,
          });
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getDocIndividual();
  },

  name: "EditDoctorView",
  components: {
    TopNav,
    DashboardNav,
    FooterVue,
  },
};
</script>
<style></style>
