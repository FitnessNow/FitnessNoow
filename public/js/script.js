// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("fitness-nowt JS imported successfully!");
});

function removeNavBar() {
  const navBarElement = document.querySelector('.navbar');
  const hamburgerElement = document.querySelector('.menuToggle');
  const logoElement = document.querySelector('.logo-text');

  if(window.innerWidth <= 770) {
    navBarElement.style.display = 'none';
    hamburgerElement.style.display = 'flex';
    logoElement.removeAttribute("hidden");
  } else if(window.innerWidth >= 771) {
    navBarElement.style.display = 'flex';
    hamburgerElement.removeAttribute("hidden");
  }
}

window.addEventListener('Loaded', removeNavBar);
window.addEventListener('resize', removeNavBar);

function displayListandCreateExpense() {
  const expenseParent = document.querySelector('.expense');
  const expenseChild = document.querySelector('.child-expense');
  let isChildExpenseVisible = false;

  expenseParent.addEventListener('click', () => {
      if (isChildExpenseVisible) {
        expenseChild.hidden = true;
        isChildExpenseVisible = false;
      } else {
        expenseChild.hidden = false;
        isChildExpenseVisible = true;
      }
    }
)};

function displayListandCreateIncome() {
    const incomeParent = document.querySelector('.income');
    const incomeChild = document.querySelector('.child-income');
    let isChildIncomeVisible = false;
  
    incomeParent.addEventListener('click', () => {
        if (isChildIncomeVisible) {
          incomeChild.hidden = true;
          isChildIncomeVisible = false;
        } else {
          incomeChild.hidden = false;
          isChildIncomeVisible = true;
        }
      }
)};

displayListandCreateExpense();
displayListandCreateIncome();