const state = {
  habits: [],
};

const addForm = document.getElementById("add-form");
const habitInput = document.getElementById("habit-input");
const lists = document.querySelectorAll(".habit-list");

function render() {
  lists.forEach((list) => {
    list.innerHTML = "";

    const status = list.dataset.status;
    state.habits
      .filter((h) => h.status === status)
      .forEach((habit) => {
        const card = document.createElement("div");
        card.className = "habit-card";
        card.draggable = true;
        card.dataset.id = habit.id;
        card.innerHTML = `
          <span>${habit.text}</span>
          <button data-id="${habit.id}" class="delete-btn">✕</button>
        `;

        card.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", habit.id);
        });

        list.appendChild(card);
      });
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  state.habits.push({
    id: Date.now(),
    text: habitInput.value,
    status: "todo",
  });

  addForm.reset();
  render();
});

lists.forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  list.addEventListener("drop", (e) => {
    e.preventDefault();

    const id = Number(e.dataTransfer.getData("text/plain"));
    const habit = state.habits.find((h) => h.id === id);
    if (habit) {
      habit.status = list.dataset.status;
      render();
    }
  });

  list.addEventListener("click", (e) => {
    if (!e.target.classList.contains("delete-btn")) return;

    const id = Number(e.target.dataset.id);
    state.habits = state.habits.filter((h) => h.id !== id);
    render();
  });
});

render();
