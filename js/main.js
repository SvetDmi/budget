"use strict";

let startBtn = document.getElementById("start"),
  budgetValue = document.getElementsByClassName("budget-value")[0],
  dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
  levelValue = document.getElementsByClassName("level-value")[0],
  expensesValue = document.getElementsByClassName("expenses-value")[0],
  optionalExpensesValue = document.getElementsByClassName(
    "optionalexpenses-value"
  )[0],
  incomeValue = document.getElementsByClassName("income-value")[0],
  monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
  yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],
  expensesItem = document.getElementsByClassName("expenses-item"),
  expensesBtn = document.getElementsByTagName("button")[0],
  optionalExpensesBtn = document.getElementsByTagName("button")[1],
  countBtn = document.getElementsByTagName("button")[2],
  optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
  incomeItem = document.querySelector(".choose-income"),
  checkSavings = document.querySelector("#savings"),
  sumValue = document.querySelector(".choose-sum"),
  percentValue = document.querySelector(".choose-percent"),
  yearValue = document.querySelector(".year-value"),
  monthValue = document.querySelector(".month-value"),
  dayValue = document.querySelector(".day-value"),
  btnAll = document.querySelectorAll("button");

let money, time;

for (var i = 1; i < btnAll.length; i++) {
  btnAll[i].setAttribute("disabled", "");
}

startBtn.addEventListener("click", function () {
  for (var i = 1; i < btnAll.length; i++) {
    btnAll[i].removeAttribute("disabled", "");
  }
  time = prompt("Введите дату в формате YYYY-MM-DD", "");
  const regex = /(20\d{2})-((0||1)\d{1})-([0-3]\d{1})/g;
  let timeRight = regex.test(time);

  if (timeRight == false) {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    timeRight = regex.test(time);
  } else {
    appData.time = time;
    let pars = new Date(Date.parse(time));
    yearValue.value = pars.getFullYear();
    monthValue.value = pars.getMonth();
    dayValue.value = pars.getDate();
  }

  money = +prompt("Ваш бюджет на месяц?", "");
  while (isNaN(money) || money == "" || money == null) {
    money = +prompt("Ваш бюджет на месяц?", "");
  }
  appData.budget = money;

  budgetValue.textContent = money;
});

countBtn.addEventListener("click", function () {
  appData.moneyPerDay = ((appData.budget - appData.expensesDay) / 30).toFixed();
  dayBudgetValue.textContent = appData.moneyPerDay;
  if (appData.moneyPerDay <= 100) {
    levelValue.textContent = "Это минимальный уровень достатка!";
  } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
    levelValue.textContent = "Это средний уровень достатка!";
  } else if (appData.moneyPerDay > 2000) {
    levelValue.textContent = "Это высокий уровень достатка!";
  } else {
    levelValue.textContent = "Ошибочка...!";
  }
});

expensesBtn.addEventListener("click", function () {
  let sum = 0;
  for (let i = 0; i < expensesItem.length; i++) {
    let a = expensesItem[i].value;
    let b = expensesItem[++i].value;
    if (
      typeof a === "string" &&
      typeof a != null &&
      typeof b != null &&
      a != "" &&
      b != "" &&
      a.length < 50
    ) {
      appData.expenses[a] = b;
      sum += +b;
    } else {
      console.log("bad result");
      i--;
    }
    appData.expensesDay = sum / 30;
    expensesValue.textContent = sum;
  }
});

optionalExpensesBtn.addEventListener("click", function () {
  for (let i = 0; i <= optionalExpensesItem.length; i++) {
    appData.optionalExpenses[i] = optionalExpensesItem[i].value;
    optionalExpensesValue.textContent += appData.optionalExpenses[i] + ", ";
  }
});

incomeItem.addEventListener("input", () => {
  let items = incomeItem.value;
  if (isNaN(items) || items != "") {
    appData.income = items.split(",");
    incomeValue.textContent = appData.income;
  }
});

checkSavings.addEventListener("click", () => {
  if (appData.savings == false) {
    appData.savings == true;
  } else {
    appData.savings == false;
  }
});
sumValue.addEventListener("change", () => {
  let sum = +sumValue.value;
  appData.sum = sum;
});

percentValue.addEventListener("input", () => {
  let percent = +percentValue.value;
  appData.monthIncome = (appData.sum / 100 / 12) * percent;
  appData.yearIncome = (appData.sum / 100) * percent;
  monthSavingsValue.textContent = appData.monthIncome.toFixed(2);
  yearSavingsValue.textContent = appData.yearIncome.toFixed(2);
});

let appData = {
  budget: money,
  time: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};
console.log(appData);
