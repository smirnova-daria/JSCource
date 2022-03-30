'use strict';

let title;
let screens;
let screenPrice;
let adaptive;

let service1;
let service2;

let rollback = 10;

let allServicePrices;
let fullPrice;
let servicePercentPrice;

const isNumber = function (num) {
	return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
	title = prompt('Как называется ваш проект?', ' калькулятОр');
	screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

	do {
		screenPrice = prompt('Сколько будет стоить данная работа?');
	} while (!isNumber(screenPrice));

	// манипуляции для того, чтобы с пробелами и без в переменную заносилось именно число (усложненное задание)
	screenPrice = +(screenPrice.toString().trim()); 

	adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function () {
	let sum = 0;

	for (let i = 0; i < 2; i++) {

		if (i === 0) {
			service1 = prompt('Какой дополнительный тип услуги нужен?');
		} else if (i === 1) {
			service2 = prompt('Какой дополнительный тип услуги нужен?');
		}

		let servicePrice;
		do {
			servicePrice = prompt('Сколько это будет стоить?');
		} while (!isNumber(servicePrice));

		servicePrice = +(servicePrice.toString().trim());

		sum += servicePrice;
	}

	return sum;
};

const showTypeOf = function (variable) {
	console.log(variable, typeof variable);	
};

const getRollbackMessage = function (price) {
	if (price >= 30000) {
		return 'Даем скидку в 10%';
	} else if (price >= 15000 && price < 30000) {
		return 'Даем скидку в 5%';
	} else if (price < 15000 && price >= 0) {
		return 'Скидка не предусмотрена';
	} else {
		return 'Что-то пошло не так';
	}	
};

const getFullPrice = function () {
	return screenPrice + allServicePrices;
};

const getTitle = function (title) {
	if (!title) {
		title = "Название проекта не указано";
	} else {
		title = title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
	}
	return title;
};

const getServicePercentPrices = function () {
	return fullPrice - Math.floor(fullPrice * rollback / 100);
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle(title);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));
