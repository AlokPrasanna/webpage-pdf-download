import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import '../Style/DownloadPdfAlignment.css';

function BodyDownload(props) {
  const contentRef = useRef();

  const handleDownload = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current , { useCORS: true}).then((canvas) => {
        const ImageData =canvas.toDataURL('image/png');
        const pdf = new jsPDF("p","pt","a4");
        pdf.addImage(ImageData,"JPGE",0,0);
        const Timestamp = new Date().toLocaleString().replace(/[/:]/g, '-');// here generate current time
        const FileName = `downloaded-document-${Timestamp}.pdf`;
        pdf.save(FileName);
      });
    }
  };

  return (
    <div>
      <div className='content' ref={contentRef}>{props.children}</div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
}

export default BodyDownload;
