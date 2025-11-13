const container = document.getElementById("notes-container");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");

// Populate category filter
const categories = [...new Set(notes.map(n => n.category))];
categories.forEach(cat => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categoryFilter.appendChild(option);
});

// Render notes
function renderNotes(filteredNotes) {
  container.innerHTML = "";
  filteredNotes.forEach(note => {
    const card = document.createElement("div");
    card.classList.add("note-card");
    card.innerHTML = `
      <h3>${note.title}</h3>
      <p><strong>Category:</strong> ${note.category}</p>
      <p><strong>Date:</strong> ${note.date}</p>
      <p>${note.content}</p>
    `;
    container.appendChild(card);
  });
}

// Initial render
renderNotes(notes);

// Filter/search logic
function filterNotes() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = notes.filter(note => {
    const matchesCategory = selectedCategory === "all" || note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm) || note.content.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  renderNotes(filtered);
}

searchInput.addEventListener("input", filterNotes);
categoryFilter.addEventListener("change", filterNotes);
