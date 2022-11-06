<template>
  <TopNav />
  <DashboardNav />

  <div
    class="modal fade"
    id="passChange"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Password Change</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="col-lg-8 p-0">
            <label>Old Password</label>
            <input
              type="password"
              class="form-control shadow-none border-0 rounded-0 bg-light"
              id=""
              v-model="oldpass"
              placeholder="********"
            />
          </div>

          <div class="col-lg-8 p-0">
            <label>New Password</label>
            <input
              type="password"
              class="form-control shadow-none border-0 rounded-0 bg-light"
              id=""
              v-model="newpass"
              placeholder="********"
            />
          </div>

          <div class="col-lg-8 p-0">
            <label>Re-type New Password</label>
            <input
              type="password"
              class="form-control shadow-none border-0 rounded-0 bg-light"
              id=""
              v-model="rnewpass"
              placeholder="********"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" @click="updatePass" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="canvasBoard" style="height: 37.2rem">
    <div class="container-fluid p-4">
      <div class="row">
        <div class="col-lg-4 mx-auto my-5">
          <img src="../assets/Images/parkview.webp" alt="" class="mb-4" />
          <div class="userInfoBoard bg-white py-2 rounded">
            <div class="row">
              <div class="col-lg-12">
                <div class="row px-4">
                  <div class="col-lg-12">
                    <div class="row border-bottom border-secondary mt-4 mb-2">
                      <div class="col-lg-6">
                        <p class="m-0 mb-2 text-center">Username</p>
                      </div>
                      <div class="col-lg-6">
                        <p class="m-0 mb-2 text-center" v-for="info in recInfo">
                          {{ info.name }}
                        </p>
                      </div>
                    </div>
                    <div class="row border-bottom border-secondary mb-4">
                      <div class="col-lg-6">
                        <p class="m-0 mb-2 text-center">User Email</p>
                      </div>
                      <div class="col-lg-6">
                        <p class="m-0 mb-2 text-center" v-for="info in recInfo">
                          {{ info.email }}
                        </p>
                      </div>
                    </div>
                    <div class="row mb-2">
                      <button
                        class="btn btn-light text-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#passChange"
                      >
                        Change Password
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
  <FooterVue />
</template>
<script>
import TopNav from '@/components/TopNav.vue';
import DashboardNav from '@/components/DashboardNav.vue';
import FooterVue from '@/components/Footer.vue';
import { useToast } from 'vue-toastification';
export default {
  components: { TopNav, DashboardNav, FooterVue },
  data() {
    return {
      recInfo: [],
      oldpass: '',
      newpass: '',
      rnewpass: '',
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    updatePass() {
      if (this.newpass != this.rnewpass) {
        this.toast.error('Password do not match', {
          timeout: 4000,
        });
        return false;
      }
      const data = new FormData();
      data.append('opass', this.oldpass);
      data.append('pass', this.newpass);
      data.append('token', localStorage.getItem('token'));

      fetch(
        'http://server.parkviewappointment.com/parkview/reception/updatePass',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.message == true) {
            this.toast.success('Receptionist Password Updated', {
              timeout: 4000,
            });
          } else {
            this.toast.success(res.message, {
              timeout: 4000,
            });
          }
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    const data = new FormData();
    data.append('token', localStorage.getItem('token'));
    fetch(
      'http://server.parkviewappointment.com/parkview/reception/getCheckinfo',
      {
        method: 'POST',
        body: data,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.recInfo = res.message;
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style></style>
