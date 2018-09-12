import { observable, computed, autorun, action, reaction } from "mobx";
import superagent from "superagent";
import { HOST } from "../.config.js";

export class Store {

  constructor(name, email) {
    this.name = name;
  }

  @computed
  get filterByDate() {
    return this.expenseList.filter(
      expense => expense.date === this.selectedDate
    );
  }

  @computed
  get total() {
    let tempExp = this.expenseList.slice();
    if (tempExp.length > 0) {
      return tempExp.map(exp => exp.amount).reduce((prev, curr) => prev + curr);
    }
    return 0;
  }

  @action
  filterExpenses() {
    let res = this.filterExpensesByMonth(this.originalExpenseList);
    let res2 = this.filterExpensesByTag(res);
    let res3 = this.filterExpensesByPage(res2);
    this.expenseList = res3;
  }

  @action
  uploadCSV() {
    this.pendingRequestCount++;
    let req = superagent.post(`${HOST}/api/v1/expenses/upload/csv`);
    this.filesAccepted.map(file => {
      req.attach(file.name, file);
    });
    req.end(
      action("uploadCSV-callback", (error, results) => {
        if (error) console.error(error);
        else {
          const data = JSON.parse(results.text);
          console.log(data);
          this.pendingRequestCount--;
        }
      })
    );
  }

  @action
  exportExpensesCSV() {
    window.open(`${HOST}/api/v1/expenses/export/csv`, "_blank");
  }

  @action
  getExpenses() {
    this.pendingRequestCount++;
    let req = superagent.get(`${HOST}/api/v1/expenses`);
    req.end(
      action("getExpenses-callback", (err, res) => {
        if (err) {
          console.log("err: ", err);
        }
        let newExpenses = JSON.parse(res.text);
        this.originalExpenseList = newExpenses;
        this.expenseList.push(...newExpenses);
      })
    );
  }

  @action
  updateExpense(expense) {
    this.pendingRequestCount++;
    let req = superagent.put(`${HOST}/api/v1/expenses`).send(expense);
    req.end(
      action("updateExpense-callback", (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log(results);
          this.pendingRequestCount--;
        }
      })
    );
  }

  @action
  deleteExpense(expense) {
    this.pendingRequestCount++;
    let req = superagent.delete(`${HOST}/api/v1/expenses`).send(expense);
    let removed = this.expenseList.remove(expense);
    req.end(
      action("deleteExpense-callback", (error, results) => {
        if (error) {
          console.error(error);
          this.expenseList.push(expense);
        } else {
          console.log(results);
          this.pendingRequestCount--;
        }
      })
    );
  }

  @action
  filterExpensesByPage(expenses) {
    let currentPage = this.page * this.itemsPerPage;
    return expenses.slice(0, currentPage);
  }

  @action
  filterExpensesByTag(expenses) {
    if (this.tag !== "All") {
      return expenses.filter(expense => {
        return expense.tags.indexOf(this.tag) !== -1;
      });
    }
    return expenses;
  }

  @action
  filterExpensesByMonth(expenses) {
    return expenses.filter(expense => {
      return new Date(expense.date).getMonth() === this.month;
    });
  }
}
