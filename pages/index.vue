<template>
  <div>
    <LongDoMap @loaded="onLoadedLongDoMap" />
  </div>
</template>

<script setup lang="ts">
const longdo = ref(null);
const map = ref(null);

const onLoadedLongDoMap = (longdo, map) => {
  (longdo.value = longdo.value), (map.value = map.value);

  // const polyline1 =

  map.Overlays.add(
    new longdo.Polyline(
      [
        { lon: 100.41947, lat: 13.87468 },
        { lon: 100.43378, lat: 13.8757 },
      ],
      {
        title: "RoadTest",
        detail: "test-line1",
        label: "line-test1",
        lineWidth: 4,
        lineColor: "rgb(128,255,0)",
      }
    )
  );

  map.Overlays.add(
    new longdo.Marker({
      lat: 13,
      lon: 100,
    })
  );
  map.zoom(12);
};
</script>
