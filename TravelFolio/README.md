# Travelfolio - Vue.js Travel Agency Website

A modern, responsive travel agency website built with Vue.js 3, featuring destinations, packages, blog, and user authentication.

## Features

- 🏠 **Home Page** - Hero section, featured destinations, popular packages, testimonials
- 📍 **Destinations** - Interactive gallery with filtering options
- 🎒 **Packages** - Categorized tour packages with detailed itineraries
- 🧭 **About Us** - Company history, mission, team, and awards
- 💬 **Testimonials** - User reviews with ratings
- 📝 **Blog** - Travel articles with comments and categories
- 📞 **Contact** - Contact form with map integration
- 💳 **Booking System** - Package booking functionality
- 🧑‍💼 **User Authentication** - Login and registration system
- 🌗 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 🌐 **Multi-Language** - Language selector with browser detection
- 🎨 **Responsive Design** - Mobile-first approach with modern UI
- ⚙️ **SEO Optimized** - Meta tags and structured data

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Declarative routing for Vue.js
- **TypeScript** - Typed superset of JavaScript
- **Vite** - Next generation frontend tooling
- **CSS3** - Modern styling with Flexbox and Grid
- **Font Awesome** - Icon library

## Project Setup

### Prerequisites

- Node.js (version 16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd travelfolio-vue

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Production

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── assets/           # Static assets (images, styles)
├── components/       # Reusable Vue components
├── router/           # Vue Router configuration
├── views/            # Page components
├── App.vue           # Root component
└── main.js           # Application entry point
```

## Components

### Views
- `HomeView.vue` - Homepage with hero section and featured content
- `DestinationsView.vue` - Destination gallery with filtering
- `DestinationDetails.vue` - Individual destination page
- `PackagesView.vue` - Tour packages with sorting options
- `PackageDetails.vue` - Detailed package information
- `AboutView.vue` - Company information and team
- `BlogView.vue` - Blog listing with categories
- `BlogPost.vue` - Individual blog post with comments
- `ContactView.vue` - Contact form and information
- `LoginView.vue` - User login page
- `RegisterView.vue` - User registration page

### Components
- `Header.vue` - Navigation header with theme toggle
- `Footer.vue` - Site footer with links and information
- `BackToTop.vue` - Scroll-to-top button

## Features Implementation

### Dark/Light Mode
- Toggle between themes using the button in the header
- Theme preference saved in localStorage
- Respects OS preference by default

### Multi-Language Support
- Language selector in the header
- Language preference saved in localStorage
- Auto-detects browser language

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly navigation

### Performance Optimizations
- Lazy loading images
- Code splitting with dynamic imports
- Efficient Vue reactivity

## Customization

### Colors
The color palette can be customized in `src/assets/main.css`:

- Primary: `#2563eb` (Blue)
- Secondary: `#0ea5e9` (Sky Blue)
- Accent: `#f97316` (Orange)
- Background: `#ffffff` (White)
- Text: `#333333` (Dark Gray)

### Fonts
The project uses Google Fonts:
- **Poppins** - Main font family

## Development Guidelines

### Adding New Pages
1. Create a new Vue component in the `views/` directory
2. Add a new route in `src/router/index.ts`
3. Add navigation link in `src/components/Header.vue`

### Adding New Components
1. Create a new Vue component in the `components/` directory
2. Import and use in the relevant view or component

### Styling
- Use scoped CSS for component-specific styles
- Follow the existing color and spacing variables
- Maintain consistency with the design system

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Font Awesome](https://fontawesome.com/)
- [Unsplash](https://unsplash.com/) for images
- [Random User Generator](https://randomuser.me/) for avatars