<template>
  <div :class="[active ? 'side-back' : '']">
    <div :class="[active ? 'sideModal active' : 'sideModal']">
      <div class="col-lg-2 offset-lg-10">
        <i
          @click="close"
          class="fa-solid fa-xmark ps-2 close-btn"
          style="cursor: pointer"
        ></i>
      </div>

      <div class="modal-content-a">
        <div class="row px-3">
          <div class="col-lg-12">
            <p class="m-0 fs-6 text-dark mt-2 px-4 py-2">
              <strong>Choose Your Appointment Schedule</strong>
            </p>
            <div v-for="doc in docInfo" class="row border-bottom px-4">
              <div class="col-lg-6 my-auto">
                <p class="fw-bold m-0">{{ doc.doctor }}</p>
                <p class="m-0 designation-font">
                  {{ doc.qualification }} ( {{ doc.department }} )
                </p>
                <p class="m-0 designation-font">{{ doc.department }}</p>
                <p class="mb-2 designation-font">Parkview Hospital</p>
              </div>
              <div class="col-lg-6">
                <img
                  src="@/assets/Images/doctorgroup.png"
                  class="img-fluid my-auto p-0"
                  alt=""
                />
              </div>
            </div>
            <div class="row my-5">
              <div class="col-lg-8 mx-auto">
                <div class="appointScheList" style="height: 25rem">
                  <button
                    v-for="index in Number(max)"
                    @click="handleValue(index)"
                    class="btn w-100 border-0 p-0 my-2"
                    :disabled="
                      this.reserved.includes(index.toString()) ? true : false
                    "
                  >
                    <div class="row text-dark fw-light text-center p-0 mb-0">
                      <div class="col-lg-3">
                        <p class="border yellow-color-light py-2 mb-0">
                          {{ index }}
                        </p>
                      </div>
                      <div class="col-lg-9">
                        <p class="border yellow-color-light py-2 mb-0">
                          {{ addMinutes(Number(min) * (index - 1)) }} -
                          {{ addMinutes(Number(min) * index) }}
                        </p>
                      </div>
                    </div>
                  </button>
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
export default {
  name: "Schedule",
  props: [
    "active",
    "docId",
    "max",
    "min",
    "setData",
    "visitDate",
    "day",
    "session",
    "update",
    "setupdate",
    "close",
  ],
  data() {
    return {
      appointments: [],
      reserved: [],
      docInfo: "",
      startFrom: "",
      endTo: "",
    };
  },

  mounted() {
    this.getSerial();
    this.getDocById();
    this.getDocAppointment();
  },

  watch: {
    update(update) {
      if (update == 1) {
        this.getSerial();
        this.getDocById();
        this.setupdate();
        this.getDocAppointment();
      }
    },
  },
  methods: {
    getDocById() {
      const data = new FormData();
      data.append("id", this.docId);
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/getDoctorById",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.docInfo = res.message;
        })
        .catch((err) => console.log(err.message));
    },
    getSerial() {
      const data = new FormData();
      data.append("doctor", this.docId);
      data.append("day", this.day);
      data.append("session", this.session);
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/getSerial",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.schedule.length > 0) {
            this.reserved = res.schedule[0].reserved.split(",");
            this.startFrom = res.schedule[0].startFrom;
            this.endTo = res.schedule[0].endTo;
          }
        })
        .catch((err) => console.log(err.message));
    },

    getDocAppointment() {
      const data = new FormData();
      data.append("id", this.docId);
      data.append("day", this.day);
      data.append("session", this.session);
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/getDocAppointment",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          var newsl = "";

          if (res.rappointment != "") {
            res.rappointment.map((item) => {
              this.reserved.push(item.serial.toString());
            });
          }

          // this.reserved = "," + this.reserved + "," + newsl;
        })
        .catch((err) => console.log(err.message));
    },

    handleValue(index) {
      var period =
        this.addMinutes(Number(this.min) * (index - 1)) +
        "-" +
        this.addMinutes(Number(this.min) * index);
      console.log(period);
      this.setData(index, period);
      this.close();
    },

    addMinutes(minutes) {
      var date = this.visitDate + ":" + this.startFrom;
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
        hours = "0" + hours;
      }
      var minutes = date.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes;
      return strTime;
    },
  },
};
</script>
