"use client";

import WindowWrapper from "@/src/hoc/WindowWrapper";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import WindowsControls from "./WindowsControls";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function Resume() {
  const [numPages, setNumPages] = useState<number>(0);

  function onLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <>
      <div className="window-header">
        <WindowsControls target="resume" />
        <h2 className="font-bold text-sm text-center w-full">Resume</h2>

        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <Download className=" mx-auto transition duration-200 hover:scale-125" />
        </a>
      </div>

      <div className="h-[70vh] overflow-y-auto flex justify-center bg-neutral-900/30">
        <Document file="files/resume.pdf" onLoadSuccess={onLoadSuccess}>
          {Array.from(new Array(numPages), (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              renderTextLayer
              renderAnnotationLayer
              className="mb-4 shadow-lg"
            />
          ))}
        </Document>
      </div>
    </>
  );
}

const ResumeWindow = WindowWrapper({
  Component: Resume,
  windowKey: "resume",
});

export default ResumeWindow;
