<template>
	<div>
		generic: {{ msg }}
	</div>
</template>

<script setup lang="ts" generic="T">
	defineProps<{
		msg: T
	}>()
</script>

<style scoped>

</style>