<template>
	<div class="mb-3">
		<label>{{ label }} </label>
		<select class="form-control" v-model="value">
			<option v-for="option in options" :value="option.value">
				{{ option.label }}
			</option>
		</select>
	</div>
</template>

<script setup>
const props = defineProps({
	label: String,
	options: Array,
});

const value = defineModel();
</script>