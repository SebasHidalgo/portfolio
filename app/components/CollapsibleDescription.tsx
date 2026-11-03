import { useState, useRef, useEffect } from "react";

interface CollapsibleDescriptionProps {
  text: string;
  maxChars?: number;
}

export default function CollapsibleDescription({
  text,
  maxChars = 150,
}: CollapsibleDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  const isLong = text.length > maxChars;
  const previewText = text.slice(0, maxChars) + (isLong ? "..." : "");

  useEffect(() => {
    if (contentRef.current) {
      if (expanded) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        const scrollHeight = contentRef.current.scrollHeight;
        setMaxHeight(`${scrollHeight}px`);
        requestAnimationFrame(() => {
          setMaxHeight("4.2em");
        });
      }
    }
  }, [expanded]);

  return (
    <div className="mt-3 max-w-[62ch]">
      <div
        ref={contentRef}
        className="overflow-hidden text-[0.9375rem] leading-[1.7] text-ink-2 transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight }}
      >
        {expanded || !isLong ? text : previewText}
      </div>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="link mt-2 text-sm font-medium"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
