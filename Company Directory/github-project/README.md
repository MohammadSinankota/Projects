# Companies Directory - Frontend Technical Assessment

A responsive React.js application built as a technical assessment for a frontend developer role. This project demonstrates modern frontend development practices with a focus on UI/UX, performance, and code quality.

## Technical Assessment Overview

This application showcases key frontend development skills including:
- Component-based architecture
- State management with React Hooks
- Responsive design principles
- User experience optimization
- Modern CSS techniques with Tailwind CSS
- Performance considerations

## Features Implemented

### Core Functionality
- **Company Directory**: Displays a list of companies in a responsive card layout
- **Search & Filter**: Real-time filtering by company name, industry, and location
- **Sorting**: Sort companies alphabetically (A-Z or Z-A)
- **Pagination**: Efficient pagination with 6 companies per page
- **Modal Details**: Interactive modal popups for detailed company information

### User Experience Enhancements
- **Auto-scroll**: Automatically scrolls to the first matching company during search
- **Visual Feedback**: Smooth animations and transitions for all interactions
- **Loading States**: Professional loading indicators during data fetching
- **Error Handling**: Graceful error handling with retry functionality
- **Responsive Design**: Fully responsive layout for all device sizes

### Technical Implementation
- **Modern React**: Functional components with hooks for state management
- **Performance Optimized**: Efficient rendering and minimal re-renders
- **Accessible UI**: Semantic HTML and proper focus management
- **Clean Code**: Well-structured, maintainable codebase

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The application will be available at `http://localhost:5175` (or next available port).

### Production Build
```bash
npm run build
```

## Project Structure
```
companies-directory/
├── src/
│   ├── components/
│   │   ├── CompanyCard.jsx     # Company card with modal details
│   │   ├── FilterBar.jsx       # Search and filter controls
│   │   └── Loader.jsx          # Loading state component
│   ├── pages/
│   │   └── Home.jsx            # Main application page
│   ├── data/
│   │   └── companies.json      # Static data source
│   ├── App.jsx                 # Root application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles and animations
├── package.json
└── README.md
```

## Technical Highlights

### Performance Considerations
- Optimized re-rendering with proper useEffect dependencies
- Efficient pagination to handle large datasets
- CSS animations for smooth user interactions
- Lazy loading techniques where applicable

### Code Quality
- Component-based architecture for reusability
- Consistent naming conventions and code style
- Proper error boundaries and fallbacks
- Well-documented code with clear separation of concerns

### UI/UX Focus
- Professional loading and error states
- Intuitive filtering and search functionality
- Responsive design for all screen sizes
- Accessible color contrast and keyboard navigation

## Technologies Used
- **React.js** (Functional Components with Hooks)
- **Tailwind CSS** for utility-first styling
- **Vite** for fast development and build tooling

## Assessment Criteria Alignment

This implementation addresses key areas evaluated in frontend technical assessments:
1. **Technical Proficiency: Modern React patterns and best practices
2. **UI/UX Skills**: Polished interface with attention to detail
3. **Problem Solving**: Efficient solutions for filtering, sorting, and pagination
4. **Code Quality**: Clean, maintainable, and well-structured code
5. **Performance**: Optimized rendering and responsive interactions"# Project" 
