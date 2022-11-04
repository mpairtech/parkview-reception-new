<template>
  <div class="row">
    <div class="col-lg-9 mx-auto">
      <div class="row mb-3">
        <div class="col-lg-12">
          <div class="row mt-4 basInfoBorder">
            <div class="col-lg-6">
              <p class="m-0 basicInfoFont">Room Number</p>
            </div>
            <div class="col-lg-3 ms-auto">
              <p class="m-0 basicInfoFont text-end" style="color: #62b8ce">
                308
              </p>
            </div>
          </div>
          <div class="row mt-2 basInfoBorder">
            <div class="col-lg-6">
              <p class="m-0 basicInfoFont">Consultancy Fee</p>
            </div>
            <div class="col-lg-3 ms-auto">
              <p class="m-0 basicInfoFont text-end" style="color: #62b8ce">
                1000
              </p>
            </div>
          </div>
          <div class="row mt-2 basInfoBorder">
            <div class="col-lg-6">
              <p class="m-0 basicInfoFont">Max Appointment</p>
            </div>
            <div class="col-lg-3 ms-auto">
              <p class="m-0 basicInfoFont text-end" style="color: #62b8ce">
                20
              </p>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-lg-6">
              <p class="m-0 basicInfoFont">Consultancy Period</p>
            </div>
            <div class="col-lg-3 ms-auto">
              <p class="m-0 basicInfoFont text-end" style="color: #62b8ce">
                10 min
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light rounded">
        <div class="col-lg-12 px-4 py-3">
          <div class="row mb-3">
            <div class="col-lg-4">
              <label class="form-check-label fw-bold">Availability</label>
            </div>
            <div class="col-lg-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" />
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-lg-12">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="dayRadio" />
                <label class="form-check-label">Single Day</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <select
                class="form-select form-select-sm border-dark"
                v-model="shift"
              >
                <option>Choose</option>
                <option value="1">Morning</option>
                <option value="2">Evening</option>
              </select>
            </div>
            <div class="col-lg-6">
              <input
                type="date"
                class="form-control form-control-sm border-dark"
                v-model="docName"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  props: {},
  data() {
    return {};
  },
};
</script>
