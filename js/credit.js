/*jshint es5: true, esnext: true, browser: true*/

/**
 * 
 * @param {number} sum сумма кредита в рублях
 * @param {number} rate годовая ставка в процентах (0—100)
 * @param {number} term ставка в месяцах
 * @return {object} объект, содержащий переплату, суммы выплат и расписание погашения. 
 */

function calcuateAnnuitet (sum, rate, term) {
	const 
		monthlyRate			= rate / 100 / 12,
		monthlyPayment		= +( (sum * ( monthlyRate + monthlyRate / ( Math.pow( (1 + monthlyRate), term ) - 1) )).toFixed(2) ),
		totalSum			= monthlyPayment * term,
		overpaySum			= totalSum - sum
	;
	
	let 
		result = { 
			shedule:		[ ], 
			total:			{ 
				sum:		totalSum,
				percent:	+( (totalSum / sum * 100).toFixed(2) )
			},
			overpayment:	{
				sum:		overpaySum,
				percent:	+( (overpaySum / sum * 100, 2).toFixed(2) )
			}
		},
		remainingSum 		= sum,
		monthlyOverpaySum,
		monthlyDebtSum
	;
	
	for (let i = 0; i < term; i++) {
		monthlyOverpaySum	= remainingSum * monthlyRate;
		monthlyDebtSum		= monthlyPayment - monthlyOverpaySum;
		remainingSum		-=monthlyDebtSum;

		result.shedule.push( {payment: monthlyPayment, debt: monthlyDebtSum, overpay: monthlyOverpaySum } );
	}
	
	return result;
}
