'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = parseInt(prompt('Сколько будет стоить данная работа?'));
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = parseInt(prompt('Сколько это будет стоить?'));
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = parseInt(prompt('Сколько это будет стоить?'));

let rollback = 0;

let allServicePrices;
let fullPrice;
let servicePercentPrice;

const showTypeOf = function (variable) {
	console.log(variable, typeof variable);	
};

const getRollbackMessage = function (price) {
	if (price >= 30000) {
		rollback = 10;
		return 'Даем скидку в 10%';
	} else if (price >= 15000 && price < 30000) {
		rollback = 5;
		return 'Даем скидку в 5%';
	} else if (price < 15000 && price >= 0) {
		return 'Скидка не предусмотрена';
	} else {
		return 'Что-то пошло не так';
	}	
};

const getAllServicePrices = function (price1, price2) {
	return price1 + price2;
};

function getFullPrice(screenPrice, allServicePrices) {
	return screenPrice + allServicePrices;
}

function getTitle(title) {
	return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
}

function getServicePercentPrices(fullPrice, rollback) {
	return fullPrice - Math.floor(fullPrice * rollback / 100);
}

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(getTitle(title));
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));
