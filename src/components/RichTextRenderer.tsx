'use client';

import { useEffect } from 'react';

export default function RichTextRenderer({ content }: { content: string }) {
  useEffect(() => {
    const container = document.getElementById('rich-text-content');
    if (!container) return;

    const scripts = container.getElementsByTagName('script');
    
    Array.from(scripts).forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      if (oldScript.parentNode) {
        oldScript.parentNode.replaceChild(newScript, oldScript);
      }
    });
  }, [content]);

  return (
    <div 
      id="rich-text-content" 
      className="prose prose-invert max-w-none prose-img:rounded-xl prose-p:text-slate-300 prose-p:leading-relaxed
      [&_a]:!text-blue-400 [&_a]:!underline hover:[&_a]:!text-blue-300"
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}