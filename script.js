'use strict';

const appData = {
	title: '',
	screens: '',
	screenPrice: 0,
	adaptive: true,
	rollback: 10,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	service1: '',
	service2: '',
	asking: function () {
		appData.title = prompt('Как называется ваш проект?', ' калькулятОр');
		appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

		do {
			appData.screenPrice = prompt('Сколько будет стоить данная работа?');
		} while (!appData.isNumber(appData.screenPrice));

		appData.screenPrice = +(appData.screenPrice.toString().trim());

		appData.adaptive = confirm('Нужен ли адаптив на сайте?');
	},
	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},
	getAllServicePrices: function () {
		let sum = 0;

		for (let i = 0; i < 2; i++) {

			if (i === 0) {
				appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
			} else if (i === 1) {
				appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
			}

			let servicePrice;
			do {
				servicePrice = prompt('Сколько это будет стоить?');
			} while (!appData.isNumber(servicePrice));

			servicePrice = +(servicePrice.toString().trim());

			sum += servicePrice;
		}

		return sum;
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
		return appData.screenPrice + appData.allServicePrices;
	},
	getTitle: function (title) {
		if (!title) {
			title = "Название проекта не указано";
		} else {
			title = title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
		}
		return title;
	},
	getServicePercentPrices: function () {
		return appData.fullPrice - Math.floor(appData.fullPrice * appData.rollback / 100);
	},
	start: function () {
		appData.asking();
		appData.allServicePrices = appData.getAllServicePrices();
		appData.fullPrice = appData.getFullPrice();
		appData.servicePercentPrice = appData.getServicePercentPrices();
		appData.title = appData.getTitle(appData.title);
		appData.logger();
	},
	logger: function () {
		for (let key in appData) {
			console.log(key);
		}
	}
};

appData.start();