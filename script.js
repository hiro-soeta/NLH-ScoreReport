function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}

function refreshLoginCookie() {
  const username = getCookie("username");
  if (username) setCookie("username", username, 30);
}

document.addEventListener("DOMContentLoaded", () => {
  refreshLoginCookie();
  const usernameField = document.getElementById("username");
  if (usernameField) {
    const savedName = getCookie("username");
    if (savedName) usernameField.value = savedName;
  }

  const scoreForm = document.getElementById("scoreForm");
  if (scoreForm) {
    const inputs = ["black", "green", "red", "white", "revive"];
    inputs.forEach(id => {
      document.getElementById(id).addEventListener("input", updateScore);
    });
    scoreForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("username").value;
      setCookie("username", name, 30);
      alert("保存しました（ローカル保存）");
    });
    updateScore();
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;
      if (validatePassword(password)) {
        setCookie("username", username, 30);
        window.location.href = "index.html";
      } else {
        document.getElementById("loginError").textContent = "パスワード形式が不正です";
      }
    });
  }
});

function updateScore() {
  const black = parseInt(document.getElementById("black").value) || 0;
  const green = parseInt(document.getElementById("green").value) || 0;
  const red = parseInt(document.getElementById("red").value) || 0;
  const white = parseInt(document.getElementById("white").value) || 0;
  const revive = parseInt(document.getElementById("revive").value) || 0;
  const score = black*100 + green*25 + red*5 + white*1 - revive*200;
  const total = score - 200;
  document.getElementById("totalScore").textContent = total;
}

function validatePassword(pw) {
  return pw.length === 8 &&
         /[A-Z]/.test(pw) &&
         /[a-z]/.test(pw) &&
         /[0-9]/.test(pw);
}

function loadScores() {
  const date = document.getElementById("dateSelector").value;
  document.getElementById("scoreList").textContent = "（ダミーデータ）" + date + " のスコア一覧";
}

function addAdminRow() {
  const div = document.getElementById("adminTable");
  const row = document.createElement("div");
  row.innerHTML = '<input placeholder="名前"> 黒:<input type="number" value="0"> 緑:<input type="number" value="0"> 赤:<input type="number" value="0"> 白:<input type="number" value="0"> 復活:<input type="number" value="0">';
  div.appendChild(row);
}

function saveAdminData() {
  alert("管理者データを保存しました（ローカル処理）");
}
