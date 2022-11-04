<template>
  <div :class="[active ? 'side-back' : '']">
    <div :class="[active ? 'sideModal active' : 'sideModal']">
      <div class="modal-content-a">
        <div class="row">
          <div class="col-lg-12">
            <i
              @click="close"
              class="fa-solid fa-xmark ps-2 close-btn"
              style="cursor: pointer"
            ></i>
            <div class="row mb-2">
              <div class="col-lg-12">
                <p
                  class="m-0 fs-6 text-dark mt-2 px-4 py-2 border-bottom border-dark"
                >
                  <strong>Doctor Profile</strong>
                </p>
                <div v-for="doc in docList" class="row">
                  <div class="col-lg-12 text-center">
                    <img
                      :src="[
                        'http://parkviewappointment.com/image/' + doc.docimage,
                      ]"
                      alt=""
                      style="height: 5rem"
                      class="border border-dark rounded-circle mt-4 mb-2"
                    />
                    <p class="fw-bold mb-1">{{ doc.doctor }}</p>
                    <p class="m-0 designation-font">{{ doc.qualification }}</p>
                    <p class="mb-2 designation-font">Parkview Hospital</p>
                    <p
                      class="deptDr text-white mb-2 mx-auto rounded-pill"
                      style="width: 6rem; font-size: 0.8rem"
                    >
                      {{ doc.department }}
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <ul class="nav justify-content-center bg-light">
                      <li
                        :class="[
                          activeItem === 'basicInfo'
                            ? 'nav-item navactive'
                            : 'nav-item',
                        ]"
                      >
                        <a
                          class="nav-link"
                          style="cursor: pointer"
                          @click="changeActive('basicInfo')"
                          ><p class="m-0 fs-6 text-dark">Basic Info</p></a
                        >
                      </li>
                      <li
                        :class="[
                          activeItem === 'consultPeriod'
                            ? 'nav-item navactive'
                            : 'nav-item',
                        ]"
                      >
                        <a
                          class="nav-link"
                          style="cursor: pointer"
                          @click="changeActive('consultPeriod')"
                          ><p class="m-0 fs-6 text-dark">
                            Consultancy Period
                          </p></a
                        >
                      </li>
                      <li
                        :class="[
                          activeItem === 'userInfo'
                            ? 'nav-item navactive'
                            : 'nav-item',
                        ]"
                      >
                        <a
                          class="nav-link"
                          style="cursor: pointer"
                          @click="changeActive('userInfo')"
                          ><p class="m-0 fs-6 text-dark">User Info</p></a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="" v-if="activeItem === 'basicInfo'">
                      <div class="row">
                        <div v-for="doc in docList" class="col-lg-9 mx-auto">
                          <div class="row mb-3">
                            <div class="col-lg-12">
                              <div class="row mt-4 basInfoBorder">
                                <div class="col-lg-6">
                                  <p class="m-0 basicInfoFont">Room Number</p>
                                </div>
                                <div class="col-lg-3 ms-auto">
                                  <p
                                    class="m-0 basicInfoFont text-end"
                                    style="color: #62b8ce"
                                  >
                                    {{ doc.room }}
                                  </p>
                                </div>
                              </div>
                              <div class="row mt-2 basInfoBorder">
                                <div class="col-lg-6">
                                  <p class="m-0 basicInfoFont">
                                    Consultancy Fee
                                  </p>
                                </div>
                                <div class="col-lg-3 ms-auto">
                                  <p
                                    class="m-0 basicInfoFont text-end"
                                    style="color: #62b8ce"
                                  >
                                    {{ doc.fee }}
                                  </p>
                                </div>
                              </div>
                              <div class="row mt-2 basInfoBorder">
                                <div class="col-lg-6">
                                  <p class="m-0 basicInfoFont">
                                    Max Appointment
                                  </p>
                                </div>
                                <div class="col-lg-3 ms-auto">
                                  <p
                                    class="m-0 basicInfoFont text-end"
                                    style="color: #62b8ce"
                                  >
                                    {{ doc.max }}
                                  </p>
                                </div>
                              </div>
                              <div class="row mt-2">
                                <div class="col-lg-6">
                                  <p class="m-0 basicInfoFont">
                                    Consultancy Period
                                  </p>
                                </div>
                                <div class="col-lg-3 ms-auto">
                                  <p
                                    class="m-0 basicInfoFont text-end"
                                    style="color: #62b8ce"
                                  >
                                    {{ doc.min }} min
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            v-for="doc in docList"
                            class="row bg-light rounded"
                          >
                            <div class="col-lg-12 px-4 py-3">
                              <div class="row mb-3">
                                <div class="col-lg-4">
                                  <label class="form-check-label fw-bold"
                                    >Unavailable Period {{ doc.period }}</label
                                  >
                                </div>
                              </div>
                              <div class="row mb-2">
                                <div class="col-lg-12">
                                  <div class="form-check">
                                    <label class="form-check-label"
                                      >Single Day</label
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div
                                  class="col-lg-6"
                                  v-if="doc.period == 'single'"
                                >
                                  <p
                                    class="form-control form-control-sm border-dark"
                                  >
                                    {{ doc.startDate }}
                                  </p>
                                </div>

                                <div
                                  class="col-lg-6"
                                  v-if="doc.period == 'more'"
                                >
                                  <p
                                    class="form-control form-control-sm border-dark"
                                  >
                                    {{ doc.startDate }}
                                  </p>
                                  <p
                                    class="form-control form-control-sm border-dark"
                                  >
                                    {{ doc.endDate }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="" v-if="activeItem === 'consultPeriod'">
                      <div class="row py-4">
                        <div v-for="sche in scheDules" class="col-lg-9 mx-auto">
                          <div class="row mb-2">
                            <div class="col-lg-2">
                              <p class="m-0">{{ sche.day }}</p>
                            </div>
                            <div class="col-lg-4">
                              <p class="m-0">{{ sche.session }}</p>
                            </div>
                            <div class="col-lg-6">
                              <p class="m-0">
                                {{ sche.startFrom }} - {{ sche.endTo }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="" v-if="activeItem === 'userInfo'">
                      <div v-for="info in userInfo" class="row py-5">
                        <div class="col-lg-9 mx-auto">
                          <div class="row mb-2 py-2 bg-light rounded-pill">
                            <div class="col-lg-6">
                              <p class="m-0">Mobile Number</p>
                            </div>
                            <div class="col-lg-6">
                              <p
                                class="m-0 text-end fw-bold"
                                style="color: #15495d"
                              >
                                {{ info.phone }}
                              </p>
                            </div>
                          </div>
                          <div class="row mb-2 py-2 bg-light rounded-pill">
                            <div class="col-lg-6"><p class="m-0">Email</p></div>
                            <div class="col-lg-6">
                              <p
                                class="m-0 text-end fw-bold"
                                style="color: #15495d"
                              >
                                {{ info.email }}
                              </p>
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
    </div>
  </div>
</template>
<script>
import BasicInfo from '@/components/BasicInfo.vue';
import ConsultancyPeriod from '../components/ConsultancyPeriod.vue';
import UserInfo from '@/components/UserInfo.vue';
export default {
  name: 'Docmodal',
  props: ['active', 'activeDoc', 'update', 'changeUp', 'close'],
  data() {
    return {
      activeItem: 'basicInfo',
      docList: [],
      scheDules: [],
      userInfo: [],
    };
  },
  mounted() {
    this.getDoctorlist();
    this.getSchedule();
  },

  watch: {
    update(update) {
      if (update == 1) {
        this.getDoctorlist();
        this.getSchedule();
        this.changeUp();
      }
    },
  },

  methods: {
    changeActive(value) {
      this.activeItem = value;
    },

    getSchedule() {
      const data = new FormData();
      data.append('doctorId', this.activeDoc);
      fetch(
        'http://server.parkviewappointment.com/parkview/reception/getSchedule',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.scheDules = res.message;
        })
        .catch((err) => console.log(err.message));
    },

    getDoctorlist() {
      const data = new FormData();
      data.append('id', this.activeDoc);
      fetch(
        'http://server.parkviewappointment.com/parkview/reception/getDoctorById',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.docList = res.message;
          this.userInfo = res.userInfo;
        })
        .catch((err) => console.log(err));
    },
  },
  components: { BasicInfo, ConsultancyPeriod, UserInfo },
};
</script>
