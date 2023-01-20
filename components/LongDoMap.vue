<template>
  <div class="container-fluid">
    <div class="position-relative">
      <div :ref="containerClassRef" :class="containerClassRef" id="longdo-map">
        ...loading
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePositionStore } from "../store/latLonStore";

const positionStore = usePositionStore();
const emit = defineEmits(["loaded"]);

const longdoMapApiKey = "f38639d33e37f4e422cd8085d997d55f";
const longdo = ref(null);
const map = ref(null);
const containerClassRef = ref("longdo-map-container");
const scriptTagId = "longdo-map-script";

const scriptMap = ref(null);

const mapValue = ref(null);

const addMapScript = () => {
  scriptMap.value = document.createElement("script");
  scriptMap.value.src = `https://api.longdo.com/map/?key=${longdoMapApiKey}`;
  scriptMap.value.id = scriptTagId;
  document.body.appendChild(scriptMap.value);

  scriptMap.value.onload = () => {
    longdo.value = window.longdo;
    map.value = new longdo.value.Map({
      placeholder: document.querySelector("#longdo-map"),
    });

    map.value.Event.bind("ready", () => {
      emit("loaded", longdo.value, map.value);
    });
  };
};

onBeforeMount(() => {
  addMapScript();
});

watchEffect(() => {
  if (map.value) {
    map.value.location({
      lon: positionStore.positions.lon,
      lat: positionStore.positions.lat,
    });
    map.value.zoom(18);
  }
});

onBeforeUnmount(() => {
  const scriptM = document.getElementById(scriptTagId);
  scriptM.parentNode.removeChild(scriptM);
  longdo.value = null;
  map.value = null;
});
</script>

<style scoped>
#longdo-map {
  width: 100%;
  height: 100vh;
}
#pano-longdo {
  width: 100%;
  height: 50vh;
}
.btn {
  right: 2.5rem !important;
  bottom: 2.5rem !important;
}
</style>
