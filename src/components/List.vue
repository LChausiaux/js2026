<template>
	<div v-for="pet in pets">
		{{ pet.name }}
	</div>
	<button type="button" class="btn btn-secondary" @click="$emit('add')">Ajouter</button>

</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
const props = defineProps({
	pets: Array,
});

const pet = ref({});
const petList = ref([]);

onBeforeMount(() => {
	reset();
});

function reset() {
	pet.value = {
		name: '',
		type: 'chat',
		age: 0,
	};
}

function submit() {
	petList.value.push(pet.value);
	reset();
}
</script>