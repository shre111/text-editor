import { useState } from 'react'
import TiptapEditor from './components/TiptapEditor/TiptapEditor'
import './App.css'

function App() {
  const [editorContent, setEditorContent] = useState({
    json: null,
    html: ''
  })

  const handleEditorUpdate = ({ json, html }) => {
    setEditorContent({ json, html })
    localStorage.setItem('editorContent', JSON.stringify({ json, html }))
  }

  const savedContent = JSON.parse(localStorage.getItem('editorContent') || null)


  return (
    <div className="app">
      <p className='title'>Tiptap Rich Text Editor</p>
      <TiptapEditor 
        initialContent={savedContent?.json || {}}
        onUpdate={handleEditorUpdate}
      />
      
      <div className="content-preview">
        <p className='title'>Editor HTML Output</p>
        <pre style={{ border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px', padding: '10px' }}>{editorContent?.html || savedContent?.html}</pre>
      </div>
    </div>
  )
}

export default App
