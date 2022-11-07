<template>
  <div class="row py-3 px-4">
    <div class="col-lg-7">
      <div class="row mb-3" v-for="sche in prevSchedule">
        <div class="col-sm-2">
          <p>{{ sche.day }}</p>
        </div>
        <div class="col-sm-2">
          <p>{{ sche.session }}</p>
        </div>
        <div class="col-sm-2">
          <p>{{ sche.startFrom }}</p>
        </div>
        <div class="col-sm-2">
          <p>{{ sche.endTo }}</p>
        </div>
      </div>

      <h6>Select Schedule</h6>
      <form @submit="makeSave" id="scheFrm" class="row mb-3">
        <div class="col-lg-2">
          <select class="form-select-sm border-dark w-75" v-model="daySelect">
            <option value="">Day</option>
            <option v-for="day in days">{{ day }}</option>
          </select>
        </div>
        <div class="col-lg-2">
          <select
            class="form-select-sm border-dark w-75"
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
            <!-- <div class="col-lg-4 ps-1">
              <p class="m-0">AM <i class="fa-solid fa-minus ms-1"></i></p>
            </div> -->
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
              <button class="btn btn-light" style="margin-left: 80px">
                <i class="fa fa-check" style="font-size: 14px"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="col-lg-3">
      <h6>Appointment Schedule</h6>

      <select v-model="selectId" @change="selectReserve" class="form-control">
        <option
          v-for="index in Number(max)"
          :key="index"
          :disabled="this.reserved.indexOf(index) > -1 ? true : false"
        >
          {{ index }}
        </option>
      </select>
    </div>
    <div class="col-lg-2">
      <h6>Reserved Schedule</h6>
      <div class="row">
        <div class="col-lg-12 reservedSche">
          <div class="row p-2">
            <div v-for="index in reserved" class="col-lg-3 px-1 m-1">
              <div class="appointedSche fw-bold py-1 text-center text-white">
                {{ index }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row py-3 px-4">
    <div class="offset-lg-10 col-lg-2">
      <button
        @click="saveNext"
        class="btn m-0 downButton btnMargin text-white w-100 rounded-0 py-3 mb-2"
      >
        Save & Next
      </button>
    </div>
  </div>

  <Loading :active="load" />
</template>

<script>
import Loading from '@/common/loading.vue';
import { useToast } from 'vue-toastification';
export default {
  name: 'Schedule and Reservation',
  props: ['next', 'docId', 'max'],
  data() {
    return {
      daySelect: '',
      sessionSelect: '',
      days: ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'],
      prevSchedule: [],
      daySelect: '',
      sessionSelect: '',
      startTime: '',
      endTime: '',
      indexCheck: -1,
      update: 0,
      selectId: 0,
      scheDuleId: 0,
      reserved: [],
      load: false,
      message: '',
    };
  },
  mounted() {
    this.getSchedule();
  },
  watch: {
    update(update) {
      if (update == 1) {
        this.getSchedule();
        this.update = 0;
      }
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    selectReserve() {
      if (this.reserved.includes(this.selectId)) {
        console.log('Already reserved');
      } else {
        this.reserved.push(this.selectId);
      }
    },
    clearField() {
      this.daySelect = '';
      this.sessionSelect = '';
      this.startTime = '';
      this.endTime = '';
    },
    getSchedule() {
      const data = new FormData();
      data.append('doctorId', this.docId);
      fetch(
        'http://server.parkviewappointment.com/parkview/reception/getSchedule',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          this.prevSchedule = res.message;
        })
        .catch((err) => console.log(err.message));
    },
    makeSave(e) {
      e.preventDefault();

      if (this.daySelect == '') {
        this.message = '*Required Field';
        this.toast.error('Please select Schedule Day', {
          timeout: 4000,
        });
        return false;
      }
      if (this.sessionSelect == '') {
        this.message = '*Required Field';
        this.toast.error('Please select Schedule Session', {
          timeout: 4000,
        });
        return false;
      }
      if (this.startTime == '') {
        this.message = '*Required Field';
        this.toast.error('Please select Start Time', {
          timeout: 4000,
        });
        return false;
      }
      if (this.endTime == '') {
        this.message = '*Required Field';
        this.toast.error('Please select End Time', {
          timeout: 4000,
        });
        return false;
      }

      this.load = true;
      const data = new FormData();
      data.append('day', this.daySelect);
      data.append('session', this.sessionSelect);
      data.append('startFrom', this.tConvert(this.startTime));
      data.append('endTo', this.tConvert(this.endTime));
      data.append('doctorId', this.docId);
      data.append('reserved', this.reserved);
      fetch(
        'http://server.parkviewappointment.com/parkview/reception/docSchedulePost',
        {
          method: 'POST',
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
    saveNext() {
      if (this.prevSchedule == '') {
        this.message = '*Required';
        this.toast.error('Please assign a Schedule', {
          timeout: 4000,
        });
        return false;
      }

      this.load = true;
      const data = new FormData();
      data.append('reserved', this.reserved);
      data.append('docId', this.docId);
      fetch(
        'http://server.parkviewappointment.com/parkview/reception/docScheduleupdate',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.load = false;
          this.next();
        })
        .catch((err) => console.log(err.message));
    },

    tConvert(time) {
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(''); // return adjusted time or original string
    },
  },
  components: { Loading },
};
</script>
