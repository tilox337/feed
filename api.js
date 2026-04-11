let url = new URL("https://jsonplaceholder.typicode.com/posts");
let curentPage = 1;
let lim = 4;

async function loadData(filter = "") {
  const thisUrl = new URL(url);
  thisUrl.searchParams.set("q", filter);
  thisUrl.searchParams.set("_limit", lim);
  thisUrl.searchParams.set("_page", curentPage);
  return await fetch(thisUrl).then((response) => response.json());
}
