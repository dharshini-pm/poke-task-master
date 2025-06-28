 document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  document.getElementById("welcomeUser").innerHTML = `👋 Welcome, ${user}!`;

  const selected = JSON.parse(localStorage.getItem("selectedPokemon"));
  if (selected) {
    showTaskPage(selected.name, selected.image);
  } else {
    showPokemonOptions();
  }

  loadTasks();
  updateStats();
  showRewards();
});

const pokemonOptions = [
  {
    name: "Pikachu",
    image: "https://img.pokemondb.net/artwork/pikachu.jpg",
    sound: "https://pokemoncries.com/cries-old/025.mp3"
  },
  {
    name: "Charmander",
    image: "https://img.pokemondb.net/artwork/charmander.jpg",
    sound: "https://pokemoncries.com/cries-old/004.mp3"
  },
  {
    name: "Squirtle",
    image: "https://img.pokemondb.net/artwork/squirtle.jpg",
    sound: "https://pokemoncries.com/cries-old/007.mp3"
  },
  {
    name: "Bulbasaur",
    image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    sound: "https://pokemoncries.com/cries-old/001.mp3"
  },
  {
    name: "Eevee",
    image: "https://img.pokemondb.net/artwork/eevee.jpg",
    sound: "https://pokemoncries.com/cries-old/133.mp3"
  }
];

function showPokemonOptions() {
  const list = document.getElementById("pokemonList");
  list.innerHTML = "";
  pokemonOptions.forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p.name;
    btn.onclick = () => {
      playPokemonCry(p.sound); // 🔊 Play the cry
      selectPokemon(p.name, p.image);
    };
    list.appendChild(btn);
  });
}

function playPokemonCry(url) {
  const audio = new Audio(url);
  audio.play().catch(err => {
    console.warn("🔇 Audio blocked by browser. Try using Live Server.", err);
  });
}

function selectPokemon(name, image) {
  localStorage.setItem("selectedPokemon", JSON.stringify({ name, image }));
  showTaskPage(name, image);
}

function showTaskPage(name, image) {
  document.getElementById("pokemonPage").style.display = "none";
  document.getElementById("taskPage").style.display = "block";
  document.getElementById("pokemonNameHeading").textContent = name;
  document.getElementById("pokemonImage").src = image;
}

function changePokemon() {
  localStorage.removeItem("selectedPokemon");
  document.getElementById("taskPage").style.display = "none";
  document.getElementById("pokemonPage").style.display = "block";
  showPokemonOptions();
}

function logout() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("selectedPokemon");
  window.location.href = "login.html";
}

// Task Functions
function addTask() {
  const name = document.getElementById("taskInput").value;
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;
  const user = localStorage.getItem("loggedInUser");

  if (!name || !date || !time) {
    alert("Fill all task details!");
    return;
  }

  const task = { name, date, time, completed: false };
  const tasks = JSON.parse(localStorage.getItem(`${user}_tasks`) || "[]");
  tasks.push(task);
  localStorage.setItem(`${user}_tasks`, JSON.stringify(tasks));

  document.getElementById("taskInput").value = "";
  loadTasks();
  updateStats();
}

function loadTasks() {
  const user = localStorage.getItem("loggedInUser");
  const tasks = JSON.parse(localStorage.getItem(`${user}_tasks`) || "[]");
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
      <span>${task.name}<br>${task.date} ${task.time}</span>
      <button onclick="completeTask(${index})" ${task.completed ? "disabled" : ""}>
        ✔️ ${task.completed ? "Completed" : "Mark Done"}
      </button>
    `;
    list.appendChild(div);
  });
}

function completeTask(index) {
  const user = localStorage.getItem("loggedInUser");
  const tasks = JSON.parse(localStorage.getItem(`${user}_tasks`) || "[]");
  tasks[index].completed = true;
  localStorage.setItem(`${user}_tasks`, JSON.stringify(tasks));
  loadTasks();
  updateStats();
  rewardCard();
}

function updateStats() {
  const user = localStorage.getItem("loggedInUser");
  const tasks = JSON.parse(localStorage.getItem(`${user}_tasks`) || "[]");
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const rate = total ? Math.round((done / total) * 100) : 0;

  document.getElementById("stats").innerHTML = `
    Total Tasks: ${total}<br>
    Completed: ${done}<br>
    Completion Rate: ${rate}%
  `;
}

function rewardCard() {
  const user = localStorage.getItem("loggedInUser");
  const selected = JSON.parse(localStorage.getItem("selectedPokemon"));
  const rewards = JSON.parse(localStorage.getItem(`${user}_rewards`) || "[]");

  rewards.push(selected);
  localStorage.setItem(`${user}_rewards`, JSON.stringify(rewards));
  showRewards();
}

function showRewards() {
  const user = localStorage.getItem("loggedInUser");
  const rewards = JSON.parse(localStorage.getItem(`${user}_rewards`) || "[]");
  const gallery = document.getElementById("rewardGallery");
  gallery.innerHTML = "";

  rewards.forEach(r => {
    const card = document.createElement("div");
    card.className = "reward-card";
    card.innerHTML = `<img src="${r.image}" alt="${r.name}" /><p>${r.name}</p>`;
    gallery.appendChild(card);
  });
}







