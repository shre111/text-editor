# Tiptap Rich Text Editor

A modern, customizable rich text editor implementation using Tiptap and React. This project demonstrates a full-featured text editor with real-time formatting, content persistence, and custom extensions.

## Features

- 📝 Rich Text Formatting
  - Bold, Italic, Underline
  - Headings (H1, H2)
  - Bullet and Numbered Lists
- 🎨 Custom Callout Block Extension
- ⌨️ Keyboard Shortcuts
- 💾 Content Persistence (localStorage)
- 🎯 Real-time Preview
- 🖌️ Modern Glass-morphism UI Design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/shre111/text-editor.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Implementation Details

### Technical Stack
- React (v19)
- Tiptap Editor
- Vite (for build and development)

### Architecture Decisions

1. **Component Structure**
   - Separate TiptapEditor component for reusability
   - Clean separation of styling and logic

2. **State Management**
   - Used React's useState for local state management
   - Implemented content persistence using localStorage
   - Real-time HTML preview updates

3. **Styling Approach**
   - Modular CSS for component-specific styles
   - Glass-morphism design for modern UI
   - Responsive layout using calc() for width calculations

### Trade-offs and Decisions

1. **Storage Solution**
   - Used localStorage for simplicity
   - Trade-off: Limited storage space but no backend required
   - Can be easily extended to use backend storage

2. **Custom Extension**
   - Implemented Callout block for demonstration
   - Trade-off: Kept it simple for clarity vs. adding more complex features

3. **UI/UX Decisions**
   - Glass-morphism design for modern look
   - Floating toolbar for better accessibility
   - Real-time HTML preview for immediate feedback
