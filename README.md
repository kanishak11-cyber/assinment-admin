# Admin Dashboard

## Description

This project involves building an admin interface for viewing and deleting users. The user data is provided via an API. The UI should have the following features:

1. **Column Titles Standout:** Column titles should stand out from the entries.
2. **Search Bar:** Include a search bar that can filter on any property.
3. **Edit and Delete Rows:** Ability to edit or delete rows in place (in-memory only).
4. **Pagination:** Implement pagination with each page containing 10 rows. Pagination should update based on search/filtering.
5. **Row Selection:** Ability to select one or more rows. Selected rows should have a grayish background. Multiple selected rows can be deleted at once.
6. **Select/Deselect All:** Checkbox on the top left for selecting or deselecting all displayed rows on the current page.
7. **Search Box Placeholder:** Search box placeholder text should start with "Search."
8. **Search Icon/Button:** Search icon/button with class `search-icon` or trigger search on ENTER.
9. **Action Elements:** Action elements (edit, delete, save) must be buttons with specific class names.
10. **Navigation Elements:** Navigation elements (first page, previous page, next page, last page) should be buttons or divs with specific class names.
11. **Inline Editing:** Clicking the edit action in a row should make it editable in the row itself.
12. **Libraries:** Feel free to use any libraries.
13. **Deployment:** The application should run successfully when deployed on Vercel, Netlify, or a similar platform.
14. **Submission:** After deployment, submit [here](https://forms.gle/XAhSahQMFBayF6gq7).

**Note**: Users are sorted by the `id` field; no alphabetical sorting.

## Project Setup

### Prerequisites

- Node.js installed
- NPM or Yarn installed

### Clone Repository

```bash
git clone https://github.com/your-username/admin-dashboard.git
cd admin-dashboard

Install Dependencies
Using NPM:
npm install or npm i
```

### Run Project

```bash
npm run dev or yarn dev

Open your browser and go to http://localhost:3000 to view the application.
```
### API ENDPOINT
```bash
https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json
```




