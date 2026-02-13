<template>
	<button class="btn btn-block" :class="color" @click="$emit('customClick')">
		<slot name="content"></slot>
		<div class="text-muted">
			<slot name="subtitle"></slot>
		</div>
	</button>
</template>

<script setup>
	const props = defineProps({
		color: {
			type: String,
			default: 'btn-primary',
		}
	});
</script>

<style scoped>
	.btn {
		border: 2px solid red;
	}
</style>