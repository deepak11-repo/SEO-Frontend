import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import ReportComponent from '../ReportComponent/ReportComponent';
import { FaDownload } from 'react-icons/fa';

const PDFComponent = () => {
  
  const handleDownloadPDF = () => {
    const input1 = document.getElementById('page-1');
    const input2 = document.getElementById('page-2');
    const input3 = document.getElementById('page-3');
    const input4 = document.getElementById('page-4');
    const input5 = document.getElementById('page-5');

    const pdf = new jsPDF('p', 'mm', 'a4'); // Use 'mm' to match canvas and PDF dimensions

    html2canvas(input1, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = 210; // A4 width in mm
        let pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        html2canvas(input2, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            html2canvas(input3, { scale: 2 }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                html2canvas(input4, { scale: 2 }).then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                    html2canvas(input5, { scale: 2 }).then((canvas) => {
                        const imgData = canvas.toDataURL('image/png');
                        pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                        pdf.save('SEO_Audit_Report.pdf');
                    }).catch((error) => {
                        console.error('Error generating PDF (Page 5):', error);
                    });

                }).catch((error) => {
                    console.error('Error generating PDF (Page 4):', error);
                });

            }).catch((error) => {
                console.error('Error generating PDF (Page 3):', error);
            });

        }).catch((error) => {
            console.error('Error generating PDF (Page 2):', error);
        });

    }).catch((error) => {
        console.error('Error generating PDF (Page 1):', error);
    });
  };

  return (
    <div>
        <div className="flex justify-start mb-4 pl-[65px] pt-5">
            <button 
                onClick={handleDownloadPDF} 
                className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-2xl hover:bg-blue-600 transition duration-300 ease-in-out"
            >
                <FaDownload className="mr-2" />
                Download PDF
            </button>
        </div>
        <div id="pdf-content" className="m-2 p-2 flex flex-col items-center">
            <ReportComponent />
        </div>
    </div>
  )
}

export default PDFComponent