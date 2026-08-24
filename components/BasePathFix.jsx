'use client';

import { useEffect } from 'react';

const BASE_PATH = '/cafe-pachmarhi';

function fixLinks(root = document) {
  root.querySelectorAll?.('a[href^="/"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!href || href === BASE_PATH || href.startsWith(`${BASE_PATH}/`)) return;
    anchor.setAttribute('href', `${BASE_PATH}${href}`);
  });
}

export default function BasePathFix() {
  useEffect(() => {
    if (!window.location.hostname.endsWith('github.io')) return undefined;

    fixLinks(document);
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.matches?.('a[href^="/"]')) fixLinks(node.parentElement || document);
            else fixLinks(node);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
