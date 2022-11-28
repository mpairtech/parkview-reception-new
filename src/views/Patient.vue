<template>
  <!-- <Loading :active="preloader" /> -->
  <TopNav />
  <DashboardNav />

  <!-- Modal -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Delete</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Are You sure you want to Delete this user ?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="delUser(this.delid)"
            data-bs-dismiss="modal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal End -->

  <div class="canvasBoard">
    <div class="container-fluid p-4">
      <div class="row mb-3">
        <div class="col-lg-12 ps-0">
          <div class="bg-white pb-3">
            <div class="row mb-2">
              <div class="col-lg-12">
                <p class="m-0 fs-5 px-3 py-2 border-bottom border-dark">
                  User Data
                </p>
              </div>
            </div>
            <div class="row px-5">
              <div class="col-lg-3">
                <div class="addUserCard bg-light pb-2">
                  <p class="m-0 fw-bold px-3 py-2 border-bottom border-dark">
                    Add New User
                  </p>
                  <div class="mb-1 px-3">
                    <label class="form-label mb-0 mt-3 text-secondary"
                      ><small>Name</small></label
                    >
                    <input
                      type="text"
                      class="form-control form-control-sm rounded-0 border-dark"
                      v-model="name"
                    />
                    <small v-if="this.userName == ''" class="reqField">{{
                      message
                    }}</small>
                  </div>
                  <div class="mb-1 px-3">
                    <label class="form-label mb-0 mt-2 text-secondary"
                      ><small>Mobile No</small></label
                    >
                    <input
                      type="tel"
                      class="form-control form-control-sm rounded-0 border-dark"
                      v-model="mobile"
                    />
                    <small v-if="this.userMobile == ''" class="reqField">{{
                      message
                    }}</small>
                  </div>

                  <div class="mb-1 px-3">
                    <label class="form-label mb-0 mt-2 text-secondary"
                      ><small>NID</small></label
                    >
                    <input
                      type="tel"
                      class="form-control form-control-sm rounded-0 border-dark"
                      v-model="nid"
                    />
                  </div>

                  <div class="mb-1 px-3">
                    <label class="form-label mb-0 mt-2 text-secondary"
                      ><small>E-mail</small></label
                    >
                    <input
                      type="email"
                      class="form-control form-control-sm rounded-0 border-dark"
                      v-model="email"
                    />
                    <small v-if="this.userEmail == ''" class="reqField">{{
                      message
                    }}</small>
                  </div>

                  <div class="mb-1 px-3">
                    <label class="form-label mb-0 mt-2 text-secondary"
                      ><small>Gender</small></label
                    >
                    <select
                      type="email"
                      class="form-control form-control-sm rounded-0 border-dark"
                      v-model="gender"
                    >
                      <option value="">Choose Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div class="mb-1 px-3">
                    <label class="form-label mb-0 mt-2 text-secondary"
                      ><small>Password</small></label
                    >
                    <input
                      type="password"
                      class="form-control form-control-sm rounded-0 border-dark"
                      v-model="password"
                    />
                    <small v-if="this.userPassword == ''" class="reqField">{{
                      message
                    }}</small>
                  </div>

                  <div class="mb-1 px-3">
                    <label class="form-label mb-0 mt-2 text-secondary"
                      ><small>Re-type Password</small></label
                    >
                    <input
                      type="password"
                      class="form-control form-control-sm rounded-0 border-dark"
                      v-model="rpassword"
                    />
                  </div>

                  <div class="mb-1 mt-3 px-3">
                    <button
                      class="btn btn-secondary w-100 rounded-0"
                      @click="newPatient()"
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-lg-9">
                <div class="userDataCard bg-light">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <p class="m-0 fw-bold px-3 py-2">User List</p>

                    <input
                      type="text"
                      v-model="searchTerm"
                      placeholder="Search by ID, Mobile Number"
                      style="height: 2rem; width: 30rem; font-size: 14px"
                    />

                    <input
                      type="month"
                      v-model="searchDate"
                      style="height: 2rem; font-size: 14px"
                    />
                  </div>

                  <div
                    class="userlist"
                    style="height: 33.7rem; overflow: auto; font-size: small"
                  >
                    <table class="table text-center align-middle mb-1">
                      <thead
                        class="text-center thead-color-2 text-white"
                        style="position: sticky; top: 0"
                      >
                        <tr>
                          <th class="fw-normal" scope="col" width="5%">Id</th>
                          <th class="fw-normal" scope="col" width="25%">
                            Name
                          </th>
                          <th class="fw-normal" scope="col" width="12%">
                            Mobile
                          </th>
                          <th class="fw-normal" scope="col" width="13%">NID</th>
                          <th class="fw-normal" scope="col" width="20%">
                            Email
                          </th>

                          <th class="fw-normal" scope="col" width="10%">
                            Gender
                          </th>
                          <th class="fw-normal" scope="col" width="15%">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody class="border-0">
                        <tr
                          class="bg-light border border-1 border-bottom border-white"
                          v-for="user in filteredList"
                        >
                          <template
                            v-if="
                              user.date
                                .toString()
                                .includes(searchDate.toString())
                            "
                          >
                            <td class="border-0">{{ user.id }}</td>
                            <td class="border-0">{{ user.name }}</td>
                            <td class="border-0">{{ user.mobile }}</td>
                            <td class="border-0">{{ user.nid }}</td>
                            <td class="border-0">{{ user.email }}</td>
                            <td class="border-0">{{ user.gender }}</td>
                            <td class="border-0">
                              <button
                                @click="this.delid = user.id"
                                class="btn btn-danger btn-sm rounded-0 w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                              >
                                Delete
                              </button>

                              <br />
                            </td>
                          </template>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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
              type="text"
              class="form-control shadow-none border-0 rounded-0 bg-light"
              id=""
              v-model="oldpass"
              placeholder="********"
            />
          </div>

          <div class="col-lg-8 p-0">
            <label>New Password</label>
            <input
              type="text"
              class="form-control shadow-none border-0 rounded-0 bg-light"
              id=""
              v-model="newpass"
              placeholder="********"
            />
          </div>

          <div class="col-lg-8 p-0">
            <label>Re type new Password</label>
            <input
              type="text"
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

  <FooterVue />
</template>
<script>
import TopNav from '@/components/TopNav.vue';
import DashboardNav from '@/components/DashboardNav.vue';

import { useToast } from 'vue-toastification';
import FooterVue from '@/components/Footer.vue';
export default {
  components: { TopNav, DashboardNav, FooterVue },
  data() {
    return {
      userData: [],
      name: '',
      mobile: '',
      nid: '',
      email: '',
      gender: '',
      password: '',
      rpassword: '',
      update: 0,
      delid: '',
      preloader: true,
      message: '',
      gender: '',
      oldpass: '',
      newpass: '',
      rnewpass: '',
      searchTerm: '',
      searchDate: '',
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  watch: {
    update(update) {
      if (update == 1) {
        this.getUser();
        this.update = 0;
      }
    },
  },
  methods: {
    clearFields() {
      this.name = '';
      this.mobile = '';
      this.email = '';
      this.password = '';
      this.rnewpass = '';
      this.nid = '';
    },
    newPatient() {
      if (this.password != this.rpassword) {
        alert('Password do not match');
        return false;
      }
      const data = new FormData();
      data.append('name', this.name);
      data.append('mobile', this.mobile);
      data.append('nid', this.nid);
      data.append('email', this.email);
      data.append('gender', this.gender);
      data.append('password', this.password);

      fetch(`${process.env.VUE_APP_SERVER_URL}/patient/newPatient`, {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message == null) {
            this.clearFields();
            this.toast.success('New Patient Added', {
              timeout: 1000,
            });
            this.update = 1;
          } else {
            this.toast.warning(res.message, {
              timeout: 1000,
            });
          }
        })
        .catch((err) => console.log(err));
    },
    delUser(id) {
      const data = new FormData();
      data.append('id', id);
      fetch(`${process.env.VUE_APP_SERVER_URL}/admin/deletePatient`, {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.update = 1;
        })
        .catch((err) => console.log(err));
    },

    getUser() {
      fetch(`${process.env.VUE_APP_SERVER_URL}/reception/getPatient`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          this.preloader = false;
          this.userData = res.patient;
        })
        .catch((err) => console.log(err));
    },

    updatePass() {
      if (this.oldpass == '') {
        this.toast.success('Password field is empty', {
          timeout: 4000,
        });
        return false;
      }

      if (this.newpass == '') {
        this.toast.success('New Password field is empty', {
          timeout: 4000,
        });
        return false;
      }

      if (this.newpass != this.rnewpass) {
        this.toast.warning('Password do not match', {
          timeout: 4000,
        });
        return false;
      }

      const data = new FormData();
      data.append('opass', this.oldpass);
      data.append('pass', this.newpass);
      data.append('uid', this.delid);

      fetch(`${process.env.VUE_APP_SERVER_URL}/admin/updatepatientPass`, {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message == true) {
            this.toast.success('User Password Updated', {
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
    this.getUser();
    var month = new Date().getMonth();
    month = Number(month) + 1;
    this.searchDate = new Date().getFullYear() + '-' + month;
  },

  computed: {
    filteredList() {
      return this.userData?.filter((post) => {
        if (
          post.id
            .toString()
            .toLowerCase()
            .includes(this.searchTerm.toString().toLowerCase()) ||
          post.mobile
            .toString()
            .toLowerCase()
            .includes(this.searchTerm.toString().toLowerCase())
        ) {
          return post;
        }
      });
    },
  },
};
</script>
<style></style>
