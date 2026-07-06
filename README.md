# Supabase Notes App

A simple notes-taking web app built with vanilla HTML, CSS (Tailwind via CDN), and JavaScript, using [Supabase](https://supabase.com) for authentication and data storage.

## Features

- User signup with email and password
- User login with email and password
- Email confirmation on signup
- Create, edit, delete notes (per logged-in user)
- Search/filter notes by title or content
- Logout functionality
- Row-level data access — each user only sees their own notes

## Pages

| File               | Purpose                          |
| ------------------ | --------------------------------- |
| `index.html`        | Sign up page                     |
| `notes-login.html`  | Login page                       |
| `notes.html`        | Notes dashboard (requires login) |

## Tech Stack

- HTML5
- Tailwind CSS (via CDN)
- JavaScript (vanilla, no framework)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript) (`@supabase/supabase-js@2`)
- Supabase Auth + Postgres Database

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ShahmeerAftab/Supabase-Notes-App.git
   ```
2. Create a project on [Supabase](https://supabase.com) and set up a `notes` table with at least these columns:
   - `id` (int8, primary key, auto-increment)
   - `user_id` (uuid, references auth.users)
   - `title` (text)
   - `content` (text)
3. In `app.js`, `login.js`, and `notes.js`, set your project's credentials:
   ```js
   const supabaseUrl = "https://YOUR_PROJECT_ID.supabase.co";
   const supabaseKey = "YOUR_PUBLISHABLE_OR_ANON_KEY";
   ```
4. Enable Row Level Security (RLS) on the `notes` table and add a policy so users can only access rows where `user_id = auth.uid()`.
5. Open `index.html` with a local server (e.g. VS Code Live Server) to sign up, then log in via `notes-login.html`.

## Project Structure

```
├── index.html          # Sign up page
├── notes-login.html    # Login page
├── notes.html           # Notes dashboard
├── app.js               # Signup logic
├── login.js             # Login logic
├── notes.js             # Notes CRUD + search + logout logic
└── .vscode/             # Editor settings (Live Server port)
```

## License

This project is for learning purposes.
