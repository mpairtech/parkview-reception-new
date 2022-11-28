<template>
  <form @submit="makeSave" class="row py-3 px-4" id="docFrm">
    <div class="col-lg-5">
      <div class="row">
        <div class="col-lg-3 pt-3 mx-auto">
          <label for="docPic" class="form-label"
            ><img
              v-if="preview == false"
              src="../assets/Images/user.png"
              class="doctorDP"
              alt=""
            />
            <img v-if="preview" :src="[url]" class="doctorDP" alt="..." />
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
          v-model="dept"
        >
          <option value="">Choose</option>
          <option v-for="dlist in department">{{ dlist.department }}</option>
        </select>
      </div>
      <div class="mb-2">
        <label for="" class="form-label">Doctor Name</label>
        <input
          type="text"
          class="form-control form-control-sm rounded-0 border-dark"
          v-model="docName"
        />
        <small v-if="this.docName == ''" class="reqField">{{ message }}</small>
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
        <small v-if="this.roomNo == ''" class="reqField">{{ message }}</small>
      </div>
      <div class="mb-2">
        <label for="" class="form-label">Consultancy Fee</label>
        <input
          type="text"
          class="form-control form-control-sm rounded-0 border-dark"
          v-model="consFee"
        />
        <small v-if="this.consFee == ''" class="reqField">{{ message }}</small>
      </div>
    </div>
    <div class="col-lg-5">
      <div class="mb-2">
        <label for="" class="form-label">Maximum Consultancy</label>
        <input
          type="text"
          class="form-control form-control-sm rounded-0 border-dark"
          v-model="maxCons"
        />
        <small v-if="this.maxCons == ''" class="reqField">{{ message }}</small>
      </div>
      <div class="mb-2">
        <label for="" class="form-label">Minimum Consultancy Period</label>
        <select
          class="form-select form-select-sm rounded-0 border-dark"
          v-model="minConsPeriod"
        >
          <option>Choose</option>
          <option value="5">5 minutes</option>
          <option value="10">10 minutes</option>
          <option value="15">15 minutes</option>
          <option value="20">20 minutes</option>
          <option value="25">25 minutes</option>
          <option value="30">30 minutes</option>
        </select>
        <small v-if="this.minConsPeriod == ''" class="reqField">{{
          message
        }}</small>
      </div>

      <div class="mb-2">
        <label for="" class="form-label">Advanced Reservation</label>

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
      >
        Save & Next
      </button>
    </div>
  </form>

  <Loading :active="load" />
</template>

<script>
import Loading from '@/common/loading.vue';
import { useToast } from 'vue-toastification';
export default {
  name: 'DoctorInfo',
  props: ['next', 'docId', 'max'],
  data() {
    return {
      department: [],
      advanced: '0',
      dept: '',
      docName: '',
      qualification: '',
      roomNo: '',
      consFee: '',
      maxCons: '',
      minConsPeriod: '5',
      image: '',
      load: false,
      message: '',
      preview: false,
      url: '',
    };
  },
  mounted() {
    this.getDepartment();
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    doctorPic() {
      this.preview = true;

      this.image = this.$refs.file1.files[0];

      this.url = URL.createObjectURL(this.image);
    },
    getDepartment() {
      const data = new FormData();
      fetch(`${process.env.VUE_APP_SERVER_URL}/reception/getDepartment`, {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          this.department = res.message;
        })
        .catch((err) => console.log(err.message));
    },
    makeSave(e) {
      e.preventDefault();

      if (this.docName == '') {
        this.message = '*Required Field';
        this.toast.error('Please fill out all the fields', {
          timeout: 4000,
        });
        return false;
      }

      if (this.qualification == '') {
        this.message = '*Required Field';
        this.toast.error('Please fill out all the fields', {
          timeout: 4000,
        });
        return false;
      }
      if (this.roomNo == '') {
        this.message = '*Required Field';
        this.toast.error('Please fill out all the fields', {
          timeout: 4000,
        });
        return false;
      }
      if (this.consFee == '') {
        this.message = '*Required Field';
        this.toast.error('Please fill out all the fields', {
          timeout: 4000,
        });
        return false;
      }
      if (this.maxCons == '') {
        this.message = '*Required Field';
        this.toast.error('Please fill out all the fields', {
          timeout: 4000,
        });
        return false;
      }
      if (this.minConsPeriod == '') {
        this.message = '*Required Field';
        this.toast.error('Please fill out all the fields', {
          timeout: 4000,
        });
        return false;
      }

      if (this.advanced == '') {
        this.message = '*Required Field';
        this.toast.error('Please fill out all the fields', {
          timeout: 4000,
        });
        return false;
      }

      this.load = true;
      document.getElementById('docFrm').reset();
      const data = new FormData();
      data.append('doctor', this.docName);
      data.append('docimage', this.image);
      data.append('department', this.dept);
      data.append('qualification', this.qualification);
      data.append('room', this.roomNo);
      data.append('fee', this.consFee);
      data.append('max', this.maxCons);
      data.append('min', this.minConsPeriod);
      data.append('advanced', this.advanced);
      data.append('token', localStorage.getItem('token'));
      fetch(`${process.env.VUE_APP_SERVER_URL}/reception/postDoctor`, {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message == null) {
          } else {
            this.docId(res.message);
            this.max(this.maxCons);
            this.next();
          }
        })
        .catch((err) => console.log(err.message));
    },
  },
  components: { Loading },
};
</script>
