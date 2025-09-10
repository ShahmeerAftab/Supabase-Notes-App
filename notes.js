// Supabase Initialization
const supabaseUrl = "https://mktfagwltkjjqteovbjb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rdGZhZ3dsdGtqanF0ZW92YmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNDg0MjAsImV4cCI6MjA3MTYyNDQyMH0.BOaG8nCpzYpZAojZKGWkN1zc4Q4cU1zfcnEpzGVGlko";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabase);

// Global Variable For Edit Functionality
let editingNoteId = null;

// Add Event
const addNotes = document.querySelector("#addBtn");
addNotes.addEventListener("click", async () => {
  // Check User
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    alert(userError.message);
  }

  if (!user) {
    window.location.href = "login.html";
  } else {
    console.log(user.email);

    // Show user email
    document.querySelector("#userEmail").innerText = user.email;
  }

  // Title Access
  const title = document.querySelector("#title").value;
  console.log(title);

  // Notes Access
  const notesBox = document.querySelector("#notesBox").value;
  console.log(notesBox);

  if (!title || !notesBox) {
    alert("Title or Notes Missing");
  }

  // Edit Funcionality
  if (editingNoteId) {
    const { error } = await supabase
      .from("notes")
      .update({ title: title, content: notesBox })
      .eq("id", editingNoteId)
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
    } else {
      alert("Note updated successfuly");
      editingNoteId = null;

      // Update Button Content
      document.querySelector("#addBtn").innerText = "Add Note";

      // Remove Highlighted
      const highlighted = document.querySelector(".border-2");
      if (highlighted) {
        highlighted.classList.remove("border-2");
      }

      document.querySelector("#title").value = "";
      document.querySelector("#notesBox").value = "";
    }
  } else {
    //  Insert Notes
    const { data, error } = await supabase
      .from("notes")
      .insert({ user_id: user.id, title: title, content: notesBox });

    if (error) {
      alert(error.message);
    } else {
      alert("Note added Successfuly");
      console.log(data);
      fetchData();
    }
  }

  document.querySelector("#title").value = "";
  document.querySelector("#notesBox").value = "";
  fetchData();
});

// Fetch Data
const fetchData = async () => {
  // Get User
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "login.html";
  }

  // Fetch Data
  const { data, error } = await supabase
    .from("notes")
    .select()
    .eq("user_id", user.id);

  if (error) {
    alert(error.message);
  } else {
    console.log(data);
    renderNotes(data);
  }
};

// Render Notes
const renderNotes = (notes) => {
  const notesContainer = document.querySelector("#notesContainer");
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    const noteE1 = document.createElement("div");
    noteE1.className =
      "flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-800/60 mt-8 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 shadow w-full gap-4";
    noteE1.innerHTML = ` <div class="flex-1">
                <h3 class="text-sm sm:text-md md:text-lg font-bold">
                  ${note.title}
                </h3>
                <p class="text-sm text-slate-300 pt-2 break-all">${note.content}</p>
              </div>

              
               <div class="flex gap-2 w-full sm:w-auto justify-end sm:justify-start">
                <button
                  class="px-3 py-1 rounded-lg bg-green-200 hover:bg-green-600 text-green-900 text-sm"
                  id="editBtn";
                >
                  Edit
                </button>
                <button
                  class="px-3 py-1 rounded-lg border border-slate-800/60 bg-red-200 hover:bg-red-400 text-red-600 text-sm"
                  id="deleteBtn";
                >
                  Delete
                </button>
              </div>`;

    // Delete Functionality
    const deleteBtn = noteE1.querySelector("#deleteBtn");
    console.log(deleteBtn);
    deleteBtn.addEventListener("click", async () => {
      const { error } = await supabase.from("notes").delete().eq("id", note.id);
      if (error) {
        alert(error.message);
      } else {
        fetchData();
      }
    });

    // Edit Functionality
    const editBtn = noteE1.querySelector("#editBtn");
    console.log(editBtn);

    editBtn.addEventListener("click", async () => {
      const title = (document.querySelector("#title").value = note.title);
      console.log(title);

      const notesBox = (document.querySelector("#notesBox").value =
        note.content);
      console.log(notesBox);

      editingNoteId = note.id;

      const addNoteBtn = (document.querySelector("#addBtn").innerText =
        "Update Note");

      document.querySelector("#title").focus();
      document.querySelector("#title").classList.add("border-2");
      document.querySelector("#notesBox").classList.add("border-2");
    });
    notesContainer.appendChild(noteE1);
  });
};

// Search Functionality
const searchInput = document.querySelector("#searchInput");

// Global Variable to Store Fetch Data
let allNotes = [];

// Fetch Data
const fetchNotes = async () => {
 const { data: { user } , error: userError } = await supabase.auth.getUser()

 if (userError) {
  alert(userError.message);
  return;
 }

 if (!user) {
  return;
} 

  const { data, error } = await supabase
  .from('notes')
  .select()
  .eq("user_id",user.id)
  if (error) {
    alert(error.message);
  } else {
    allNotes = data;
    renderNotes(allNotes);
  }
 }
fetchNotes()


// Add Event on search button
searchInput.addEventListener("input", (e) => {
  const searchWithLowerCase = e.target.value.toLowerCase();

  if (!searchWithLowerCase) {
    renderNotes(allNotes);
    return;
  }

  const filterNotes = allNotes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchWithLowerCase) ||
      note.content.toLowerCase().includes(searchWithLowerCase)
    );
  });

  renderNotes(filterNotes);
});

// Logout Functionality
const logout=document.querySelector("#logout");
logout.addEventListener("click",async()=>{
const { error } = await supabase.auth.signOut();
if (error) {
  alert(error.message)
} else {
  window.location.href="login.html";
}
})
