document.getElementById("scoreForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const black = parseInt(document.getElementById("black").value) || 0;
  const green = parseInt(document.getElementById("green").value) || 0;
  const red = parseInt(document.getElementById("red").value) || 0;
  const white = parseInt(document.getElementById("white").value) || 0;
  const revive = parseInt(document.getElementById("revive").value) || 0;

  const totalScore = black * 100 + green * 25 + red * 5 + white * 1 - revive * 200;

  const message = `ユーザー: ${username}、合計スコア: ${totalScore}`;
  document.getElementById("message").textContent = message;

  setCookie("username", username);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedUser = getCookie("username");
  if (savedUser) {
    document.getElementById("username").value = savedUser;
  }
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value) {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}
