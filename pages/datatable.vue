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
          <tbody v-for="item of data" :key="item.id">
            <tr class="text-center" @click="positionStore.changePosition(item)">
              <td>{{ item.id }}</td>
              <td>{{ item.kmStart }}</td>
              <td>{{ item.kmEnd }}</td>
              <td>{{ item.lat }}</td>
              <td>{{ item.lon }}</td>
            </tr>
            <!-- <tr class="text-center">
              <td>1</td>
              <td>0+000</td>
              <td>1+000</td>
              <td>13.818028</td>
              <td>100.521057</td>
            </tr> -->
          </tbody>
        </table>
      </div>
      <div class="col-lg-5">
        {{ positionStore.positions }}
        <LongDoMap :positions="positionStore.positions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import data from "../services/data.ts";
import { usePositionStore } from "../store/latLonStore";

const positionStore = usePositionStore();
const longdo = ref(null);
const map = ref(null);
const emit = defineEmits(["getData"]);

const positions = toRaw(ref({ lon: null, lat: null }));
</script>
