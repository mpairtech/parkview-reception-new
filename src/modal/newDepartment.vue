<template>
  <!-- Modal -->

  <div
    class="modal fade"
    id="catChange"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Category</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label for="deptIcon"><small>Update Icon</small></label>
          <input
            type="file"
            @change="editFile"
            ref="files"
            class="form-control form-control-sm label-font"
            name=""
            id=""
            required
          />
          <div class="mt-3" v-for="dept in depts">
            <template v-if="dept.id == editid">
              

              <label><small>Department Name</small></label>
              <input
                type="text"
                class="form-control shadow-none border-0 rounded-0 bg-light mb-2"
                id=""
                v-model="newDeptName"
                placeholder=""
              />
            </template>
          </div>
        </div>
        <div class="modal-footer">

          <button
            type="button"
            @click="
              updateCategory();
              this.updateCat = 1;
            "
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Ends -->
  <div :class="[active ? 'side-back' : '']">
    <div :class="[active ? 'sideModal active' : 'sideModal']">
        <div class="row">
          <div class="col-lg-12">
        <i
          @click="close"
          class="fa-solid fa-xmark ps-2 close-btn"
          style="cursor: pointer"
        ></i>
        <h5 class="m-0 fs-6 text-dark px-4 mt-1 py-2 border-bottom border-dark">Add New Department</h5>
      <div class="px-4">
        <input type="text" v-model="department" placeholder="Enter Department Name" class="form-control rounded-0 my-2" />
        <input type="file" @change="uploadFile" ref="file" class="form-control rounded-0 my-2" />
        <button @click="subMit" class="btn btn-primary w-100 my-2">Add Department</button>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="px-4 pb-2">
                <p class="m-0 fs-6 py-3 pb-1 text-dark">
                  <strong>Category List</strong>
                </p>
            <div class="row mb-2">
              <div class="col-lg-12">

                    <div class="catTable">
                      <table class="table">
                        <thead class="text-center thead-color-2 text-white">
                          <tr>
                            <th class="fw-normal" scope="col">SL</th>
                            <th class="fw-normal" scope="col" width="10%">
                              Icon
                            </th>
                            <th class="fw-normal" scope="col">Name</th>
                            <th class="fw-normal" scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody class="text-center">
                          <tr
                            class="align-middle border-bottom border-secondary"
                            v-for="(dept, index) in depts"
                            :key="dept.id"
                          >
                            <td class="table-font-size">
                              {{ index + 1 }}
                            </td>
                            <td class="table-font-size">
                              <img
                                :src="[
                                  'http://parkviewappointment.com/image/' +
                                    dept.icon,
                                ]"
                                alt=""
                                style="height: 2rem"
                              />
                            </td>
                            <td class="table-font-size">
                              {{ dept.department }}
                            </td>
                            <td class="table-font-size">
                              <button
                                @click="
                                  this.editid = dept.id;
                                  this.newDeptName = dept.department;
                                "
                                class="btn btn-sm btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#catChange"
                              >
                                Edit
                              </button>
                            </td>
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
  </div>

  <Loading :active="loading" />
</template>
<script>
import Loading from '@/common/loading.vue';
export default {
  name: 'Department',
  props: ['active', 'close'],
  data() {
    return {
      depts: [],
      department: '',
      icon: '',
      load: true,
      editid: '',
      newDeptName: '',
      changeData: 0,
    };
  },
  watch: {
    changeData(changeData) {
      if (changeData == 1) {
        this.getData();
        this.changeData = 0;
      }
    },
  },

  mounted() {
    this.getData();
  },
  methods: {
    updateCategory() {
      console.log(this.changeData);
      let data = new FormData();
      data.append('id', this.editid);
      data.append('department', this.newDeptName);
      data.append('icon', this.icon);

      fetch(
        'http://server.parkviewappointment.com/parkview/reception/updateCategory',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.changeData = 1;
        })
        .catch((err) => console.log(err));

      console.log(this.changeData);
    },
    getData() {
      fetch(
        'http://server.parkviewappointment.com/parkview/reception/getDepartment',
        {
          method: 'POST',
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.depts = res.message;
          console.log(this.depts);
        })
        .catch((err) => console.log(err));
    },
    uploadFile() {
      this.icon = this.$refs.file.files[0];
    },
    subMit() {
      this.load = true;
      const data = new FormData();
      data.append('department', this.department);
      data.append('icon', this.icon);
      fetch(
        'http://server.parkviewappointment.com/parkview/reception/postDepartment',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.message == null) {
            this.load = true;
            this.close();
          }
        })
        .catch((err) => console.log(err.message));
    },
  },
  components: { Loading },
};
</script>

<style>
.close-btn {
  position: absolute;
  top: 2px;
  right: 4px;
  font-size: 1.5rem !important;
}
.modal-a {
  position: fixed;
  z-index: 1050;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */

  display: table;
  transition: opacity 0.3s ease;
}
.modal-inner-a {
  position: absolute;
  top: 0;
  right: 0;
  /* max-height: 100vh; */
  width: 500px;
  margin: 0px auto;
  background-color: #fff;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.4s ease;
}
.modal-animation-inner-enter-from {
  right: -1000px;
}

.modal-animation-inner-leave-to {
  right: -1000px;
}
.modal-animation-inner-enter-from .modal-inner-a,
.modal-animation-inner-leave-to .modal-inner-a {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
