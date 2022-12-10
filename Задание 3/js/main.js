const url = "wss://echo-ws-service.herokuapp.com";
const btnSend = document.querySelector("#btnSend");
const btnOpen = document.querySelector("#btnOpen");
const btnNavigacion = document.querySelector("#btnNavigacion");
const userMessage = document.querySelector("#exampleFormControlInput1");
const divResponse = document.querySelector(".divResponse");

let websocked;

btnOpen.addEventListener("click", () => {
  websocked = new WebSocket(url);
  websocked.onopen = (e) => {
    console.log("Conected");
  };
  btnSend.removeAttribute("disabled");
  btnNavigacion.removeAttribute("disabled");
  websocked.onmessage = (e) => {
    toScreen("Ответ собеседника: " + e.data, "Answer");
  };
  websocked.onerror = () => {
    toScreen("Ошибка " + e.data);
  };
});

btnSend.addEventListener("click", () => {
  if (userMessage.value) {
    toScreen(userMessage.value);
    websocked.send(userMessage.value);
  }
});

function toScreen(message, type) {
  let div = document.createElement("div");

  if (type === "Answer") {
    div.innerHTML = `<p>${message}</p>`;
    div.classList.add("Answer");
  } else if (type === "Geo") {
    div.innerHTML = `<a href=${message}>Ссылка на геопозицию</a>`;
    div.classList.add("User");
  } else {
    div.innerHTML = `<p>${message}</p>`;
    div.classList.add("User");
  }
  div.classList.add("div");
  divResponse.appendChild(div);
}

btnNavigacion.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      toScreen(
        `https://www.openstreetmap.org/#map=7/${latitude}/${longitude}`,
        "Geo"
      );
    });
  } else {
    toScreen("Geolocation не поддерживается вашим браузером");
  }
});
