<template>
	<div class="mb-3">
		<label>{{ label }} </label>
		<input class="form-control" :type="type" v-model="value" :class="{'is-invalid': showError && hasError}">
		<div class="invalid-feedback">
			Veuillez saisir une valeur valide
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		label: String,
		showError: Boolean,
		hasError: Boolean,
		type: {
			type: String,
			default: 'text'
		}
	});

	const value = defineModel();
</script>