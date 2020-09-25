/*jshint esversion: 8, browser: true*/

"use stricrt"

/**
 *
 * @param	{number}	sum сумма кредита в рублях
 * @param	{number}	monthlyRate ставка в месяц (годовая / 12)
 * @param	{number}	term ставка в месяцах
 * @return	{number}	ежемесячный платеж
 *
 */
function calculateAnnuitetPayment(sum, rate, term) {
  const monthlyRate = rate / 12;
	return +( (sum * ( monthlyRate + monthlyRate / ( Math.pow( (1 + monthlyRate), term ) - 1) ) ).toFixed(2) );
}

/**
 *
 * @param	{number}	sum сумма кредита в рублях
 * @param	{number}	rate годовая ставка в процентах (0—100)
 * @param	{number}	term ставка в месяцах
 * @requires			function calculateAnnuitetPayment
 *
 */
function generateSchedule (sum, rate, term, date = new Date( ) ) {
  const 
	return schedule;
}

function getDaysInMonth(year, month) {
	return  32 - new Date(year, month - 1, 32).getDate( );
}

function getDaysInYear(year) {
	return ( new Date(year, 11, 31) - new Date(year, 0, 0) ) / 86400000;
}
