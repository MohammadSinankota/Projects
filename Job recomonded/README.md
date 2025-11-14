# AI Job Recommendation & Tracker Web App

A fully responsive Vue.js application that demonstrates AI awareness, complex data handling, interactive UI, and modern frontend design to impress recruiters.

## Features

### 1. User Input Form
- Input skills, experience, preferred locations, and job type
- Real-time validation using Vue reactivity
- LocalStorage persistence for future sessions

### 2. AI-Powered Job Recommendations
- Mock AI API to generate ranked job recommendations
- Job cards with title, company, location, required skills, and ranking score
- "Regenerate Recommendations" button for new AI suggestions

### 3. Job List Display
- Modern card layout for job listings
- Live search, filtering by skills/location/job type, and pagination
- Hover animations for enhanced interactivity

### 4. Favorites / Saved Jobs
- Mark jobs as favorites
- LocalStorage persistence for saved jobs
- Separate tab to view saved jobs

### 5. Analytics Dashboard
- Charts and insights using Chart.js:
  - Most applied jobs
  - Top tech skills across recommended jobs
  - Number of jobs saved or applied

### 6. Responsive UI / Modern Design
- Mobile-first layout using CSS Grid and Flexbox
- Light/Dark theme toggle
- Smooth transitions and hover effects
- Clear typography and card hierarchy

### 7. Optional Advanced Features
- Drag & drop skill prioritization (planned)
- Notifications for new recommended jobs (planned)
- Export saved jobs to CSV

## Technical Implementation

- **Vue.js 3** with Options API
- **Vite** for fast development and build tooling
- **Chart.js** with vue-chartjs for data visualization
- **LocalStorage** for client-side data persistence
- **Responsive Design** with CSS Grid and Flexbox
- **Modern UI/UX** with smooth animations and transitions

## Project Structure

```
src/
├── components/
│   ├── UserProfile.vue
│   ├── JobRecommendations.vue
│   ├── SavedJobs.vue
│   └── AnalyticsDashboard.vue
├── assets/
│   └── styles.css
├── App.vue
└── main.js
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Dependencies

- vue: ^3.4.0
- chart.js: ^4.4.0
- vue-chartjs: ^5.3.0
- @vitejs/plugin-vue: ^5.0.0
- vite: ^5.0.0

## Screenshots

### User Profile
![User Profile](screenshots/profile.png)

### Job Recommendations
![Job Recommendations](screenshots/recommendations.png)

### Saved Jobs
![Saved Jobs](screenshots/saved-jobs.png)

### Analytics Dashboard
![Analytics Dashboard](screenshots/analytics.png)

## Future Enhancements

- Integration with external job APIs (LinkedIn, Indeed, etc.)
- Drag & drop skill prioritization to influence AI ranking
- Notifications for new recommended jobs
- Advanced filtering and sorting options
- User authentication and cloud storage

## License

This project is licensed under the MIT License.