<template>
	<div>
		<Header></Header>
		composants input / composants button
		formulaire dans parent -> v-model des enfants
		click button -> emit tentative submit -> parent verifie
		-> oui : enregistre, non : erreur sur les enfants


		<Button @customClick="console.log(colorCustom)">
			<template v-slot:content>Bouton 1</template>
			<template v-slot:subtitle>Sous titre 1</template>
		</Button>
		<Button :color="'btn-secondary'" @customClick="console.log(colorCustom)">
			<template v-slot:content>Bouton 2</template>
			<template v-slot:subtitle>Sous titre 2</template>
		</Button>
		<Button :color="colorCustom" @customClick="console.log(colorCustom)">
			<template v-slot:content>Bouton 3</template>
			<template v-slot:subtitle>Sous titre 3</template>
		</Button>

		<button @click="changerCouleur()">Test</button>

		<Input :label="'Mon input'" v-model:value="customValue" v-model:value2="customValue2"></Input>
		{{ customValue }}
		{{ customValue2 }}
	</div>
</template>

<script setup>
	import Header from './components/layouts/Header.vue';
	import Button from './components/Button.vue';
	import Input from './components/Input.vue';
	import {ref} from "vue";

	const colorCustom = ref('btn-white');
	const customValue = ref('Saisissez une valeur...');
	const customValue2 = ref('Saisissez une valeur...');

	function changerCouleur() {
		if(colorCustom.value === 'btn-white') {
			colorCustom.value = 'btn-primary';
		}
		else {
			colorCustom.value = 'btn-white';
		}
	}
</script>
