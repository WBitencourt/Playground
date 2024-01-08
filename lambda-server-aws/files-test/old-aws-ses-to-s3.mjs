import 'dotenv/config'
import AWS from 'aws-sdk';
import { simpleParser } from 'mailparser';
import axios from 'axios';

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

const s3 = new AWS.S3();

export const handleReplySESUploadToS3 = async (event, context) => {
  try {
    //return JSON.stringify(event);
    if (!event?.Records && !Array.isArray(event?.Records)) {
      return 'Invalid event';
    }

    const emailS3Key = event?.Records[0]?.s3?.object?.key;

    if (!emailS3Key) {
      return 'E-mail S3 Key is required';
    }

    //const response = event?.Records[0]?.ses?.mail;

    // if (!response) {
    //   return 'Nenhum e-mail encontrado';
    // }

    // if (!response?.messageId) {
    //   return 'Nenhuma chave encontrada';
    // }

    //const Key = 'htad9lpk86on57uhl53dp4o3sc1bf85v73l7ghg1'
    const Key = emailS3Key === 'o3vrnil0e2ic28trm7dfhrc2v0clambda4nbp0g1' ? 'kllhi71ktj2hd9746do3ptvk5j6ngvjc6icgmd81' : emailS3Key;
    
    const objectS3 = await s3.getObject({ Bucket: 'buckets3ses', Key }).promise();
    const rawObjectS3 = objectS3.Body.toString('utf-8');

    const email = await parseEmailMimeToObject(rawObjectS3);

    const pdfBytes = await generatePdfBytesFromHtml(email?.html);

    //Local
    //fs.writeFileSync(`tmp/${id}.pdf`, Buffer.from(pdfBytes, 'base64'));

    //Html to pdf service
    // const options = { format: 'A4' }; // Defina o formato do PDF, ex: 'A4', 'Letter', etc.

    // const pdfBytes = await new Promise((resolve, reject) => {
    //   pdf
    //   .create(email?.html, options)
    //   .toBuffer((error, buffer) => {
    //     if (error) reject(error);
    //     resolve(buffer);
    //   });

    //   // save local
    //   pdf
    //   .create(email?.html, options)
    //   .toFile(`tmp/${id}.pdf`, (error, res) => {
    //     if (error) throw error;
    //   });
    // });
    //End service

    const bucketUploadEmailS3 = 'buckets3lambdasaveemail';

    const paramsUploadEmailS3 = {
      Bucket: bucketUploadEmailS3,
      Key: `${Key}.pdf`,
      Body: Buffer.from(pdfBytes, 'base64'), //pdfBytes,
    };

    await s3.upload(paramsUploadEmailS3).promise();

    await Promise.all(email.attachments.map(async (attachment, index) => {
      //console.log('attachment', attachment)
      if(!attachment) {
        return;
      }

      const paramsUploadAnexoS3 = {
        Bucket: bucketUploadEmailS3,
        Key: `${Key}_anexo${index}.pdf`,
        Body: Buffer.from(attachment.content, 'base64'),
      };

      await s3.upload(paramsUploadAnexoS3).promise();

      //Local
      //fs.writeFileSync(`tmp/${id}_anexo${index}.pdf`, attachment.content);
    }));

    return 'Lambda executado com sucesso - ' + 'Key: ' + Key + ' - ' + 'emailS3Key: ' + emailS3Key;
  } catch (error) {
    throw error;
  }
};

const parseEmailMimeToObject = async (emailContent) => {
  return await simpleParser(emailContent);

  // return new Promise(async (resolve, reject) => {
  //   parser.on('headers', (headers) => {
  //     email.headers = headers;
  //     processed.headers = true;

  //     const parserProcessed = checkParserEmailProcessedAllEvents(processed);
      
  //     if (parserProcessed) {
  //       resolve(email);
  //     }
  //   });

  //   parser.on('data', (data) => {
  //     processed.data = true;

  //     email.data = data;

  //     // if (data.type === 'attachment') {
  //     //   console.log(data.filename);
  //     //   data.content.pipe(process.stdout);
  //     //   data.content.on('end', () => {
  //     //     data.release();
  //     //   });
  //     // }

  //     // if (data.type === 'attachment') {
  //     //   const attachmentData = {
  //     //     filename: data.filename,
  //     //     contentType: data.contentType,
  //     //     length: data.length,
  //     //   };

  //     //   //email.attachments.push(attachmentData);
  //     // }

  //     const parserProcessed = checkParserEmailProcessedAllEvents(processed);

  //     if (parserProcessed) {
  //       resolve(email);
  //     }
  //   });

  //   parser.on('error', (err) => {
  //     reject(err);
  //   });
    
  //   parser.write(emailContent);
  //   parser.end();
  // });
};

const generatePdfBytesFromHtml = async (html) => {
  try {
    if(!html) {
      return
    }

    const htmlBase64 = Buffer.from(html).toString('base64');
    const apiUrl = 'https://everest.oito.srv.br/everest/ms/htmltopdf';
    const response = await axios.post(apiUrl, { html: htmlBase64 });

    return response?.data?.pdfBase64;
  } catch (error) {

  }
  
  // return `JVBERi0xLjcKJYGBgYEKCjcgMCBvYmoKPDwKL0ZpbHRlciAvRmxhdGVEZWNvZGUKL0xlbmd0aCAx
  // MzIKPj4Kc3RyZWFtCnicHYpLCgJBDAX3OUXWwoxJOh8bRFAcV64kF3Ch4kAr6P3BHjeP4lUdEghp
  // tNInGD8PWOez3b7D5d2ur0FYFAth3qFDnoGx58hohCE8bipmg62WEDfnUK8+eQgZqapHEVoeId13
  // 685WfGlrUOji/gVHuEXxkx/dhHeYM+QKpoQf+ogiSwplbmRzdHJlYW0KZW5kb2JqCgo4IDAgb2Jq
  // Cjw8Ci9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9UeXBlIC9PYmpTdG0KL04gNgovRmlyc3QgMzIKL0xl
  // bmd0aCAzODIKPj4Kc3RyZWFtCnic1VNdS8MwFH3Pr7iP+rDlJv2WMdjWFUGGMgVF8SFrw6hsibSd
  // 6L/3pu029yDDRymH5N577kfSEwEIEnwfPIhi8CHwJAQQihBCiIWE0Yjxh693DfxOrXXN+E1Z1PBC
  // HIQlvDI+szvTgGDjMTtyZ6pRG7tmXRIIR94z7ipb7HJdwSibZxlihIihTwgRZUrrjJAQJNkUkzHt
  // CZHfg3yRh+hNKJZ1CKMux8VbbtDnz2klbug4acf1484+9HW95l0NeW6eZMz4whapajRcpFcSpYeR
  // REFxD58v6ToqrRr7fw/Xzl9a8+sJT/5zZk3D+P1u1bSmcwrGp6rWLkKOcqvrwdJulWF8bnJblGYN
  // /LE0E1OXe8dpTScZJ5xKO121yuFLXdtdlZOUHK+t7TbXevOhmzJXgwgTJMW25B9NB1JIn1Td+o9s
  // EWDcs6k1f7pdvem8LUmm8yx0Uaqp/SShI31BEgxlDLEvhnHSid40NJ57CFH/EP50L4dRztzKN2pM
  // 5iUKZW5kc3RyZWFtCmVuZG9iagoKOSAwIG9iago8PAovU2l6ZSAxMAovUm9vdCAyIDAgUgovSW5m
  // byAzIDAgUgovRmlsdGVyIC9GbGF0ZURlY29kZQovVHlwZSAvWFJlZgovTGVuZ3RoIDQzCi9XIFsg
  // MSAyIDIgXQovSW5kZXggWyAwIDEwIF0KPj4Kc3RyZWFtCnicFcSxEQAgDAOxt4E7yuy/DYMwS8Aq
  // BHSbDUnJaaSZligQ9+cDD2+IA/0KZW5kc3RyZWFtCmVuZG9iagoKc3RhcnR4cmVmCjcwNQolJUVP
  // Rg==`
}
