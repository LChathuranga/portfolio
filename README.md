# 3D Interactive Portfolio

An immersive 3D portfolio website built with Next.js and Three.js, featuring game-like navigation and interactive elements.

## Features

- 🎮 **Game-like Controls**: WASD movement and mouse look navigation
- 🌌 **3D Environment**: Immersive 3D space with floating portfolio objects
- ✨ **Particle Effects**: Dynamic particle system for enhanced visual appeal
- 🎯 **Interactive Objects**: Click on floating cubes to explore portfolio items
- 🎨 **Modern Design**: Sleek UI with glassmorphism effects
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **Next.js Powered**: Fast performance with server-side rendering

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Controls

- **WASD**: Move around the 3D space
- **Mouse**: Look around (click to enable pointer lock)
- **Click**: Interact with floating objects
- **ESC**: Release mouse pointer lock

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Main page
├── components/
│   └── Portfolio3D.tsx     # Main 3D component
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Customization

### Adding Portfolio Items

Edit the `portfolioData` array in `components/Portfolio3D.tsx`:

```typescript
const portfolioData: PortfolioData[] = [
  {
    title: "Your Project",
    description: "Project description...",
    technologies: ["React", "Node.js", "etc"],
    link: "https://your-project.com" // optional
  },
  // Add more items...
]
```

### Styling

- Global styles: `app/globals.css`
- Component-specific styles: Inline styles in `Portfolio3D.tsx`
- Colors and effects can be customized in the Three.js materials

### 3D Scene Customization

Key areas to modify in `Portfolio3D.tsx`:

- **Camera position**: Modify `camera.position.set(0, 5, 20)`
- **Lighting**: Adjust `directionalLight` and `ambientLight` settings
- **Particle count**: Change `particleCount` variable
- **Object positioning**: Modify the positioning logic in `createPortfolioObjects()`

## Technologies Used

- **Next.js 14**: React framework with App Router
- **Three.js**: 3D graphics library
- **TypeScript**: Type-safe JavaScript
- **React 18**: UI library with hooks

## Performance Tips

- The application uses requestAnimationFrame for smooth animations
- Particle count can be reduced for better performance on low-end devices
- Consider adding LOD (Level of Detail) for complex 3D models

## Browser Compatibility

- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+

Requires WebGL support for 3D rendering.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] VR/AR support
- [ ] More interactive elements
- [ ] Sound effects
- [ ] Loading progress indicator
- [ ] Mobile touch controls optimization
- [ ] Portfolio item categories/filtering
- [ ] Animated text effects
- [ ] Skybox environments
