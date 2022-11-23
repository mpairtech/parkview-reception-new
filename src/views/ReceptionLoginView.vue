<template>
  <div class="row m-0">
    <div class="col-lg-5 alignSection" id="">
      <div
        class="container border border-light w-75 py-4 px-5 log-page-border log-page-top bg-light"
      >
        <img
          src="@/assets/Images/parkview.webp"
          class="img-fluid logo-w2"
          alt=""
        />
        <h4 class="my-3 text-center">Reception</h4>

        <input
          class="form-control form-control-lg shadow-none borrder-1 border-dark my-3"
          type="text"
          placeholder="01XXXXXXXXX"
          aria-label="default input example"
          v-model="phone"
        />
        <input
          class="form-control form-control-lg shadow-none borrder-1 border-dark my-2"
          type="password"
          placeholder="***********"
          aria-label="default input example"
          v-model="password"
        />
        <!-- <p class="text-end">
          <a href="#" class="text-dark">Forget password?</a>
        </p> -->

        <button
          @click="logIn"
          class="btn btn-lg blue-color my-3 w-100 text-white fw-bold"
        >
          Log in
        </button>
      </div>
    </div>
  </div>

  <Loading :active="dLoading" />
</template>
<script>
import Loading from "@/common/loading.vue";
import { useToast } from "vue-toastification";

export default {
  name: "Reception Login",
  data() {
    return {
      phone: "",
      password: "",
      dLoading: false,
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("token") != null) {
        const data = new FormData();
        data.append("token", localStorage.getItem("token"));
        fetch(
          "http://server.parkviewappointment.com/parkview/reception/checkinfo",
          {
            method: "POST",
            body: data,
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.valid) {
              this.$router.push({ path: "/dashboard", replace: true });
            } else {
              localStorage.removeItem("token");
            }
          })
          .catch((err) => console.log(err.message));
      }
    },
    logIn() {
      this.dLoading = true;
      console.log(this.phone + this.password);
      const data = new FormData();
      data.append("phone", this.phone);
      data.append("password", this.password);
      fetch("http://server.parkviewappointment.com/parkview/reception/login", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.dLoading = false;
          if (res.message == true) {
            localStorage.setItem("token", res.token);
            this.$router.push({ path: "/dashboard", replace: true });
          } else {
            this.toast.error("Email or password incorrect", {
              timeout: 4000,
            });
          }
        })
        .catch((err) => console.log(err.message));
    },
  },
  components: { Loading },
};
</script>
<style>
.alignSection {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}
.blue-color {
  background-color: #195972 !important;
}
</style>
