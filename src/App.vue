<template>
	<div class="container">
		<Form @cancel="page = 'list'" v-if="page === 'form'" v-model="pets"></Form>
		<List @add="page = 'form'"  v-if="page === 'list'" :pets="pets"></List>
	</div>
</template>

<script setup>
import Form from "@/components/Form.vue";
import List from "@/components/List.vue";
import {ref} from "vue";
const page = ref('form');

const pets = ref([]);
</script>
