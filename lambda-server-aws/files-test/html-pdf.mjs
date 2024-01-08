import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import pdf from 'html-pdf';

AWS.config.update({
  accessKeyId: 'AKIAQYCHAA5W3572GZEL', //process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: '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', //process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export const handleReplySESUploadToS3 = async (event) => {
  try {
    if (!event?.Records && !Array.isArray(event?.Records)) {
      return 'Payload inválido';
    }

    const response = event?.Records[0]?.ses?.mail;

    if (!response) {
      return 'Nenhum e-mail encontrado';
    }

    const fromAddress = response?.source;
    const toAddresses = response?.destination;
    const subject = response?.commonHeaders?.subject;
    const body = response?.content;

    const htmlContent = `
      <style>
        body {
          margin: 3cm 2cm 2cm 3cm;
          font-family: Calibri, sans-serif;
          font-size: 14px;
        }
        h1 {}
        p {}
        .email-info {}
        .email-info-item {
          display: block;
        }
      </style>

      <hr/>
      <div class="email-info">
        <span class="email-info-item"><b>De:</b> ${fromAddress}</span>
        <span class="email-info-item"><b>Enviado:</b> segunda-feira, 17 de julho de 2023 19:12</span>
        <span class="email-info-item"><b>Para:</b> ${toAddresses}</span>
        <span class="email-info-item"><b>CC:</b> ${toAddresses}</span>
        <span class="email-info-item"><b>Assunto:</b> ${subject}</span>
      </div>
      <p>${JSON.stringify(event)}</p>
    `;

    const options = { format: 'A4' }; // Defina o formato do PDF, ex: 'A4', 'Letter', etc.

    const pdfBytes = await new Promise((resolve, reject) => {
      pdf
      .create(htmlContent, options)
      .toBuffer((error, buffer) => {
        if (error) reject(error);
        resolve(buffer);
      });

      //save local
      // pdf
      // .create(htmlContent, options)
      // .toFile('tmp/output.pdf', (error, res) => {
      //   if (error) throw error;
      // });
    });

    // Salvar o arquivo PDF no Amazon S3
    const bucketName = 'buckets3ses';
    const filename = `resposta_${uuid()}.pdf`;

    const params = {
      Bucket: bucketName,
      Key: filename,
      Body: pdfBytes,
    };

    await s3.upload(params).promise();

    return `Arquivo PDF salvo em: s3://${bucketName}/${filename}`;
  } catch (error) {
    throw error;
  }
};
