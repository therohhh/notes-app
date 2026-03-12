const API_URL = "http://localhost:5000/notes";

async function loadNotes() {

    const response = await fetch(API_URL);
    const notes = await response.json();

    const container = document.getElementById("notes");
    container.innerHTML = "";

    notes.forEach(note => {

        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="deleteNote('${note._id}')">Delete</button>
        `;

        container.appendChild(div);
    });
}

async function addNote() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadNotes();
}

async function deleteNote(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}

loadNotes();