<template>
  <loading :active="preloader" />
  <nav class="navbar navbar-expand-lg sticky-top nav-shadow">
    <div class="container-fluid">
      <router-link to="/dashboard" class="navbar-brand">
        <img
          src="@/assets/Images/parkview.webp"
          class="img-fluid patient-dashboard-hospital-logo"
          alt=""
          srcset=""
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse row" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item nav-user-btn ms-auto">
            <router-link
              to="/userinfo"
              class="nav-link btn border-nav-btn mx-2 text-dark px-4 shadow-none"
            >
              <div class="row">
                <div class="col-lg-10 p-0 text-end">
                  <p class="my-auto" v-for="info in receptioninfo">
                    {{ info.name }}
                  </p>
                </div>
                <div class="col-lg-2 p-0">
                  <img
                    src="@/assets/Images/user.png"
                    class="img-fluid nav-link-icon-width my-auto"
                    alt=""
                    srcset=""
                  />
                </div>
              </div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              @click="logOut"
              to="/"
              class="nav-link btn border-nav-btn mx-2 text-dark px-4 shadow-none"
            >
              <div class="row">
                <div class="col-lg-12 p-0">Logout</div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Loading from "@/common/loading.vue";
export default {
  name: "TopNav",
  data() {
    return {
      preloader: true,
      receptioninfo: [],
    };
  },
  mounted() {
    this.checkUser();
    this.delDoc();
  },
  methods: {
    delDoc() {
      fetch("http://server.parkviewappointment.com/parkview/admin/delunDoc", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {})
        .catch((err) => console.log(err));
    },
    checkUser() {
      if (localStorage.getItem("token") == null) {
        this.$router.push({ path: "/", replace: true });
      } else {
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
            this.preloader = false;

            console.log(res.message);
            this.receptioninfo = res.message;
            if (!res.valid) {
            }
          })
          .catch((err) => console.log(err.message));
      }
    },
    logOut() {
      localStorage.removeItem("token");
      this.$router.push({ path: "/", replace: true });
    },
  },
  components: { Loading },
};
</script>

<style>
.patient-dashboard-hospital-logo {
  width: 15rem;
}
.border-nav-btn {
  border: 1px dashed #d2d2d2 !important;
}
.border-nav-btn:hover {
  border: 1px dashed #ff0101 !important;
  transition: ease-in 0.5s;
}
.nav-link-icon-width {
  width: 1rem;
}
.nav-user-btn {
  width: 18rem;
}
.nav-shadow {
  background-color: #f9f9f9;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.hospital-logo {
  height: 3rem;
}

.border-nav-btn {
  border: 1px dashed #d2d2d2;
}

.nav-link-icon {
  height: 1rem;
}

.nav-user-btn {
  width: 14rem;
  height: 2.5rem;
}

.nav-shadow {
  background-color: #f9f9f9;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.patient-dashboard-top-margin {
  margin-top: 4.2rem;
}
</style>
