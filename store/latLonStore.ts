import { defineStore } from "pinia";

export const usePositionStore = defineStore("position", () => {
  //state
  const positions = reactive({ lon: 100, lat: 16 });

  //getters
  //   const getPositions = computed(() => positions.value);

  //actions
  function changePosition(item) {
    positions.lon = item.lon;
    positions.lat = item.lat;
  }
  return { positions, changePosition };
});
