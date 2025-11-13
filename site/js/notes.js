const form = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");

// Load all notes
async function loadNotes() {
  try {
    const res = await fetch("/api/notes");
    const notes = await res.json();

    notesContainer.innerHTML = notes
      .map(
        (note) => `
      <div class="note-card">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote(${note.id})">Delete</button>
      </div>
    `
      )
      .join("");
  } catch (err) {
    notesContainer.innerHTML = "<p>Error loading notes.</p>";
    console.error(err);
  }
}

// Add new note
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) return alert("Title and content required!");

  try {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      loadNotes();
    } else {
      alert("Error adding note.");
    }
  } catch (err) {
    alert("Error adding note: " + err);
  }
});

// Delete note with confirmation
async function deleteNote(id) {
  if (!id) return alert("Invalid note ID.");

  const confirmed = confirm("Are you sure you want to delete this note?");
  if (!confirmed) return;

  try {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (res.ok) {
      loadNotes(); // reload notes after deletion
    } else {
      alert("Failed to delete note.");
    }
  } catch (err) {
    alert("Error deleting note: " + err);
  }
}

// Initial load
loadNotes();
