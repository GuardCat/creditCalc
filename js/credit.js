/*jshint esnext: true */

"use strict"

/**
 *
 * @param     {number}	sum сумма кредита в рублях
 * @param     {number}	rate ставка
 * @param     {number}	term срок в месяцах
 * @requires  {function} annuitetCoefficient
 * @return    {number}	ежемесячный платеж
 *
 */

function annuitetPayment(sum, rate, term) {
	const 
		mRate = rate / 12 / 100,
		ac = annuitetCoefficient(rate, term)
	;
	return +( (sum * ac).toFixed(2) );
}

function annuitetCoefficient(rate, term) {
		const mRate = rate / 12 / 100;
		return mRate * Math.pow(mRate + 1, term) / ( Math.pow(mRate + 1, term) - 1 );
}


/**
 * @param		{number}	sum сумма кредита в рублях
 * @param		{number}	rate годовая ставка в процентах (0—100)
 * @param		{number}	term ставка в месяцах
 * @requires	{function}	annuitetPayment
 * @requires	{function}	datesDiff
 *
 */
function generateSchedule (sum, rate, term, date = new Date( ) ) {
	const dailyRate = rate / 365 / 100;
	let 
		payment = annuitetPayment(sum, rate, term),
		schedule = [ ],	summary = { totalSum: 0, overpay: 0, overpayProc: 0},
		paymentDate = date,	previousDate,
		debt = sum, overpay
	;

	for (let i = 0; i < term; i++ ) {
		previousDate = new Date(paymentDate);
		paymentDate.setMonth( paymentDate.getMonth( ) + 1 );

		if (debt < payment) payment = debt;
		overpay = debt * dailyRate * datesDiff(previousDate, paymentDate)
		schedule.push( {date: new Date (paymentDate) , sum: payment, debtSum: payment - overpay, overpay} );
		summary.totalSum += payment;
		debt -= payment - overpay;
	}
	
	summary.overpay = summary.totalSum - sum;
	summary.overpayProc = +( (summary.overpay /  sum * 100).toFixed(2) )
	
	return {schedule, summary};
}

function datesDiff(d1, d2) {
	if ( !d1 || !(d1 instanceof Date) || isNaN(d1) ) return new Error(`function datesDiff: incorrect date1 (${d1}) `);
	if ( !d2 || !(d2 instanceof Date) || isNaN(d2) ) return new Error(`function datesDiff: incorrect date2 (${d2}) `);
	return Math.ceil( (d2 - d1) / (60 * 60 * 24 * 1000) );
}

function getDaysInMonth(year, month) {
	return  32 - new Date(year, month - 1, 32).getDate( );
}

function getDaysInYear(year) {
	return ( new Date(year, 11, 31) - new Date(year, 0, 0) ) / 86400000;
}
