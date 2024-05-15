'use client';

import dynamic from 'next/dynamic'
// const DynmicEditor = dynamic(() => import('../../components/Editor').then(a => a.EditorWithStore), {
//   ssr: false,
// })

const DynmicEditorNew = dynamic(() => import('../../components/EditorNew').then(a => a.EditorWithStore), {
  ssr: false,
})

function EditorPage() {
  return (
      <DynmicEditorNew />
  );
}

EditorPage.diplsayName = "EditorPage";

export default EditorPage;
