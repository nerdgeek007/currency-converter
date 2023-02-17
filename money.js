// step1 - make a function for populate options
// step2- make a function fetch rates from api

const fromSelect = document.querySelector('[name="from_currency"]');
const toSelect = document.querySelector('[name="to_currency"]');
const formInput = document.querySelector('[name="from_amount"]');
const rateInput = document.querySelector('.to_amount');
const form = document.querySelector('.app form');

const baseUrl = 'https://api.apilayer.com/exchangerates_data/latest';
const myHeaders = new Headers();
myHeaders.append('apikey', 'Lvnd7WJPRgljDqd14d1XeCbRJwPXnkAL');

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

const rateByBase = {};

const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  INR: 'Indian Rupee',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',

  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};
// function for populate options
function currencyOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
        `<option value="${currencyCode}">${currencyCode}-${currencyName}</option>`
    )
    .join('');
}

// function for fetch rates from api
async function fetchRates(base = 'USD') {
  const res = await fetch(`${baseUrl}?base=${base}`, requestOptions);
  const rates = await res.json();

  return rates;
}

async function convertRates(amount, from, to) {
  if (!rateByBase[from]) {
    const rates = await fetchRates(from);
    rateByBase[from] = rates;
  }
  const convertedAmount = rateByBase[from].rates[to];
  const rate = amount * convertedAmount;
  return rate;
}

function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function handleInput(e) {
  const rawAmount = await convertRates(
    parseInt(formInput.value),
    fromSelect.value,
    toSelect.value
  );

  rateInput.textContent = formatCurrency(rawAmount, toSelect.value);
}

const displayCurrencies = currencyOptions(currencies);
// dump the html into html elements
fromSelect.innerHTML = displayCurrencies;
toSelect.innerHTML = displayCurrencies;

form.addEventListener('input', handleInput);
