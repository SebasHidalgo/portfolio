import { useState, useRef, useEffect } from "react";

interface CollapsibleDescriptionProps {
  text: string;
  maxChars?: number;
}

export default function CollapsibleDescription({ text, maxChars = 150 }: CollapsibleDescriptionProps) {
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
    <div className="mb-4">
      <div
        ref={contentRef}
        className="text-[0.875rem] text-muted leading-[1.7] overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight }}
      >
        {expanded || !isLong ? text : previewText}
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-blue-500 hover:underline text-[0.85rem]"
        >
          {expanded ? "Leer menos" : "Leer más"}
        </button>
      )}
    </div>
  );
}
