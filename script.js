'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = parseInt(prompt('Сколько будет стоить данная работа?'));
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = parseInt(prompt('Сколько это будет стоить?'));
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = parseInt(prompt('Сколько это будет стоить?'));

const rollback = 5;
const fullPrice = screenPrice + servicePrice1 + servicePrice2;

const servicePercentPrice = fullPrice - Math.floor(fullPrice * rollback / 100);
console.log(servicePercentPrice);

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');

console.log(screens.toLowerCase().split(', '));

console.log('Процент отката посреднику за работу ' + (fullPrice * rollback / 100));

switch (true) {
	case fullPrice >= 30000:
		console.log('Даем скидку в 10%');
		break;
	case fullPrice >= 15000 && fullPrice < 30000:
		console.log('Даем скидку в 5%');
		break;
	case fullPrice < 15000 && fullPrice >= 0:
		console.log('Скидка не предусмотрена');
		break;
	case fullPrice < 0:
		console.log('Что-то пошло не так');
		break;		
}