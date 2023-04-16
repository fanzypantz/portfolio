<template>
  <h1></h1>
</template>

<script setup lang="ts">
import { Mesh, MeshBasicMaterial, Scene, SphereGeometry } from "three";
import { inject, onMounted } from "vue";

const scene: Scene | undefined = inject("scene");

onMounted(() => {
  if (scene) {
    const geometry = new SphereGeometry(1, 32, 32);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new Mesh(geometry, material);

    scene.add(sphere);
  }
});
</script>

<style scoped></style>
