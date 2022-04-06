const debounce = (fn, delay) => {
  let t = null;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const getSuggestions = (input) => {
  const i = Math.floor((Math.random() * 1000) % 20);

  return fetch(
    `https://jsonplaceholder.typicode.com/comments?_start=${i}&_limit=5`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { getSuggestions, debounce };
