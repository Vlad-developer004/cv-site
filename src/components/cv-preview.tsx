'use client';

import { useRef, useState, type ReactNode } from 'react';

const PREVIEW_WIDTH = 260;

type Status = 'idle' | 'loading' | 'ready' | 'error';

export function CvPreview({
  href,
  children,
  className = 'inline-block',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);

  async function handleEnter() {
    if (startedRef.current) return;
    startedRef.current = true;
    setStatus('loading');
    try {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href;

      const doc = await pdfjs.getDocument({ url: href }).promise;
      const page = await doc.getPage(1);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = (PREVIEW_WIDTH / baseViewport.width) * 2;
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');
      if (!context) return;

      await page.render({ canvasContext: context, viewport, canvas }).promise;
      setStatus('ready');
    } catch {
      startedRef.current = false;
      setStatus('error');
    }
  }

  return (
    <div className={`group relative ${className}`} onMouseEnter={handleEnter}>
      {children}

      {status !== 'error' && (
        <div className="glass pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden w-fit -translate-x-1/2 overflow-hidden rounded-xl p-1.5 opacity-0 shadow-xl group-hover:block group-hover:animate-[fade-up_0.15s_ease-out_forwards]">
          {status !== 'ready' && (
            <div className="flex h-70 w-52 items-center justify-center">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
          <canvas
            ref={canvasRef}
            style={{ width: PREVIEW_WIDTH }}
            className={`rounded-lg ${status === 'ready' ? 'block' : 'hidden'}`}
          />
        </div>
      )}
    </div>
  );
}
