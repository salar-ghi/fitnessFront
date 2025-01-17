"use client";

import { useEffect, useRef } from 'react';

export function useResizeObserver(callback: (entry: ResizeObserverEntry) => void) {
  const targetRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer with debounced callback
    let rafId: number;
    observerRef.current = new ResizeObserver((entries) => {
      // Cancel previous rAF
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Schedule new callback
      rafId = requestAnimationFrame(() => {
        if (entries[0]) {
          callback(entries[0]);
        }
      });
    });

    // Start observing if we have a target
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    // Cleanup
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback]);

  return targetRef;
}