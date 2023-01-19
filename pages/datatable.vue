<template>
  <div class="container-fluid mt-3">
    <div class="d-flex row mx-2">
      <div class="col-lg-7">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th>KM Start</th>
              <th>KM End</th>
              <th>column 3</th>
              <th>column 4</th>
              <th>column 5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0+000</td>
              <td>1+000</td>
              <td>test3</td>
              <td>test4</td>
              <td>test5</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-5">
        <LongDoMap @loaded="getLocation" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const position = ref();
const testLongdo = ref(null);
const testMap = ref(null);

const getLocation = (longdoPrama, mapParam) => {
  const longdo = longdoPrama;
  const map = mapParam;
  const result = map.location();
};
</script>
