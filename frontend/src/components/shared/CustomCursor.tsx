'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0); const my = useRef(0);
  const ox = useRef(0); const oy = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX; my.current = e.clientY;
      if (innerRef.current) {
        innerRef.current.style.left = mx.current + 'px';
        innerRef.current.style.top = my.current + 'px';
      }
    };

    let frame: number;
    const animate = () => {
      ox.current += (mx.current - ox.current) * 0.12;
      oy.current += (my.current - oy.current) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = ox.current + 'px';
        outerRef.current.style.top = oy.current + 'px';
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    const onDown = () => document.body.classList.add('cursor-click');
    const onUp = () => document.body.classList.remove('cursor-click');

    // hover effect on all interactive elements
    const addHover = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    };
    addHover();

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        id="cursor-outer"
        style={{
          position: 'fixed', width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid rgba(124,58,237,0.6)',
          pointerEvents: 'none', zIndex: 9999,
          transform: 'translate(-50%,-50%)',
          transition: 'transform 0.15s ease, border-color 0.3s, background 0.3s',
        }}
      />
      <div
        ref={innerRef}
        id="cursor-inner"
        style={{
          position: 'fixed', width: 6, height: 6, borderRadius: '50%',
          background: 'var(--violet)',
          pointerEvents: 'none', zIndex: 9999,
          transform: 'translate(-50%,-50%)',
          boxShadow: '0 0 10px var(--violet)',
          transition: 'width 0.2s, height 0.2s, background 0.2s',
        }}
      />
      <style>{`
        body.cursor-hover #cursor-outer {
          transform: translate(-50%,-50%) scale(1.6);
          border-color: rgba(124,58,237,0.9);
          background: rgba(124,58,237,0.08);
        }
        body.cursor-hover #cursor-inner {
          width: 4px; height: 4px;
          background: var(--cyan);
          box-shadow: 0 0 10px var(--cyan);
        }
        body.cursor-click #cursor-outer {
          transform: translate(-50%,-50%) scale(0.82);
        }
      `}</style>
    </>
  );
}
