<template>
  <div class="g-container">
    <div class="g-wrap">
      <div class="g-footer">
        <div class="g-bubble" v-for="item in 200" :key="item"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const color = '#ff8c4a';
</script>

<style scoped lang="scss">
  .g-container {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .g-wrap {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    filter: contrast(8);
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }

  .g-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 86px;
    width: 100%;
    background: v-bind(color);
    // filter: blur(5px);

    &:before {
      content: '';
      position: absolute;
      top: -300px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      backdrop-filter: blur(5px);
    }
  }

  .g-bubble {
    position: absolute;
    border-radius: 50%;
    background-color: v-bind(color);
  }

  @for $i from 0 through 200 {
    .g-bubble:nth-child(#{$i}) {
      $width: 30 + random(100) + px;
      left: #{(random(100)) + '%'};
      top: #{(30 + random(100))}px;
      width: $width;
      height: $width;
      animation: moveToTop
        #{(random(2500) + 1500) /
        1000}s
        ease-in-out -#{random(5000) /
        1000}s
        infinite;
    }
  }

  @keyframes moveToTop {
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0.08;
      transform: translate(-50%, -180px) scale(0.3);
    }
  }
</style>
