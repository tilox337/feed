let url = new URL("https://jsonplaceholder.typicode.com/posts");
let findButEl = document.querySelector("#findBut");

findButEl.addEventListener("click", () => {
  loadData();
  findButEl.disabled = true;
  setTimeout(() => {
    findButEl.disabled = false;
  }, 2000);
}); //сделать debounce как хотел маклаков

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function loadData() {
  console.log(1);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#list").innerHTML += data;
    });
}
