/**
 * Système de réactivité inspiré de v-model de Vue.js
 * Reproduit la liaison bidirectionnelle entre les inputs et les données
 */

class ReactiveModel {
	constructor() {
		this.state = {
			title: 'Titre...',
			author: 'Auteur...',
			books: []
		};

		this.watchers = {};
		this.init();
	}

	/**
	 * Initialise la réactivité avec des Proxy pour détecter les changements
	 */
	init() {
		// Crée un proxy pour intercepter les modifications du state
		this.state = new Proxy(this.state, {
			set: (target, property, value) => {
				target[property] = value;
				this.notify(property, value);
				return true;
			}
		});
	}

	/**
	 * Enregistre un watcher pour une propriété
	 */
	watch(property, callback) {
		if (!this.watchers[property]) {
			this.watchers[property] = [];
		}
		this.watchers[property].push(callback);
	}

	/**
	 * Notifie tous les watchers quand une propriété change
	 */
	notify(property, value) {
		if (this.watchers[property]) {
			this.watchers[property].forEach(callback => callback(value));
		}
	}

	/**
	 * Implémentation de v-model : liaison bidirectionnelle
	 * @param {HTMLInputElement} element - L'élément input
	 * @param {string} property - La propriété du state à lier
	 */
	vModel(element, property) {
		// Input -> State (quand l'utilisateur tape)
		element.addEventListener('input', (e) => {
			this.state[property] = e.target.value;
		});

		// State -> Input (quand le state change)
		this.watch(property, (value) => {
			element.value = value;
		});

		// Initialise la valeur
		element.value = this.state[property];
	}

	/**
	 * Méthode pour ajouter un livre
	 */
	register() {
		this.state.books = [...this.state.books, {
			title: this.state.title,
			author: this.state.author
		}];
	}

	/**
	 * Rendu de la liste des livres
	 */
	renderBooks(container) {
		this.watch('books', (books) => {
			container.innerHTML = '';
			books.forEach(book => {
				const div = document.createElement('div');
				div.textContent = `Titre: ${book.title}, Auteur: ${book.author}`;
				container.appendChild(div);
			});
		});

		// Rendu initial
		this.notify('books', this.state.books);
	}
}

// Exemple d'utilisation
document.addEventListener('DOMContentLoaded', () => {
	const app = new ReactiveModel();

	// Liaison v-model sur les inputs
	const titleInput = document.getElementById('title');
	const authorInput = document.getElementById('author');

	if (titleInput && authorInput) {
		app.vModel(titleInput, 'title');
		app.vModel(authorInput, 'author');
	}

	// Gestion du bouton
	const registerBtn = document.getElementById('register-btn');
	if (registerBtn) {
		registerBtn.addEventListener('click', () => app.register());
	}

	// Rendu de la liste
	const booksContainer = document.getElementById('books-list');
	if (booksContainer) {
		app.renderBooks(booksContainer);
	}
});

// Export pour utilisation modulaire
if (typeof module !== 'undefined' && module.exports) {
	module.exports = ReactiveModel;
}
