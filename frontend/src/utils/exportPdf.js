import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToPdf(data, fileName) {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AlertBridge Breach Report", 14, 20);

    autoTable(doc, {
        startY: 30,
        head: [[
            "Company",
            "Sector",
            "Severity",
            "Date"
        ]],
        body: data.map(item => [
            item.company_name,
            item.sector,
            item.severity,
            item.breach_date
        ])
    });

    doc.save(`${fileName}.pdf`);

}