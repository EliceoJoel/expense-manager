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

   printMessage(textMessage, type){
      const message = document.querySelector(".message");
      message.innerHTML = textMessage
      if(type === "error"){
         message.classList.remove("message-success");
         message.classList.add("message-error");
      }else{
         message.classList.remove("message-error");
         message.classList.add("message-success");
      }
      message.style.display = "block";
      setTimeout(()=>{
         message.style.display = "none";
         if(type==="success"){form.reset();}
      }, 2000)
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
      ui.printMessage("Expense added correctly", "success");
   }
})
