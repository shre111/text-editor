import { useEditor, EditorContent } from '@tiptap/react'
import { Node } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { useCallback, useEffect, useRef } from 'react'
import './TiptapEditor.css'

const CalloutNode = Node.create({
  name: 'callout',
  group: 'block',
  content: 'inline*',
  defining: true,

  addAttributes() {
    return {
      type: {
        default: 'info'
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[class*="callout"]'
      }
    ]
  },

  renderHTML({ node }) {
    return ['div', { class: `callout callout-${node.attrs.type}` }, 0]
  }
})

// eslint-disable-next-line react/prop-types
const TiptapEditor = ({ initialContent, onUpdate }) => {
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      CalloutNode,
    ],
    content: initialContent || '',
    autofocus: true,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      const html = editor.getHTML()
      onUpdate?.({ json, html })

      // Update placeholder visibility
      const editorElement = editorRef.current?.querySelector('.ProseMirror');
      if (editorElement) {
        if (editor.isEmpty) {
          editorElement.setAttribute('data-placeholder', 'Write something amazing...');
        } else {
          editorElement.removeAttribute('data-placeholder');
        }
      }
    }
  })

  useEffect(() => {
    // Set initial placeholder
    const editorElement = editorRef.current?.querySelector('.ProseMirror');
    if (editorElement && editor?.isEmpty) {
      editorElement.setAttribute('data-placeholder', 'Write something amazing...');
    }
  }, [editor]);

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run()
  }, [editor])

  const toggleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run()
  }, [editor])

  const toggleUnderline = useCallback(() => {
    editor?.chain().focus().toggleUnderline().run()
  }, [editor])

  const toggleHeading = useCallback((level) => {
    editor?.chain().focus().toggleHeading({ level }).run()
  }, [editor])

  const toggleBulletList = useCallback(() => {
    editor?.chain().focus().toggleBulletList().run()
  }, [editor])

  const toggleOrderedList = useCallback(() => {
    editor?.chain().focus().toggleOrderedList().run()
  }, [editor])

  const toggleCallout = useCallback(() => {
    editor?.chain().focus().toggleNode('callout', 'paragraph').run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button
          onClick={toggleBold}
          className={editor.isActive('bold') ? 'is-active' : 'in-active'}
          title="Bold (Ctrl+B)"
        >
          B
        </button>
        <button
          onClick={toggleItalic}
          className={editor.isActive('italic') ? 'is-active' : 'in-active'}
          title="Italic (Ctrl+I)"
        >
          I
        </button>
        <button
          onClick={toggleUnderline}
          className={editor.isActive('underline') ? 'is-active' : 'in-active'}
          title="Underline (Ctrl+U)"
        >
          U
        </button>
        <button
          onClick={() => toggleHeading(1)}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : 'in-active'}
        >
          H1
        </button>
        <button
          onClick={() => toggleHeading(2)}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : 'in-active'}
        >
          H2
        </button>
        <button
          onClick={toggleBulletList}
          className={editor.isActive('bulletList') ? 'is-active' : 'in-active'}
        >
          • List
        </button>
        <button
          onClick={toggleOrderedList}
          className={editor.isActive('orderedList') ? 'is-active' : 'in-active'}
        >
          1. List
        </button>
        <button
          onClick={toggleCallout}
          className={editor.isActive('callout') ? 'is-active' : 'in-active'}
        >
          Callout
        </button>
      </div>
      <div style={{ marginTop: '10px', width: 'calc(100% - 50px)', margin: 'auto' }} ref={editorRef}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default TiptapEditor
