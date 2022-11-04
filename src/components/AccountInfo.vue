<template>
  <div class="row py-3 px-4">
    <div class="col-lg-5">
      <div class="mb-2"></div>

      <div class="mb-2">
        <label for="" class="form-label">Email</label>
        <input
          type="email"
          class="form-control form-control-sm rounded-0 border-dark"
          v-model="email"
        />
        <small v-if="this.email == ''" class="reqField">{{ message }}</small>
      </div>
      <div class="mb-2">
        <label for="" class="form-label">Number</label>
        <input
          type="text"
          class="form-control form-control-sm rounded-0 border-dark"
          v-model="phoneNo"
        />
        <small v-if="this.phoneNo == ''" class="reqField">{{ message }}</small>
      </div>
      <div class="mb-2">
        <label for="" class="form-label">Password</label>
        <input
          type="password"
          class="form-control form-control-sm rounded-0 border-dark"
          v-model="password"
        />
        <small v-if="this.password == ''" class="reqField">{{ message }}</small>
      </div>
      <div class="mb-2">
        <label for="" class="form-label">Retype Password</label>
        <input
          type="password"
          class="form-control form-control-sm rounded-0 border-dark"
          v-model="repassword"
        />
        <small v-if="this.repassword == ''" class="reqField">{{
          message
        }}</small>
      </div>
    </div>
    <div v-for="doc in docInfo" class="col-lg-5">
      <div class="drOverviewCard bg-light rounded p-3 mb-2">
        <p class="fw-bold m-0">{{ doc.doctor }}</p>
        <p class="m-0 designation-font">{{ doc.qualification }}</p>
        <p class="m-0 designation-font">Associate Professor, Medicine</p>
        <p class="mb-2 designation-font">Parkview Hospital</p>
        <div class="roomInfo text-white text-center rounded-pill">
          <p class="mb-2">Room No: {{ doc.room }}</p>
        </div>
        <div class="consultancyInfo text-white text-center rounded-pill">
          <p class="m-0">Consultancy: {{ doc.fee }} BDT</p>
        </div>
      </div>
    </div>
    <div class="col-lg-2">
      <button
        @click="makeSave"
        class="btn downButton btnMargin text-white w-100 rounded-0 py-3 mb-2"
      >
        Add Doctor
      </button>
    </div>
  </div>

  <Loading :active="load" />
</template>

<script>
import { useToast } from "vue-toastification";
export default {
  name: "Accounts Info",
  props: ["next", "docId"],
  data() {
    return {
      docInfo: [],
      email: "",
      phoneNo: "",
      password: "",
      repassword: "",
      load: false,
      message: "",
    };
  },

  mounted() {
    this.getDoctorInfo();
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    getDoctorInfo() {
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
    makeSave() {
      if (this.email == "") {
        this.message = "*Required Field";
        this.toast.error("Add Accounts info properly", {
          timeout: 4000,
        });
        return false;
      }
      if (this.phoneNo == "") {
        this.message = "*Required Field";
        this.toast.error("Add Accounts info properly", {
          timeout: 4000,
        });
        return false;
      }
      if (this.password == "") {
        this.message = "*Required Field";
        this.toast.error("Add Accounts info properly", {
          timeout: 4000,
        });
        return false;
      }
      if (this.repassword == "") {
        this.message = "*Required Field";
        this.toast.error("Add Accounts info properly", {
          timeout: 4000,
        });
        return false;
      }

      this.load = true;
      const data = new FormData();
      data.append("docId", this.docId);
      data.append("email", this.email);
      data.append("phone", this.phoneNo);
      data.append("password", this.password);
      fetch(
        "http://server.parkviewappointment.com/parkview/reception/postNewDoc",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.load = false;
          if (res.message == null) {
            this.$router.push({ path: "/managedoctor", replace: true });
          } else {
            this.toast.success(res.message, {
              timeout: 1000,
            });
          }
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>
