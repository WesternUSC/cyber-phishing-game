
"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useZoom } from "./zoom-context";

type PageMagnifierProps = {
  children: React.ReactNode;
};

type Position = {
  x: number;
  y: number;
};

export default function PageMagnifier({
  children,
}: PageMagnifierProps) {
  const { zoom, setZoom, resetZoom } = useZoom();

  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [dragging, setDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);

  const dragStart = useRef({
    x: 0,
    y: 0,
    originX: 0,
    originY: 0,
    });

  const hasMoved = useRef(false);
  const dragThreshold = 5;

  const clampPosition = useCallback(
    (x: number, y: number): Position => {
      const viewport = viewportRef.current;

      if (!viewport || zoom <= 1) {
        return { x: 0, y: 0 };
      }

      const width = viewport.clientWidth;
      const height = viewport.clientHeight;

      const minX = width - width * zoom;
      const minY = height - height * zoom;

      return {
        x: Math.min(0, Math.max(minX, x)),
        y: Math.min(0, Math.max(minY, y)),
      };
    },
    [zoom]
  );

  useEffect(() => {
    setPosition((current) =>
      clampPosition(current.x, current.y)
    );
  }, [zoom, clampPosition]);

  
  function startDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (zoom <= 1 || e.button !== 0) return;

    // Allow interactive elements to receive normal clicks.
    const target = e.target as HTMLElement;

    if (
        target.closest(
        'button, a, input, textarea, select, label, [role="button"], [contenteditable="true"]'
        )
    ) {
        return;
    }

    dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        originX: position.x,
        originY: position.y,
    };

    hasMoved.current = false;
    setDragging(false);
  }

  function moveDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (zoom <= 1 || !e.buttons) return;

    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    if (!hasMoved.current) {
        if (
        Math.abs(deltaX) < dragThreshold &&
        Math.abs(deltaY) < dragThreshold
        ) {
        return;
        }

        hasMoved.current = true;
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    }

    const nextX = dragStart.current.originX + deltaX;
    const nextY = dragStart.current.originY + deltaY;

    setPosition(clampPosition(nextX, nextY));
  }

  function stopDrag() {
    hasMoved.current = false;
    setDragging(false);
  }

  function changeZoom(amount: number) {
    setZoom(Math.min(3, Math.max(1, zoom + amount)));
  }

  function reset() {
    resetZoom();
    setPosition({ x: 0, y: 0 });
    setDragging(false);
  }

  return (
    <div className="magnifier">
      <div
        ref={viewportRef}
        className={`magnifier-viewport ${
          zoom > 1 ? "is-zoomed" : ""
        }`}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={stopDrag}
      >
        <div
          className="magnifier-content"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
