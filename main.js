let url = new URL("https://jsonplaceholder.typicode.com/posts");
let findButEl = document.querySelector("#findBut");
let searchEl = document.querySelector("#search");
let timeout;

searchEl.addEventListener("input", () => {
  debounce(() => {
    document.querySelector("#list").innerHTML = "";
    loadData(searchEl.value.toLowerCase().trim());
  }, 1000);
});

findButEl.addEventListener("click", () => {
  loadSimulation(searchEl.value.toLowerCase().trim());
  //loadData(searchEl.value.toLowerCase().trim());
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

async function loadData(filter = "") {
  document.querySelector("#list").innerHTML = "";

  const thisUrl = new URL(url);
  thisUrl.searchParams.set("q", filter);
  return await fetch(thisUrl).then((response) => response.json());
  /*.then((data) => {
      data.forEach((element) => {
        document.querySelector("#list").innerHTML +=
          `<h4>${element.title}</h4>`;
      });
      console.log(data);
    });*/
}

async function loadSimulation(filter = "") {
  let i = 0;
  let inter = setInterval(() => {
    i++;
    findButEl.innerHTML = "";
    for (let j = 0; j < (i % 3) + 1; j++) {
      findButEl.innerHTML += ".";
    }
  }, 200);

  let returnData = await loadData(filter);
  setTimeout(() => {
    clearInterval(inter);
    findButEl.innerHTML = "find";
  }, 2000);
  renderData(renderData);
}

function renderData(datas) {
  datas.forEach((element) => {
    document.querySelector("#list").innerHTML += `<h4>${element.title}</h4>`;
  });
}
