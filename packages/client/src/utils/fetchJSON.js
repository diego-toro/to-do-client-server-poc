export function fetchJSON(url, options) {
  return fetch(url, options).then((response) => {
    switch (response.status) {
      case 200:
        return response.json();
      case 204:
        return;
    }
  });
}
