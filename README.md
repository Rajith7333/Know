# Interactive Portfolio

A stunning, interactive portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. This portfolio showcases modern web development skills with smooth animations, responsive design, and exceptional user experience.

## ✨ Features

- **🎨 Modern Design**: Clean, minimalist aesthetic with dark/light theme support
- **🎬 Smooth Animations**: Powered by Framer Motion with scroll-triggered animations
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop
- **🚀 Performance**: Optimized for 60fps animations and fast loading
- **♿ Accessibility**: Reduced motion support and keyboard navigation
- **🔧 Interactive Elements**: 3D hover effects, particle systems, and micro-interactions

## 🛠 Technologies

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Know

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Check TypeScript types
```

## 📱 Sections

- **Hero**: Animated text reveal, particle system, 3D interactions
- **About**: Parallax effects, timeline animations, experience showcase
- **Skills**: 3D hover cards, interactive filtering, proficiency indicators
- **Projects**: Carousel with modal overlays, smooth transitions
- **Contact**: Animated form with validation, social links

## 🎯 Key Features

### Interactive Elements
- Mouse-tracking particle system
- 3D card rotations on hover
- Smooth scroll animations
- Theme toggle with persistence
- Form validation with animations

### Performance Optimizations
- GPU-accelerated animations
- Lazy loading components
- Image optimization
- Code splitting
- Reduced motion support

### Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Adaptive layouts
- Optimized animations per device

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── sections/     # Page sections
│   │   └── animations/   # Animation utilities
│   ├── lib/              # Utility functions and configurations
│   ├── types/            # TypeScript type definitions
│   └── data/             # Static data (projects, skills, etc.)
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎨 Customization

### Personal Information
Edit `src/data/about.ts` to update:
- Personal details
- Social links
- Experience and education

### Projects & Skills
Edit files in `src/data/`:
- `projects.ts` - Portfolio projects
- `skills.ts` - Skills and technologies

### Styling
- Tailwind configuration: `tailwind.config.js`
- Custom animations: `src/lib/animations.ts`
- Global styles: `src/app/globals.css`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

Built with ❤️ and [Next.js](https://nextjs.org/)