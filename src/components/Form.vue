<template>
	<form>
		<Input label="Nom" v-model="pet.name" :showError="showError" :hasError="petErrors.name"></Input>
		<Select label="Type" :options="types" v-model="pet.type" ></Select>
		<Input label="Age" type="number" v-model="pet.age" :showError="showError" :hasError="petErrors.age"></Input>

		<button type="button" class="btn btn-secondary" @click="$emit('cancel')">Annuler</button>

		<button type="button" class="btn btn-primary" @click="submit()">Enregistrer</button>
	</form>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";

	const pet = ref({});
	const petErrors = ref({});
	const types = ref([
		{label: 'Chat', value: 'chat'},
		{label: 'Chien', value: 'chien'},
		{label: 'Poisson', value: 'poisson'},
	]);
	const showError = ref(false);

	const petList = defineModel();

	onBeforeMount(() => {
		reset();
	});

	function reset() {
		showError.value = false;
		pet.value = {
			name: '',
			type: 'chat',
			age: 0,
		};

		petErrors.value = {
			name: true,
			age: true,
		};
	}

	function validate() {
		showError.value = true;
		petErrors.value.name = pet.value.name.length === 0;
		petErrors.value.age = pet.value.age <= 0;

		for(let error of Object.values(petErrors.value)) {
			if(error) {
				return false;
			}
		}

		return true;
	}

	function submit() {
		if(!validate()) {
			return;
		}

		petList.value.push(pet.value);
		reset();
	}
</script>