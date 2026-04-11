let searchEl = document.querySelector("#search");

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
let timeout;
let oldRequest;
function debounce(func, delay) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    if (oldRequest !== searchEl.value.toLowerCase().trim()) {
      func();
      oldRequest = searchEl.value.toLowerCase().trim();
    }
  }, delay);
}
