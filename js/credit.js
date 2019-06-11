/*jshint es5: true, esnext: true, browser: true*/



function calculateAnnuitetPayment(sum, monthlyRate, term) {
	return + ( (sum * ( monthlyRate + monthlyRate / ( Math.pow( (1 + monthlyRate), term ) - 1) ) ).toFixed(2) );
}

/**
 *
 * @param	{number}	sum сумма кредита в рублях
 * @param	{number}	rate годовая ставка в процентах (0—100)
 * @param	{number}	term ставка в месяцах
 * @return	{array}		массив, содержащий инфо о каждом платеже
 * @requires			function calculateAnnuitetPaymen
 *
 */
function generateAnnuitetShedule (sum, rate, term, customPayments = [ ]) {
	const monthlyRate = rate / 100 / 12;

	let
		monthlyPayment = calculateAnnuitetPayment(sum, monthlyRate, term),
		remainingSum = sum,
		monthlyOverpaySum,
		monthlyDebtSum,
		customPayment = false,
		shedule = [ ]
	;

	for (let i = 0; i < term; i++) {
		customPayment		= customPayments[i] ? customPayments[i] : false;
		monthlyOverpaySum	= remainingSum * monthlyRate;
		monthlyDebtSum		= monthlyPayment - monthlyOverpaySum - ( customPayment ? (monthlyPayment - customPayment) : 0 );
		remainingSum		-=monthlyDebtSum;

		if (remainingSum <= 0) break;
		shedule.push( {minPayment: monthlyPayment, payment: customPayment ? customPayment : monthlyPayment, debt: monthlyDebtSum, overpay: monthlyOverpaySum, remainingSum: remainingSum } );
		monthlyPayment		= customPayment ? calculateAnnuitetPayment(remainingSum, monthlyRate, term - i) : monthlyPayment;
	}

	return shedule;
}

var a = [160000]
for(let i = 0; i < 239; i++) a.push(60000);

var res = generateAnnuitetShedule(5960000, 9.75, 12 * 20, a);
console.log( JSON.stringify(res, 2) );
console.log(res.length)
