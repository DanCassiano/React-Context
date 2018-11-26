export default {
  joke: ""
};

export function fetchJoke() {
  const url = "https://api.icndb.com/jokes/random";
  return store =>
    fetch(url)
      .then(res => res.json())
      .then(data => {
        store.set("chuckNorris", data.value);
      })
      .catch(error => console.error("Error:", error));
}
