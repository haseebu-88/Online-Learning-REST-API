# Online Learning REST API — Express.js Modular MVC

**Complete classroom project** with JWT Authentication, Category CRUD, Course CRUD, persistent JSON storage, validation (400), and Route Not Found (404).

> The assignment text does NOT require a particular database. This demo uses a local JSON file stored in `data/db.json`. If your teacher later specifies MongoDB or MySQL, adapt the models before submitting.

## EASIEST SETUP (Windows: one click)

1. **Extract** `Online-Learning-REST-API-Ready.zip` (right-click → Extract All). Do **not** try to run files while still inside the ZIP.
2. Double-click **`START_HERE.bat`** inside the extracted folder. This installs dependencies, creates a private `.env`, and starts the API. Windows might show a warning because it is a local script; inspect the file if you wish and run it only if you trust its contents.
3. **Keep the black terminal window open.** Browse to `http://localhost:5000/` to verify the API.
4. In **Postman**, select **Import → Files** and open `postman/Online-Learning-API.postman_collection.json`.
5. In the imported collection, run numbered requests in order: **Register → Login → Create Category → Get Categories → Missing Name → Unknown URL**. Click **Send** for each, capture real screenshots. Login automatically stores your JWT token and Create Category stores its ID. The Register example uses a fresh email on each run.
6. Afterwards you may test the optional Course CRUD and remaining Category CRUD requests. They are provided in the same collection.
7. Put screenshots in `screenshots/`, upload the project to **GitHub**, add your name/roll number on evidence printouts, and submit the printouts next lecture.

If you prefer VS Code Terminal instead of double-clicking, open the extracted folder and run `npm.cmd install`, then `node scripts/init-env.js`, then `node server.js`.

> Note: The starter script is for Windows. Node.js must be installed; Postman and GitHub login are separate.

## HTTP endpoints

| Method | Endpoint | Expected successful status |
| --- | --- | --- |
| POST | `/api/auth/register` | 201 |
| POST | `/api/auth/login` | 200 |
| POST | `/api/categories` | 201 (requires bearer token) |
| GET | `/api/categories` | 200 |
| GET | `/api/categories/:id` | 200 or 404 |
| PUT | `/api/categories/:id` | 200 (requires bearer token) |
| DELETE | `/api/categories/:id` | 200 (requires bearer token) |
| POST | `/api/courses` | 201 (requires bearer token) |
| GET | `/api/courses` | 200 |
| GET | `/api/courses/:id` | 200 or 404 |
| PUT | `/api/courses/:id` | 200 (requires bearer token) |
| DELETE | `/api/courses/:id` | 200 (requires bearer token) |

## Evidence PDF: exactly five required cases

- **Page 1:** Successful **Register 201** + **Login 200** (two screenshots on one page)
- **Page 2:** POST `/api/categories` **201 Created**
- **Page 3:** GET `/api/categories` **200 OK**
- **Page 4:** POST `/api/categories` missing `name` **400 Bad Request**
- **Page 5:** GET `/api/unknown` **404 Route Not Found**

**Important:** Capture authentic screenshots from **your own Postman window**, not mock screenshots. Each screenshot must show: HTTP method, full URL, the **Headers tab** and relevant headers (including Authorization for protected requests), response **status code**, and JSON **body** at the bottom. Maximize the window/resize panels if necessary.

On top of **every printed page**, type your **actual Name and Roll Number / ID** before exporting to PDF or printing. Save the screenshot images to `screenshots/` before GitHub upload. Print evidence pages for next class.

## GitHub upload

You can use VS Code Source Control / Publish to GitHub, or the commands below after creating a new empty GitHub repository:

```
git init
git add .
git commit -m "REST API assignment complete"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Online-Learning-REST-API.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub account. Commit again after adding screenshots:

```
git add screenshots
git commit -m "Add real Postman evidence screenshots"
git push
```

**Do not upload** `.env`, `node_modules`, or `data/db.json`. `.gitignore` prevents them being added normally. If already tracked, untrack them manually.

## Folder organization

- `server.js`: Express app and central error handling
- `routes/`: route definitions for auth/categories/courses
- `controllers/`: input validation and response logic
- `models/`: stored data operations (`db.js` persists to local JSON)
- `middleware/`: JWT authentication for creating/editing/deleting
- `postman/`: ready-to-import Postman collection
- `screenshots/`: put YOUR Postman evidence here

### Notes for testing

- If Register gives **409 Conflict**, re-send the Register request (it generates a fresh demo email each time).
- If Category creation gives **401 Unauthorized**, Login first. Login saves the token in the Postman collection.
- If Category creation gives **409 Conflict**, use a new category name.
- Courses need a valid `categoryId`. The sample Postman collection copies it from Create Category.
- To re-run the entire demo with a clean database, stop the server and delete **your local** `data/db.json`, then restart.
- This local JSON design is intended for a single-user classroom demo, not production use.
