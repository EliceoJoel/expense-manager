/***********VARIABLES*********/
const userBudget = parseInt(prompt("What is your budget? - You must enter numbers"));
const form = document.getElementById("add-expense");
let budgetAmount;


/************CLASS************/
class Budget{
   constructor(budget){
      this.budget = Number(budget);
      this.surplus = Number(budget);
   }

   subtractBudget(amount = 0){
      return this.surplus -= Number(amount);
   }

}

//handles html related
class Interfaz{
   enterBudget(amount){
      const budgetSpan = document.querySelector(".budgetAmount");
      const surplusSpan = document.querySelector(".surplusAmount");
      budgetSpan.innerHTML = `$${amount}`;
      surplusSpan.innerHTML = `$${amount}`;
   }

   //print a message of error or success
   printMessage(textMessage, type){
      const message = document.querySelector(".message");
      message.innerHTML = textMessage
      if(type === "error"){
         message.classList.remove("message-success");
         message.classList.add("message-error");
      }else{
         message.classList.remove("message-error");
         message.classList.add("message-success");
         form.reset();
      }
      message.style.display = "block";
      setTimeout(()=>{
         message.style.display = "none";
      }, 2000)
   }

   //Add the dudgets to list
   addExpenseToList(name, amount){
      const expenseList = document.querySelector(".expense-list");
      const newExpense = `<li class="spending">
         <p class="expense-name">${name}</p>
         <p class="expense-amount">$${amount}</p>
      </li>`
      expenseList.innerHTML += newExpense;
   }

   //subtract the expense of the budget
   remainingBudget(amount){
      const surplusSpan = document.querySelector(".surplusAmount");
      const userSurplusAmount = budgetAmount.subtractBudget(amount);
      surplusSpan.innerHTML = `$${userSurplusAmount}`;
      this.changeColorOfSurplus();
   }

   //change color of span label (amount/3)*2 = yellow   ,   (amount/3) = red
   changeColorOfSurplus(){
      const surplusSpan = document.querySelector(".surplus");
      const surplus = budgetAmount.surplus;
      const budget = budgetAmount.budget;
      console.log(surplus, budget);
      if(surplus < (budget*0.25)){
         surplusSpan.classList.remove('surplus-25-50', 'surplus-50-75', 'surplus-75-100');
         surplusSpan.classList.add('surplus-0-25');
      }else if(surplus < (budget*0.5)){
         surplusSpan.classList.remove('surplus-50-75', 'surplus-75-100');
         surplusSpan.classList.add('surplus-25-50');
      }else if(surplus < (budget*0.75)){
         surplusSpan.classList.remove('surplus-75-100');
         surplusSpan.classList.add('surplus-50-75');
      }
   }
}


/************EVENT LISTENERS***********/
document.addEventListener("DOMContentLoaded", ()=>{
   if(userBudget === null || userBudget === '' || isNaN(userBudget)){
      window.location.reload();
   }else{
      budgetAmount = new Budget(userBudget);
      //instantiate the budget class
      const ui = new Interfaz();
      ui.enterBudget(budgetAmount.budget)
   }
})

form.addEventListener("submit", (e)=>{
   e.preventDefault();
   //get values of the inputs
   const expenseName = document.getElementById("expense").value;
   const expenseAmount = document.getElementById("amount").value;
   const ui = new Interfaz();

   //check empty fields
   if(expenseName === "" || expenseAmount === ""){
      ui.printMessage("Empty fields", "error");
   }else{
      //Verify that the remainder is greater than zero
      if(expenseAmount <= budgetAmount.surplus){
         ui.printMessage("Expense added correctly", "success");
         ui.addExpenseToList(expenseName, expenseAmount);
         ui.remainingBudget(expenseAmount);
      }else{
         ui.printMessage("Spending exceeds your remaining money", "error");
      }
   }
})
