<template>
	<div>
			<DefineProps  msg="123" />
			<GenericProps  :msg="123" />
	</div>
</template>

<script setup lang="ts">
import DefineProps from './components/defineProps.vue'
import GenericProps from './components/Generic.vue'
</script>

<style scoped>

</style>