<template>
<q-page padding id="view-colors">

    <div class="detail" v-for="color in colors" :key="color">
        <q-radio v-model="radio2" :val="color" :color="color" :label="color" />
        <div class="detailed-color column flex-center" v-for="n in 14" :key="n">
            <q-radio v-model="radio2" :val="`${color}-${n}`" :color="`${color}-${n}`" :label="`${color}-${n}`" />
        </div>
    </div>


</q-page>
</template>

<script>
export default {
  data() {
    return {
      radio2: "red",
      mainColors: [
        "primary",
        "secondary",
        "tertiary",
        "positive",
        "negative",
        "info",
        "warning",
        "faded",
        "dark",
        "black"
      ],
      mainLightColors: ["white", "light"],
      colors: [
        "red",
        "pink",
        "purple",
        "deep-purple",
        "indigo",
        "blue",
        "light-blue",
        "cyan",
        "teal",
        "green",
        "light-green",
        "lime",
        "yellow",
        "amber",
        "orange",
        "deep-orange",
        "brown",
        "grey",
        "blue-grey"
      ]
    };
  }
};
</script>

<style lang="stylus">
</style>