const state = {
  sections: [],
};

const addForm = document.getElementById("add-form");
const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const sectionsList = document.getElementById("sections-list");
const previewContent = document.getElementById("preview-content");

function render() {
  sectionsList.innerHTML = "";
  previewContent.innerHTML = "";

  state.sections.forEach((section) => {
    const card = document.createElement("div");
    card.className = "section-card";
    card.draggable = true;
    card.dataset.id = section.id;
    card.innerHTML = `
      <span>${section.title}</span>
      <button data-id="${section.id}" class="delete-btn">✕</button>
    `;

    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", section.id);
    });

    card.addEventListener("dragover", (e) => e.preventDefault());

    card.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedId = Number(e.dataTransfer.getData("text/plain"));
      reorderSections(draggedId, section.id);
    });

    sectionsList.appendChild(card);

    const preview = document.createElement("div");
    preview.className = "preview-section";
    preview.innerHTML = `<h3>${section.title}</h3><p>${section.content}</p>`;
    previewContent.appendChild(preview);
  });
}

function reorderSections(draggedId, targetId) {
  if (draggedId === targetId) return;

  const fromIndex = state.sections.findIndex((s) => s.id === draggedId);
  const toIndex = state.sections.findIndex((s) => s.id === targetId);

  const [dragged] = state.sections.splice(fromIndex, 1);
  state.sections.splice(toIndex, 0, dragged);

  render();
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  state.sections.push({
    id: Date.now(),
    title: titleInput.value,
    content: contentInput.value,
  });

  addForm.reset();
  render();
});

sectionsList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const id = Number(e.target.dataset.id);
  state.sections = state.sections.filter((s) => s.id !== id);
  render();
});

render();
