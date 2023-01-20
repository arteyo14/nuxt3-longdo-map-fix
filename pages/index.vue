<template>
  <div class="mt-3">
    <LongDoMap @loaded="onLoadedLongDoMap" />
  </div>
</template>

<script setup lang="ts">
import line from "../services/line.ts";
import points from "../services/points.ts";

// import polygon from "../services/polygon.ts";

const longdo = ref(null);
const map = ref(null);

const onLoadedLongDoMap = (longdo, map) => {
  longdo.value = longdo.value;
  map.value = map.value;

  // map.Overlays.add(
  //   new longdo.Polyline(
  //     [
  //       { lon: 100.41947, lat: 13.87468 },
  //       { lon: 100.43378, lat: 13.8757 },
  //     ],
  //     {
  //       title: "RoadTest",
  //       detail: "test-line1",
  //       label: "line-test1",
  //       lineWidth: 4,
  //       lineColor: "rgb(128,255,0)",
  //     }
  //   )
  // );

  //Creating Line from wkt data
  const wktArrayLine = ref([...line]);
  // const wktArrayPoint = ref([...points]);

  // const wktPoints = ref(
  //   wktArrayPoint.value.map((item) => {
  //     return longdo.Util.overlayFromWkt(item, { lineWidth: 10 });
  //   })
  // );

  // console.log(wktPoints.value);

  let wktLine = ref(
    wktArrayLine.value.map((item) => {
      return longdo.Util.overlayFromWkt(item, {
        lineColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
      });
    })
  );

  // const wktPolygon = longdo.Util.overlayFromWkt(polygon);

  // map.Overlays.add(wktPolygon[0]);

  wktLine.value.map((x) => map.Overlays.add(x[0]));
  // wktPoints.value.map((x) =>
  //   map.Overlays.add(x[0], { fillColor: "rgb(120,255,0)" })
  // );

  //creating Marker
  map.Overlays.add(
    new longdo.Marker({
      lat: 13,
      lon: 100,
    })
  );
  map.zoom(12);
};
</script>
