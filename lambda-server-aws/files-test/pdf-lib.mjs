import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

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

    // Gerar um arquivo PDF usando a biblioteca pdf-lib
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const y = page.getSize().height - 50; // Posição inicial do texto

    page.drawText(`From: ${fromAddress}`, {
      x: 50,
      y: y - 20,
    });
    page.drawText(`To: ${toAddresses.join(', ')}`, {
      x: 50,
      y: y - 40,
    });
    page.drawText(`Subject: ${subject}`, {
      x: 50,
      y: y - 60,
    });
    page.drawText('--- Body ---', {
      x: 50,
      y: y - 80,
    });
    page.drawText(body ?? '', {
      x: 50,
      y: y - 100,
    });

    const pdfBytes = await pdfDoc.save();

    // Salvar o arquivo PDF no Amazon S3
    const bucketName = 'buckets3ses';
    const filename = `resposta_${uuid()}.pdf`;

    const params = {
      Bucket: bucketName,
      Key: filename,
      Body: pdfBytes,
    };

    //await s3.upload(params).promise();

    //Salvar localmente
    fs.writeFileSync(`tmp/${filename}.pdf`, pdfBytes);

    return `Arquivo PDF salvo em: s3://${bucketName}/${filename}`;
  } catch (error) {
    throw error;
  }
};
