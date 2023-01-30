<template>
  <div class="container-fluid mt-3">
    <div class="d-flex row mx-2">
      <div class="col-lg-7">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr class="text-center">
              <th>ID</th>
              <th>KM Start</th>
              <th>KM End</th>
              <th>Lat</th>
              <th>Lon</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) of data"
              :key="item.id"
              class="text-center"
              :class="{ 'table-active': dataSelected === item.id }"
              @click="
                () => {
                  //   positionStore.changePosition(item);
                  toggleDataSelected(item);
                }
              "
              style="cursor: pointer"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.kmStart }}</td>
              <td>{{ item.kmEnd }}</td>
              <td>{{ item.lat }}</td>
              <td>{{ item.lon }}</td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex gap-2">
          <button class="btn bg-success text-white" @click="showWMS = !showWMS">
            WMS
          </button>
          <button class="btn bg-success text-white" @click="showTMS = !showTMS">
            TMS
          </button>
        </div>
      </div>
      <div class="col-lg-5">
        <LongDoMap @loaded="loadedLineMap" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import data from "../services/data.ts";
import { usePositionStore } from "../store/latLonStore";
// import "heatmap.js";
// import "../plugins/longdomap-heatmap/longdomap-heatmap";

const isActive = ref();

const positionStore = usePositionStore();
const longdo = ref(null);
const map = ref(null);
const positions = toRaw(ref({ lon: null, lat: null }));
const dataSelected = ref(null);

const loadedLineMap = (longdoValue, mapValue) => {
  longdo.value = longdoValue;
  map.value = mapValue;

  const line = data.map((item) => {
    return { lon: item.lon, lat: item.lat };
  });
  const lineGeom = new longdo.value.Polyline(line, {
    lineColor: `rgb(255,0,0)`,
  });
  map.value.Overlays.add(lineGeom);

  //wms & tms
  wmsLayer(longdoValue, mapValue);
  tmsLayer(longdoValue, mapValue);

  //tags
  // map.value.add("hotel", {
  //   visibleRange: { min: 10, max: 20 },
  //   icon: { url: "https://mmmap15.longdo.com/mmmap/images/icons/hotel.png" },
  // });
};

const toggleDataSelected = (item) => {
  dataSelected.value = item.id;
  positionStore.changePosition(item);
};

//WMS Layer & TMS Layer
const showWMS = ref(false);
const showTMS = ref(false);

const wmsLayer = (longdo: any, map: any) => {
  const wms = new longdo.Layer("bluemarble_terrain", {
    type: longdo.LayerType.WMS,
    url: "https://ms.longdo.com/mapproxy/service",
    zoomRange: { min: 1, max: 18 },
    refresh: 180,
    opacity: 0.5,
    weight: 10,
  });

  watchEffect(() => {
    if (showWMS.value) {
      map.Layers.add(wms);
    } else {
      map.Layers.remove(wms);
    }
  });
};

const tmsLayer = (longdo: any, map: any) => {
  const tms = new longdo.Layer("bluemarble_terrain", {
    type: longdo.LayerType.WMTS_REST,
    url: "https://ms.longdo.com/mapproxy/wmts",
    srs: "GLOBAL_WEBMERCATOR",
  });

  watchEffect(() => {
    if (showTMS.value) {
      map.Layers.add(tms);
    } else {
      map.Layers.remove(tms);
    }
  });
};
</script>

<style scoped>
.table-active {
  background-color: #20c997;
  color: #fff;
}
</style>
