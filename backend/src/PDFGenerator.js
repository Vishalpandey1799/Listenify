import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { flattenGeminiMermaid } from './Utils/Convertomermaid.js';
import { uploadLocalFile } from './Utils/Audiourl.js';

 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateHTML = (mapped) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Listenify PDF</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px 40px;
        line-height: 1.6;
      }
      .qa {
        margin-bottom: 30px;
        page-break-inside: avoid;
      }
      .question {
        font-weight: bold;
        margin-bottom: 8px;
        font-size: 16px;
      }
      .answer {
        font-size: 14px;
          page-break-inside: avoid;
      }
      .answer img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 10px auto;
        page-break-inside: avoid;
      }
      .question-number {
        display: inline-block;
        margin-right: 8px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    ${mapped
      .map(
        (item, index) => `
      <div class="qa">
        <div class="question">
          <span class="question-number">${index + 1}.</span>
          ${item.question}
        </div>
        <div class="answer">
          ${
            item.answer.startsWith('https://mermaid.ink/')
              ? `<img src="${item.answer}" alt="Diagram" style="max-height: 600px; object-fit: contain;" />`
              : item.answer
          }
        </div>
      </div>
    `
      )
      .join('\n')}
  </body>
</html>
`;

export const generatePdf = async (questions = []) => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox' 

     ,'--disable-setuid-sandbox'
  ] });
  const page = await browser.newPage();

  const mapped = questions.map((item) => {
    if (item?.answer.includes('subgraph')) {
      item.answer = flattenGeminiMermaid(item.answer);
    }
    return item;
  });

  const htmlContent = generateHTML(mapped);
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(__dirname, `${Date.now()}.pdf`);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    }
  });

  await browser.close();
  

  let url = await uploadLocalFile(pdfPath);
  return {
    pdfPath,
    mapped,
    url
  };
};