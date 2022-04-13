'use strict';

const title = document.getElementsByTagName('h1')[0];


const plusBtn = document.querySelector('.screen-btn');
const otherItemsWithPercent = document.querySelectorAll('.other-items.percent');
const otherItemsWithNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input[type="range"]');
const inputRangeValue = document.querySelector('.rollback span.range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');
let selects = document.querySelectorAll('select[name=views-select]:not(#cms-select)');
let inputsScreensQuantity = document.querySelectorAll('.main-controls__input > input:not(#cms-other-input)');

const appData = {
	title: '',
	screens: [],
	count: 0,
	screenPrice: 0,
	adaptive: true,
	rollback: 0,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	servicesPercent: {},
	servicesNumber: {},
	init: function () {
		appData.addTitle();

		startBtn.addEventListener('click', appData.isCheckedSelects);

		plusBtn.addEventListener('click', appData.addScreenBlock);
		inputRange.addEventListener('input', appData.addRollback);
	},
	addTitle: function () {
		document.title = title.textContent;
	},
	start: function () {
		appData.addScreens();
		appData.addServices();
		appData.addPrices();

		appData.logger();

		appData.showResult();
	},
	showResult: function () {
		total.value = appData.screenPrice;
		totalCount.value = appData.count;
		totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
		fullTotalCount.value = appData.fullPrice;
		totalCountRollback.value = appData.servicePercentPrice;
	},
	isCheckedSelects: function () {
		let isChecked = appData.checkSelects();
		if (isChecked) {
			appData.start();
		}
	},
	checkSelects: function () {
		selects = document.querySelectorAll('select[name=views-select]:not(#cms-select)');
		inputsScreensQuantity = document.querySelectorAll('.main-controls__input > input:not(#cms-other-input)');
		let isChecked = true;

		selects.forEach(select => {
			const selectName = select.options[select.selectedIndex].textContent;
			if (selectName === 'Тип экранов') {
				isChecked = false;
			}
		});
		inputsScreensQuantity.forEach(input => {
			if (input.value === "" || input.value === 0 || input.value === null) {
				isChecked = false;
			}
		});
		return isChecked;
	},
	addScreens: function () {
		appData.screens = [];
		appData.count = 0;
		screens = document.querySelectorAll('.screen');

		screens.forEach((screen, index) => {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;

			appData.count += +input.value;
			appData.screens.push({
				id: index,
				name: selectName,
				price: +select.value * +input.value
			});
		});
	},
	addScreenBlock: function () {
		const cloneScreen = screens[0].cloneNode(true);
		screens[screens.length - 1].after(cloneScreen);

		selects = document.querySelectorAll('select[name=views-select]:not(#cms-select)');
		inputsScreensQuantity = document.querySelectorAll('.main-controls__input > input:not(#cms-other-input)');
	},
	addServices: function () {
		otherItemsWithPercent.forEach(item => {
			const check = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');

			if (check.checked) {
				appData.servicesPercent[label.textContent] = +input.value;
			}
		});

		otherItemsWithNumber.forEach(item => {
			const check = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');

			if (check.checked) {
				appData.servicesNumber[label.textContent] = +input.value;
			}
		});
	},
	addPrices: function () {
		appData.screenPrice = appData.screens.reduce(function (accumulator, current) {
			return accumulator + current.price;
		}, 0);

		for (let key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key];
		}

		for (let key in appData.servicesPercent) {
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
		}

		appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

		appData.servicePercentPrice = appData.fullPrice - Math.floor(appData.fullPrice * appData.rollback / 100);
	},
	addRollback: function (event) {
		inputRangeValue.textContent = event.target.value;
		appData.rollback = +event.target.value;
		totalCountRollback.value = appData.fullPrice - Math.floor(appData.fullPrice * +event.target.value / 100);
	},
	logger: function () {
		// console.log(appData.services);
		// console.log(appData.fullPrice);
		// console.log(appData.servicePercentPrice);
		// console.log(appData.screens);
		console.log(appData);
	}
};

appData.init();