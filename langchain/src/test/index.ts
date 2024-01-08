import "dotenv/config";
import fs from 'node:fs';
import { OpenAI } from "langchain/llms/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import pdf from 'pdf-parse';

const load = async () => {
  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const promptAsString = "Human: Tell me a short joke about ice cream";
  
  const response = await model.invoke(promptAsString);
  console.log(response);
};

const writeTextIntoTxtFile = async ({ content }: any) => {
  fs.writeFile('src/docs/output.txt', content, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
};

const loadPdf = async () => {
  const loader = new PDFLoader("src/docs/doc01.pdf", {
    parsedItemSeparator: "",
    splitPages: true,
  });

  const pdfDocs = await loader.load();

  console.log(pdfDocs);

  return pdfDocs;
};

const convertPdfToText = async ({ docs }: any) => {
  const pageContent = docs.map((doc: any) => doc.pageContent);
  const text = pageContent.join("\n\n");

  return text;
}

const pdfParseToTxt = async () => {
  const dataBuffer = fs.readFileSync('src/docs/doc01.pdf');
  const pdf2 = await pdf(dataBuffer);

  console.log(pdf2)
}

const main = async () => {  
  // const pdf = await loadPdf();
  // const text = await convertPdfToText(pdf);
  // writeTextIntoTxtFile(text);

  pdfParseToTxt();
} 

main();
