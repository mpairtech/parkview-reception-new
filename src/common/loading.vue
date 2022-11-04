<template>
  <div v-if="active" class="loadingAnimation">
    <h1>Loading</h1>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: ['active'],
};
</script>
