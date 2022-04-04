'use strict';

const appData = {
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	rollback: 10,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	services: {},
	start: function () {
		appData.asking();
		appData.addPrices();
		appData.getFullPrice();
		appData.getServicePercentPrices();
		appData.getTitle();

		appData.logger();
	},
	asking: function () {

		do {
			appData.title = prompt('Как называется ваш проект?');
		} while (!appData.title || appData.isNumber(appData.title));

		for (let i = 0; i < 2; i++) {
			let name = '';

			do {
				name = prompt('Какие типы экранов нужно разработать?');
			} while (!name || appData.isNumber(name));

			let price = 0;

			do {
				price = prompt('Сколько будет стоить данная работа?');
			} while (!appData.isNumber(price));

			price = +(price.toString().trim());

			appData.screens.push({
				id: i,
				name,
				price
			});

		}


		for (let i = 0; i < 2; i++) {

			let name = '';

			do {
				name = prompt('Какой дополнительный тип услуги нужен?');
			} while (!name || appData.isNumber(name));

			//усложненное задание - перезапись имеющегося ключа
			if (appData.services[name]) {
				let newName = name + ' №' + i;
				appData.services[newName] = appData.services[name];
				delete appData.services[name];
				name = name + ' №' + (i + 1);
			}

			let price;

			do {
				price = prompt('Сколько это будет стоить?');
			} while (!appData.isNumber(price));

			price = +(price.toString().trim());

			appData.services[name] = price;
		}

		appData.adaptive = confirm('Нужен ли адаптив на сайте?');
	},
	addPrices: function () {
		appData.screenPrice = appData.screens.reduce(function (accumulator, current) {
			return accumulator + current.price;
		}, 0);

		for (let key in appData.services) {
			appData.allServicePrices += appData.services[key];
		}
	},
	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},
	getRollbackMessage: function (price) {
		if (price >= 30000) {
			return 'Даем скидку в 10%';
		} else if (price >= 15000 && price < 30000) {
			return 'Даем скидку в 5%';
		} else if (price < 15000 && price >= 0) {
			return 'Скидка не предусмотрена';
		} else {
			return 'Что-то пошло не так';
		}
	},
	getFullPrice: function () {
		appData.fullPrice = appData.screenPrice + appData.allServicePrices;
	},
	getTitle: function () {
		appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
	},
	getServicePercentPrices: function () {
		appData.servicePercentPrice = appData.fullPrice - Math.floor(appData.fullPrice * appData.rollback / 100);
	},
	logger: function () {
		console.log(appData.services);
		console.log(appData.fullPrice);
		console.log(appData.servicePercentPrice);
		console.log(appData.screens);
	}
};

appData.start();