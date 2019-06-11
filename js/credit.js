/*jshint es5: true, esnext: true, browser: true*/

/**
 * 
 * @param	{number} sum сумма кредита в рублях
 * @param	{number} rate годовая ставка в процентах (0—100)
 * @param	{number} term ставка в месяцах
 * @return	{object} объект, содержащий переплату, суммы выплат и расписание погашения. 
 */

function calculateAnnuitetPayment(sum, monthlyRate, term) {
	return + ( (sum * ( monthlyRate + monthlyRate / ( Math.pow( (1 + monthlyRate), term ) - 1) ) ).toFixed(2) );
}

function calcuateAnnuitet (sum, rate, term, myPayment = 0) {
	const monthlyRate = rate / 100 / 12;
	
	let	monthlyPayment = calculateAnnuitetPayment(sum, monthlyRate, term);
	
	const totalSum = monthlyPayment * term, overpaySum = totalSum - sum;
	
	let 
		result = { 
			shedule: [ ], 
			totalSum: totalSum,
			overpayment: {
				sum: overpaySum,
				percent: +( (overpaySum / sum * 100).toFixed(2) )
			}
		},
		remainingSum = sum,
		monthlyOverpaySum,
		monthlyDebtSum
	;
	
	for (let i = 0; i < term; i++) {
		monthlyOverpaySum	= remainingSum * monthlyRate;
		monthlyPayment		= myPayment ? calculateAnnuitetPayment(remainingSum, monthlyRate, term - i) : monthlyPayment;
		monthlyDebtSum		= monthlyPayment - monthlyOverpaySum - ( myPayment ? (monthlyPayment - myPayment) : 0 );
		remainingSum		-=monthlyDebtSum;

		if (remainingSum <= 0) break;

		result.shedule.push( {payment: monthlyPayment, debt: monthlyDebtSum, overpay: monthlyOverpaySum } );
	}
	
	return result;
}
