/*jshint esversion: 6, browser: true*/


/**
 *
 * @param	{number}	sum сумма кредита в рублях
 * @param	{number}	monthlyRate ставка в месяц (годовая / 12)
 * @param	{number}	term ставка в месяцах
 * @return	{number}	ежемесячный платеж
 *
 */
function calculateAnnuitetPayment(sum, monthlyRate, term) {
	return + ( (sum * ( monthlyRate + monthlyRate / ( Math.pow( (1 + monthlyRate), term ) - 1) ) ).toFixed(2) );
}

/**
 *
 * @param	{number}	sum сумма кредита в рублях
 * @param	{number}	rate годовая ставка в процентах (0—100)
 * @param	{number}	term ставка в месяцах
 * @return	{array}		массив, содержащий инфо о каждом платеже
 * @requires			function calculateAnnuitetPayment
 *
 */
function generateAnnuitetSchedule (sum, rate, term, customPayments = [ ]) {
	const monthlyRate = rate / 100 / 12;

	let
		monthlyPayment = calculateAnnuitetPayment(sum, monthlyRate, term),
		remainingSum = sum,
		monthlyOverpaySum,
		monthlyDebtSum,
		customPayment = false,
		schedule = [ ]
	;

	for (let i = 0; i < term; i++) {
		customPayment		= customPayments[i] > monthlyPayment ? customPayments[i] : 0;
		monthlyOverpaySum	= remainingSum * monthlyRate;
		monthlyDebtSum		= monthlyPayment - monthlyOverpaySum + customPayment ? (customPayment - monthlyPayment) : 0;

		if (customPayment && remainingSum + monthlyOverpaySum < customPayment) customPayment = remainingSum + monthlyOverpaySum;
		remainingSum		= remainingSum - monthlyDebtSum - ( customPayment ? (customPayment - monthlyPayment) : 0 );

		schedule.push( {
			minPayment:		monthlyPayment,
			payment: 		customPayment ? customPayment : monthlyPayment,
			debt: 			monthlyDebtSum,
			overpay: 		monthlyOverpaySum,
			remainingSum:	remainingSum,
			number:			i + 1
		} );

		if (remainingSum <= 0) break;
		monthlyPayment		= customPayment ? calculateAnnuitetPayment(remainingSum, monthlyRate, term - i) : monthlyPayment;
	}

	return schedule;
}

var a = [160000];
for(let i = 0; i < 239; i++) a.push(60000);

var res = generateAnnuitetSchedule(5960000, 9.75, 12 * 20, a);
console.log( JSON.stringify(res, 2) );
console.log(res.length);

/** TODO
* Расчёт переплаты по графику платежей
* Генерация таблицы с графиком
* Генерация таблицы с переплатой и проч.
* Генерация таблицы и расчет сравнения с пояснением экономии (платить как обычно, платить с переплатой)
* UI для ввода нестандартных платежей. Учесть ошибку, если платеж меньше минимального.

* расчет диф. платежей и соответствующих фич с нестандартными платежами.
* разработка фич подбора кредита по платежу, сроку, сумме
*/

/* декомпозиция
	UI
		написать общий CSS
		сверстать общий вид страницы
		разработать элементы:
			ввод данных по кредиту
			ввод нестандартных платежей
		разработать функции:
			проверка правильности данных
			конвертация периодов вида "3-10" в формат для функции расчета
*/