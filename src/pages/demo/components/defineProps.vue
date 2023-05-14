<template>
	<div>
		defineProps: {{ msg }}
	</div>
</template>

<script setup lang="ts">
import { PropsTypeCustom } from './props';

defineProps<PropsTypeCustom>()
</script>

<style scoped>

</style>