<template>
  <div v-if="active" class="loadingAnimation">
    <div>
      <div class="text-center mb-5">
        <img
          src="../assets/Images/original_spinner.gif"
          alt=""
          style="height: 7rem"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: ["active"],
};
</script>
