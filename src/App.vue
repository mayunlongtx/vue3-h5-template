<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- <keep-alice> -->
        <component :is="Component"></component>
        <!-- <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive" /> -->
      <!-- </keep-alice> -->
      <!-- <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" /> -->
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped></style>
