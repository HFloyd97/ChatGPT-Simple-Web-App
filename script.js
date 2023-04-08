const submitButton = document.getElementById("submitButton");
const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");

submitButton.addEventListener("click", () => {
  const name = nameInput.value;
  greeting.textContent = `Hello, ${name}!`;
});

