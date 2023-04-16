<template>
  <canvas ref="canvasRef" />
  <slot></slot>
</template>

<script setup lang="ts">
import {
  Scene,
  PerspectiveCamera,
  SphereGeometry,
  MeshBasicMaterial,
  WebGLRenderer,
} from "three";
import { onMounted, provide, Ref, ref } from "vue";

const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);
const scene = new Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(0, 0, 4);
scene.add(camera);

const setRenderer = () => {
  if (canvasRef.value) {
    const renderer = new WebGLRenderer({ canvas: canvasRef.value });
    renderer.setSize(width, height);
    renderer.render(scene, camera);
  }
};

onMounted(() => {
  setRenderer();
});

provide("scene", scene);
</script>

<style scoped></style>
