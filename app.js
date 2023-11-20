const searchBtn = document.getElementById("button");
const searchInput = document.querySelector("#searchFollowers");
const cardsDiv = document.getElementById("cards");

//+ https://api.github.com/users/furkan-dogu/followers?per_page=100

let followers = [];

const getFollowers = async (username) => {
  cardsDiv.innerHTML = "";
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/followers?per_page=100`
    );
    if (res.ok) {
      const data = await res.json();
      followers = data;
      searchInput.style.display = "flex"
      data.forEach((item) => createElem(item));
    } else {
      searchInput.style.display = "none"
      cardsDiv.innerHTML = `<h1 class="mx-auto text-center">Kullanıcı Bulunamadı</h1>`;
    }
  } catch (error) {}
};

const createElem = (user) => {

  const { login, html_url, avatar_url } = user;

  const newElem = `
    <div class="col">
        <div class="card">
        <img src="${avatar_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${login}</h5>
            <a href="${html_url}" target="_blank" class="btn btn-dark">View Profile</a>
        </div>
        </div>
    </div>
    `;
  cardsDiv.innerHTML += newElem;
};

searchBtn.addEventListener("click", () => {
  const value = document.getElementById("searchText").value.trim();

  if (value) {
    getFollowers(value);
  } else {
    alert("Lütfen bir kullanıcı ismi giriniz.");
  }
});

searchInput.addEventListener("input", (e) => {
  cardsDiv.innerHTML = ""
  followers
    .filter((item) =>
      item.login.toLowerCase().includes(e.target.value.toLowerCase())
    )
    .forEach((user) => createElem(user));
});

window.addEventListener("load", () => {
    searchInput.style.display = "none"
})

document.addEventListener("keydown", (e) => {
  if(e.key === "Enter") {
      searchBtn.click()
  }
})
