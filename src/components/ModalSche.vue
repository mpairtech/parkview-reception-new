<template lang="">
  <transition name="modal-animation">
    <div v-show="modalscheActive" class="modal-a">
      <transition name="modal-animation-inner">
        <div v-show="modalscheActive" class="modal-inner-a">
          <div class="row">
            <div class="col-lg-12">
              <i
                @click="close"
                class="fa-solid fa-xmark ps-2 close-btn"
                style="cursor: pointer"
              ></i>
              <!-- Modal Content -->
              <slot />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  props: ['modalscheActive'],
  setup(props, { emit }) {
    const close = () => {
      emit('close');
    };
    return { close };
  },
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
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */

  display: table;
  transition: opacity 0.3s ease;
}
.modal-inner-a {
  position: fixed;
  bottom: 0;
  right: 35%;
  height: 100vh;
  width: 500px;
  margin: 0px auto;
  background-color: #fff;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.4s ease;
}
.modal-animation-inner-enter-from {
  bottom: -1000px;
}

.modal-animation-inner-leave-to {
  bottom: -1000px;
}
.modal-animation-inner-enter-from .modal-inner-a,
.modal-animation-inner-leave-to .modal-inner-a {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
