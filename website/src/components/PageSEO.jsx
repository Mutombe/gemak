import React from 'react';
import { useEffect } from 'react';

export default function PageSEO({ title, description, keywords }) {
  useEffect(() => {
    document.title = title ? `${title} — Gemak Security Shop` : 'Gemak Security Shop — Harnessing Technology For Your Convenience';
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) metaDesc.setAttribute('content', description);
    
    const metaKeys = document.querySelector('meta[name="keywords"]');
    if (metaKeys && keywords) metaKeys.setAttribute('content', keywords);
  }, [title, description, keywords]);

  return null;
}
