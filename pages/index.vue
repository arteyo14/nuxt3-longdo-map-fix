<template>
  <div>
    <LongDoMap @loaded="onLoadedLongDoMap" />
  </div>
</template>

<script setup lang="ts">
import line from "../services/line.ts";
const longdo = ref(null);
const map = ref(null);

const onLoadedLongDoMap = (longdo, map) => {
  (longdo.value = longdo.value), (map.value = map.value);

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

  const wktArray = ref([...line]);

  // // console.log(line);

  let wkt = ref(
    wktArray.value.map((item) => {
      return longdo.Util.overlayFromWkt(item, {
        lineColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
      });
    })
  );

  wkt.value.map((x) => map.Overlays.add(x[0]));
  // const wkt = wktArray.value.join("\n");

  // const shapes = ref(longdo.Util.overlayFromWkt(wkt));

  // map.Overlays.add(shapes.value);
  // console.log(wkt8);

  map.Overlays.add(
    new longdo.Marker({
      lat: 13,
      lon: 100,
    })
  );
  map.zoom(12);
};
</script>
