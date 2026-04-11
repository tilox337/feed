let errEl = document.querySelector("#errorWin");
let findButEl;

searchEl.addEventListener("input", () => {
  debounce(() => {
    curentPage = 1;

    loadSimulation(searchEl.value.toLowerCase().trim());
    if (!document.querySelector("#findBut")) {
      createFindBut();
      errEl.innerHTML = "";
    }
  }, 500);
});

async function loadSimulation(filter = "") {
  findButEl.disabled = true;
  let i = 0;
  let inter = setInterval(() => {
    i++;
    findButEl.innerHTML = "";
    for (let j = 0; j < (i % 3) + 1; j++) {
      findButEl.innerHTML += ".";
    }
  }, 200);
  let returnData;
  try {
    returnData = await loadData(filter);
    if (returnData.length === 0) {
      document.querySelector("#errorWin").innerHTML = "nofithing found";
    }
  } catch {
    errEl.innerHTML = "conection error";
    returnData = [];
  }
  setTimeout(() => {
    renderData(returnData);

    clearInterval(inter);
    if (returnData.length < lim) {
      document.querySelector("#findContaner").innerHTML = "";
    } else {
      findButEl.innerHTML = "show more";
      findButEl.disabled = false;
    }
  }, 200);
}

function renderData(data) {
  if (curentPage === 1) {
    document.querySelector("#list").innerHTML = "";
  }
  data.forEach((element) => {
    let item = document.createElement("div");
    document.querySelector("#list").appendChild(item);
    item.classList.add("item");
    item.innerHTML += `<h4>${element.title}</h4>` + `<p>${element.body}</p>`;
  });
}

function createFindBut() {
  document.querySelector("#findContaner").innerHTML = "";

  findButEl = document.createElement("button");
  document.querySelector("#findContaner").appendChild(findButEl);
  findButEl.id = "findBut";
  findButEl.innerHTML = "show more";

  findButEl.addEventListener("click", () => {
    curentPage++;
    loadSimulation(searchEl.value.toLowerCase().trim());
  });
}

createFindBut();
loadSimulation();
