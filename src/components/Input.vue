<template>
	<div class="form-group my-4">
		<label for="">{{ label }}</label>
		<input :type="type" class="form-control" v-model="value">
		<input :type="type" class="form-control" v-model="value2">
	</div>
</template>

<script setup>
	import {watch} from "vue";

	const value = defineModel('value');
	const value2 = defineModel('value2');

	const props = defineProps({
		type: {
			type: String,
			default: 'text',
		},
		label: String,
	});

	watch(value, () => {
		value.value = value.value.toUpperCase();
	});
</script>