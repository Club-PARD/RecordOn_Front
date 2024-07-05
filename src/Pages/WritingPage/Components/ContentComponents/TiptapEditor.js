import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true, // 링크를 클릭하면 새 창에서 열도록 설정
      }),
    ],
    content: '<p>해당 기록에 대한 참고자료 URL 링크를 임베드해보세요.</p>',
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const handleKeyDown = (event) => {
      // Ctrl + K를 누르면 링크 추가
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        const url = prompt('Enter the URL'); // URL을 입력받는 프롬프트
        if (url) {
          editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup 이벤트 리스너
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);

  return <EditorContent editor={editor} />;
};

export default TiptapEditor;
