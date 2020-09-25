/*jshint esversion: 8, browser: true*/

"use stricrt"

/**
 *
 * @param	{number}	sum сумма кредита в рублях
 * @param	{number}	rate ставка
 * @param	{number}	term срок в месяцах
 * @requires {function} annuitetCoefficient
 * @return	{number}	ежемесячный платеж
 *
 */
function annuitetPayment(sum, rate, term) {
	return +( ( sum * annuitetCoefficient(rate, term) ).toFixed(2) );
}

function annuitetCoefficient(rate, term) {
  const mRate = rate / 12 / 100;
  return ( mRate * Math.pow(mRate + 1, term) / ( Math.pow(mRate + 1, term) - 1 ) );
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
