let url = new URL("https://jsonplaceholder.typicode.com/posts");
let findButEl = document.querySelector("#findBut");
let searchEl = document.querySelector("#search");
let timeout;

searchEl.addEventListener("input", () => {
  debounce(() => {
    document.querySelector("#list").innerHTML = "";
    loadData(searchEl.value);
  }, 1000);
});

findButEl.addEventListener("click", () => {
  loadData();
  findButEl.disabled = true;
  setTimeout(() => {
    findButEl.disabled = false;
  }, 2000);
});

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
function debounce(func, delay) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(func, delay);
}

function loadData(filter = "") {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        document.querySelector("#list").innerHTML += element.title;
      });
      console.log(data);
    });
}

function loadSimulation() {
  let i = 0;
  let inter = setInterval(() => {
    i++;
    searchEl.innerHTML = "";
    for (let j = 0; j < (i % 3) + 1; j++) {
      searchEl.innerHTML += ".";
    }
  }, 100);

  setTimeout(() => {
    //loadData();

    clearInterval(inter);
    searchEl.innerHTML = "find";
  }, 1000);

  //clearInterval(inter);
}
