'use strict';

// version avec Promise, modifiée pour n'animer qu'un <span> dans le bandeau d'aide

// données
const GROUPES = [
	{
		1:"J'aime l'action.",
		2:"Je traite les problèmes méthodiquement."
	},{
		3:"Je pense que le travail d'équipe est plus efficace que le travail individuel.",
		4:"J'aime beaucoup la nouveauté."
	},{
		5:"Je m'intéresse davantage à l'avenir qu'au passé.",
		6:"J'aime travailler avec d'autres personnes."
	},{
		7:"J'aime assister à des réunions de groupe bien organisées.",
		8:"J'attache une grande importance aux délais."
	},{
		9:"Je ne supporte pas de remettre les choses au lendemain.",
		10:"Je pense que les idées nouvelles doivent être éprouvées avant d'être appliquées."
	},{
		11:"J'aime l'émulation que créent les rapports avec d'autres collègues.",
		12:"Je suis toujours à la recherche de nouvelles possibilités."
	},{
		13:"Je tiens à me fixer mes propres objectifs.",
		14:"Lorsque j'entreprends une tâche, j'aime la mener à son terme."
	},{
		15:"J'essaie le plus possible de comprendre les émotions des gens.",
		16:"Lorsque je suis en désaccord avec mon entourage, je n'hésite pas à le faire savoir."
	},{
		17:"J'aime recevoir des appréciations sur mon travail.",
		18:"Je trouve la méthode du pas-à-pas très efficace."
	},{
		19:"Je pense que je perçois assez bien la psychologie des gens.",
		20:"J'aime la recherche de solutions créatives aux problèmes."
	},{
		21:"Je fais constamment des extrapolations et des projections.",
		22:"Je suis sensible aux besoins des autres."
	},{
		23:"La planification est la clé du succès.",
		24:"Je m'impatiente lorsque des délibérations durent longtemps."
	},{
		25:"Je sais rester calme sous la pression.",
		26:"J'attache une grande valeur à l'expérience."
	},{
		27:"J'écoute les gens.",
		28:"On dit que j'ai l'esprit vif."
	},{
		29:"J'attache une importance capitale à la coopération.",
		30:"Je fais appel à la logique pour juger des différentes possibilités."
	},{
		31:"J'aime mener plusieurs travaux de front.",
		32:"Je me pose toujours des questions."
	},{
		33:"J'apprends par l'expérience.",
		34:"Je pense savoir rester maître de mes émotions."
	},{
		35:"Je sais prévoir les réactions éventuelles à une certaine décision.",
		36:"Je n'aime pas les détails."
	},{
		37:"L'analyse doit toujours précéder l'action.",
		38:"Je suis capable de juger de l'ambiance qui règne au sein d'un groupe."
	},{
		39:"J'ai tendance à entreprendre des travaux et à ne pas les terminer.",
		40:"Je me trouve capable de prendre des décisions."
	},{
		41:"Je recherche les tâches difficiles.",
		42:"Je compte beaucoup sur l'observation et sur les données."
	},{
		43:"Je suis capable d'exprimer franchement mes sentiments.",
		44:"J'aime concevoir de nouveaux projets."
	},{
		45:"J'aime beaucoup lire.",
		46:"Je crois pouvoir mettre de l'huile dans les rouages."
	},{
		47:"J'aime n'avoir à m'occuper que d'une question à la fois.",
		48:"J'aime obtenir des résulats."
	},{
		49:"Je suis heureux-se d'apprendre à mieux connaître d'autres personnes.",
		50:"J'aime la variété."
	},{
		51:"Les faits parlent d'eux-mêmes.",
		52:"J'utilise le plus possible mon imagination."
	},{
		53:"Les travaux de longue haleine m'impatientent.",
		54:"Mon esprit est toujours en activité."
	},{
		55:"Les grandes décisions doivent être prises avec prudence.",
		56:"Je crois que la collaboration s'impose pour l'exécution d'un travail."
	},{
		57:"En général, je prends des décisions sans trop réfléchir.",
		58:"Les émotions sont source de problèmes."
	},{
		59:"J'aime avoir l'affection de mes collègues.",
		60:"Je vois tout de suite les liens logiques."
	},{
		61:"J'essaie mes idées nouvelles sur d'autres personnes.",
		62:"Je crois aux méthodes scientifiques."
	},{
		63:"J'aime que les choses se fassent.",
		64:"Les bonnes relations sont indispensables."
	},{
		65:"Je suis impulsif-ve.",
		66:"J'accepte que les gens soient différents les uns des autres."
	},{
		67:"La communication est une fin en soi.",
		68:"J'aime l'émulation intellectuelle."
	},{
		69:"J'aime organiser.",
		70:"Je saute souvent d'une tâche à l'autre."
	},{
		71:"Il est créateur de parler et de travailler avec les gens.",
		72:"Il est essentiel de s'affirmer."
	},{
		73:"J'aime jouer avec les idées.",
		74:"Je n'aime pas perdre mon temps."
	},{
		75:"J'aime faire ce que je sais bien faire.",
		76:"J'apprends au contact des autres."
	},{
		77:"Je trouve les principes abstraits intéressants et plaisants.",
		78:"J'ai la patience de m'occuper des détails."
	},{
		79:"J'aime les déclarations brèves qui vont droit au but.",
		80:"J'ai confiance en moi."
	}
];

const STYLES = [
	[1,8,9,13,17,24,26,31,33,40,41,48,50,53,57,63,65,70,74,79],
	[2,7,10,14,18,23,25,30,34,37,42,47,51,55,58,62,66,69,75,78],
	[3,6,11,15,19,22,27,29,35,38,43,46,49,56,59,64,67,71,76,80],
	[4,5,12,16,20,21,28,32,36,39,44,45,52,54,60,61,68,72,73,77]
];

// classe du jeu
class Test{
	constructor(){
		this.aide = this.$('#aide p');
		this.aideBarre = this.$('#aide div');
		this.aideSpan = null;
		this.section = this.$('#sectionCible');
		this.intro = this.$('#intro');
		this.lancerBtn = this.$('#lancerBtn');
		this.lancerBtn.addEventListener('click', this.lancerTest.bind(this));
		this.enfantActuel = null;
		this.liens = null;
		this.etape = 0;
		this.groupesFouillis = this.melangerTableau(GROUPES);
		this.totalGroupes = this.groupesFouillis.length;
		this.reponsesJoueur = [];
		this.scoresJoueur = [0,0,0,0];
	}

	// sélecteurs d'élément DOM
	$(element){
		return document.querySelector(element);
	}
	$$(element){
		return document.querySelectorAll(element);
	}

	// mélanger un array
	melangerTableau(tableauEntrees){
		const tableauSortie = [];
		let longueurValeurs = tableauEntrees.length;
		// tant que cette longueur est > 0, c'est qu'il y a une données à traiter dans l'array d'entrée
		while(longueurValeurs > 0){
			const alea = Math.round(Math.random() * (tableauEntrees.length -1)); // ex: 2 items -> 0 ou 1
			// ajouter à l'array de sortie, dans l'ordre, l'item qui se trouve à la position d'alea de l'array d'entrée
			tableauSortie.push(tableauEntrees[alea]);
			// supprimer cette même entrée dans l'array d'entrée
			tableauEntrees.splice(alea,1);
			// décrémenter la longueur
			longueurValeurs --;
		}
		return tableauSortie;
	}

	// fonction de délai
	delai(ms) {
		// qui renvoie une fonction
		// fonction qui crée un nouvel objet promesse
		// promesse qui, en réussite, retourne un setTimeout traitant la réussite,
		// promesse qui ne gère pas d'erreur car le setTimeout n'échoue pas
		return () => new Promise(resolve => setTimeout(resolve, ms));
	}

	// lancer le jeu
	lancerTest(){
		event.preventDefault();
		this.aide.classList.add('disparait');
		this.intro.classList.add('opacite0');
		this.progressionBouge();
		// dans le temps
		Promise.resolve() // créer un objet promesse déjà tenue ; cela permet de traiter delai()
			.then(this.delai(300)) // après avoir laissé le temps de disparition
			.then(() => {
				this.intro.remove();
				this.nouvelleEtape();
			});
	}

	// augmenter la barre progression
	progressionBouge(){
		const avanceePourcent = (this.etape+1) * 100 / 40;
		this.aideBarre.style.width = `${avanceePourcent}%`;
	}

	nouvelleEtape(){
		// contenu aide
		const numeroGroupe = this.etape+1;
		let numeroGroupeStr = numeroGroupe.toString();
		if(numeroGroupe < 10){
			numeroGroupeStr = numeroGroupeStr.replace(/^/,'0');
		}
		if(this.etape === 0){ // si on vient de démarrer, structurer et renseigner l'aide
			this.aide.innerHTML = `<span>${numeroGroupeStr}</span> / ${this.totalGroupes}`;
		}else{ // si on poursuit le jeu, ne renseigner que l'étape dans le <span> de l'aide
			this.aideSpan.innerHTML = `${numeroGroupeStr}`;
		}
				// NOTE : récupérer d'un objet les valeurs, les clés - plus bas on récupère la paire clé-valeur avec 'entries'
				// const phrases = Object.values(GROUPES[this.etape]);
				// const proprietes = Object.keys(GROUPES[this.etape]);
		// récupérer les valeurs de l'étape et les mélanger
		const valEtape = this.groupesFouillis[this.etape];
		const valEtapeFouillis = this.melangerTableau( Object.entries(valEtape) );
		// le contenu de l'écran
		let enfant = '';
		enfant += '<div id="blocContenu" class="prepare">';
		enfant += `		<a href="#" title="Choix 1" data-val="${valEtapeFouillis[0][0]}">${valEtapeFouillis[0][1]}</a>`;
		enfant += `		<a href="#" title="Choix 2" data-val="${valEtapeFouillis[1][0]}">${valEtapeFouillis[1][1]}</a>`;
		enfant += '</div>';
		this.section.innerHTML = enfant;
		// le bloc de contenu cible
		this.enfantActuel = this.$('#blocContenu');
		// dans le temps
		Promise.resolve() // créer un objet promesse déjà tenue ; cela permet de traiter delai()
			.then(this.delai(300)) // laisser 0.3s pour la barre de progression
			.then(() => {
				// afficher le bloc de liens
				this.enfantActuel.classList.remove('prepare');
				// afficher texte d'aide
				if(this.etape === 0){ // si on vient de démarrer, afficher toute l'aide
					this.aide.classList.remove('disparait');
				}else{ // si on poursuit le jeu, n'afficher que le <span> (c'est lui qui est animé)
					this.aideSpan.classList.remove('disparait');
				}
			})
			.then(this.delai(300)) // laisser le temps d'apparition
			.then(() => {
				// renseigner l'array des liens
				this.liens = this.$$('#blocContenu a');
				// leur événement click
				for(let lien of this.liens){
					lien.addEventListener('click',this.clickLien.bind(this));
				}
			});
	}

	// cliquer sur un choix
	clickLien(event){
		event.preventDefault();
		const et = event.target;
		// si cet élément n'a pas la classe "clique", alors il fait tout cela
		if( !et.classList.contains('clique') ){
			// ajouter la valeur de la réponse au tableau des réponses du joueur
			this.reponsesJoueur.push(Number(et.dataset.val));
			// ajouter le style cliqué au bouton
			et.classList.add('clique');
			// dans le temps
			Promise.resolve() // créer un objet promesse déjà tenue ; cela permet de traiter delai()
				.then(this.delai(150)) // après un certain temps pour voir que le bouton a été choisi
				.then(() => {
					// passer à l'étape suivante avant le changement de la barre progression
					// intervertir si on veut indiquer plutôt l'étape à finir (plutôt que finie)
					this.etape ++;
					this.progressionBouge();
					// si on n'a pas fini le jeu
					if(this.etape < this.totalGroupes){
						// le <span> de l'aide disparaît
						if(this.aideSpan === null){ // si on ne connait pas cet objet, le connaître
							this.aideSpan = this.$('#aide p span');
						}
						this.aideSpan.classList.add('disparait');
					}else{ // si on a fini le jeu
						this.aide.classList.add('disparait');
					}
					// le bloc de contenu disparaît aussi
					this.enfantActuel.classList.add('part');
				})
				.then(this.delai(300))
				.then(()=>{
					// supprimer le bloc de contenu
					this.enfantActuel.remove();
					// selon l'étape en cours, rediriger vers une nouvelle étape ou les résultats
					if(this.etape < this.totalGroupes){
						this.nouvelleEtape();
					}else{
						this.resultats();
					}
				});
		}
	}

	// écran des résultats
	resultats(){
		// calculer les scores du joueur selon les réponses qu'il a données
		const stylesClones = STYLES; // utiliser une copie des STYLES car on va modifier le contenu de ce tableau pour que la recherche aille un peu plus vite à chaque fois
		for(let reponse of this.reponsesJoueur){ // pour chaque réponse
			for (let i = 0; i < stylesClones.length; i++) { // pour chaque tableau de styles
				const posValeur = stylesClones[i].indexOf(reponse); // connaître la position de cette réponse dans ce tableau
				if(posValeur != -1){ // si on a trouvé qqe chose
					stylesClones[i].splice(posValeur,1); // supprimer cette valeur du tableau de styles
					this.scoresJoueur[i] ++; // ajouter 1 au score correspondant
					break;
				}
			}
		}
		// le contenu à l'écran
		let enfant = '';
		enfant += '<div id="blocContenu" class="opacite0">';
		enfant += `		<article>`;
		enfant += `			<p>Ce test d'auto-analyse est construit sur quatre systèmes de valeurs. Ces valeurs influencent nos modes de communication.</p>`;
		enfant += '			<ul class="graphe">';
		enfant += '				<li id="action"><div class="opacite0"></div></li>';
		enfant += '				<li id="methodes"><div class="opacite0"></div></li>';
		enfant += '				<li id="hommes"><div class="opacite0"></div></li>';
		enfant += '				<li id="idees"><div class="opacite0"></div></li>';
		enfant += '			</ul>';
		enfant += '			<ul class="legende">';
		enfant += `				<li class="coulA"><p>Action</p><p>${this.scoresJoueur[0]}</p></li>`;
		enfant += `				<li class="coulM"><p>Méthodes</p><p>${this.scoresJoueur[1]}</p></li>`;
		enfant += `				<li class="coulH"><p>Hommes</p><p>${this.scoresJoueur[2]}</p></li>`;
		enfant += `				<li class="coulI"><p>Idées</p><p>${this.scoresJoueur[3]}</p></li>`;
		enfant += '			</ul>';
		enfant += `		</article>`;
		enfant += `		<article class="details">`;
		enfant += `			<h2 class="coulA">Action</h2>`;
		enfant += `			<p>Les personnes qui tendent vers le style Action aiment l'action, la réussite, les tâches à accomplir, la progression, la résolution de problèmes.</p>`;
		enfant += `			<h2 class="coulM">Méthodes</h2>`;
		enfant += `			<p>Les personnes qui tendent vers le style Méthodes aiment les faits, l'organisation, la structuration, l'analyse, les détails.</p>`;
		enfant += `			<h2 class="coulH">Hommes</h2>`;
		enfant += `			<p>Les personnes qui tendent vers le style Hommes aiment les problèmes de société, les interactions, la communication, le travail en groupe, la motivation, les relations.</p>`;
		enfant += `			<h2 class="coulI">Idées</h2>`;
		enfant += `			<p>Les personnes qui tendent vers le style Idées aiment les concepts, les théories, les échanges d'idées, l'innovation, la créativité, la nouveauté.</p>`;
		enfant += `		</article>`;
		enfant += '</div>';
		// changer la barre d'aide
		this.aide.innerHTML = 'Résultats';
		this.aideBarre.classList.add('disparait');
		// dans le temps
		Promise.resolve() // créer un objet promesse déjà tenue ; cela permet de traiter delai()
			.then(this.delai(300)) // après le changement de la barre d'aide
			.then(() => {
				this.section.innerHTML = enfant;
				this.enfantActuel = this.$('#blocContenu');
			})
			.then(this.delai(10)) // après 10 ms de marge
			.then(() => {
				this.enfantActuel.classList.remove('opacite0');
				this.aide.classList.remove('disparait');
				// le graphe
				// pour afficher les blocs de couleurs, on utilise la règle css 'transform scale([0-1])'
				// donc on doit connaître les scores en pourcentage, et ce entre 0 et 1 pour être appliqués cette règle
				let scoresPourcent = [];
				for(let valeur of this.scoresJoueur){
					let nombre = valeur / 20;
							// NOTE : la ligne précédente vaut ce qui suit :
							// let nombre = valeur * 100 / 20; // la valeur du score en pourcentage
							// nombre /= 100; // obtenir une valeur entre 0 et 1
					scoresPourcent.push(nombre);
				}
				const divs = this.$$('.graphe div');
				const divsLongueur = divs.length;
				for(let i = 0 ; i < divsLongueur; i++){
					divs[i].style.transform = 'scale(0)'; // scale à 0 au départ
					// après un certain temps, lancer l'anim de scale() de la div en cours à la valeur du score
					// cette anim à faire en cascade, écart de 100ms
					Promise.resolve() // créer un objet promesse déjà tenue ; cela permet de traiter delai()
						.then(this.delai(300 + (i*100)))
						.then(() => {
							divs[i].style.transform = `scale(${scoresPourcent[i]})`;
							divs[i].classList.remove('opacite0');
						});
				}
			});
	}

}

document.addEventListener('DOMContentLoaded',()=>{

	// si terminal pas tactile, alors afficher ascenseur vertical pour éviter la surprise du décalage du contenu de la fenêtre dans l'écran des résultats
	// if ('ontouchstart' in window === false){
	// 	document.body.style.overflowY = 'scroll';
	// }
	// l'objet de contrôle
	new Test();
});
