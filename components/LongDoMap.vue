<template>
  <div class="container">
    <div id="pano-longdo" :style="{ display: isPanoShow ? '' : 'none' }"></div>
    <div class="position-relative">
      <div
        :ref="containerClassRef"
        :class="containerClassRef"
        :style="{ height: isPanoShow ? '50vh' : '100vh' }"
        id="longdo-map"
      >
        ...loading
      </div>
      <button class="btn btn-primary position-absolute" @click="togglePano">
        PANO
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["loaded"]);

const longdoMapApiKey = "f38639d33e37f4e422cd8085d997d55f";

const longdo = ref(null);
const longdoPano = ref(null);
const pano = ref(null);
const map = ref(null);

const containerClassRef = ref("longdo-map-container");
const scriptTagId = "longdo-map-script";
const isPanoShow = ref(false);

onMounted(() => {
  addMapScript();
});

function addMapScript() {
  const existingScript = document.getElementById(scriptTagId);
  if (!existingScript && !longdo.value) {
    const scriptMap = document.createElement("script");
    scriptMap.src = `https://api.longdo.com/map/?key=${longdoMapApiKey}`;
    scriptMap.id = scriptTagId;
    document.body.appendChild(scriptMap);
    const scriptPano = document.createElement("script");
    scriptPano.src = "//api.longdo.com/pano/pano-api.min.js";
    scriptPano.id = "pano-script-id";
    document.head.appendChild(scriptPano);

    scriptMap.onload = () => {
      longdo.value = window.longdo;
      initialMap();
    };
  } else {
    initialMap();
  }
}

function initialMap() {
  map.value = new longdo.value.Map({
    placeholder: document.querySelector(`#longdo-map`),
  });
  map.value.Event.bind("ready", () => {
    emit("loaded", longdo.value, map.value);
  });
  pano.value = new longdo.value.PanoramaViewer({
    placeholder: document.querySelector("#pano-longdo"),
    map: map.value,
    showPath: true,
    isEnable: true,
  });
}

const togglePano = () => {
  isPanoShow.value = !isPanoShow.value;
  console.log(isPanoShow.value);
};
</script>

<style scoped>
#longdo-map {
  width: 100%;
  height: 50vh;
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
