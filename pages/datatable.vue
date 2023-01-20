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
// import { NuxtLink } from "../.nuxt/components";

const isActive = ref();

const positionStore = usePositionStore();
const longdo = ref(null);
const map = ref(null);
const positions = toRaw(ref({ lon: null, lat: null }));
const dataSelected = ref(null);

const loadedLineMap = (longdo, map) => {
  longdo.value = longdo;
  map.value = map;

  const line = data.map((item) => {
    return { lon: item.lon, lat: item.lat };
  });
  const lineGeom = new longdo.value.Polyline(line, {
    lineColor: `rgb(255,0,0)`,
  });
  map.value.Overlays.add(lineGeom);
};

const toggleDataSelected = (item) => {
  dataSelected.value = item.id;
  positionStore.changePosition(item);
};
</script>

<style scoped>
.table-active {
  background-color: #20c997;
  color: #fff;
}
</style>
