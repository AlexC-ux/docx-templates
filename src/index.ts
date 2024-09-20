import * as path from 'path';
import * as fs from 'fs';
import createReport from './main';
export { listCommands, getMetadata } from './main';
export * from './errors';
import type { QueryResolver } from './types';
export { createReport, QueryResolver };
export default createReport;

const template = fs.readFileSync(path.join(__dirname, '../template.docx'));
const data: any = fs.readFileSync(path.join(__dirname, '../data.json'));

const jsonData = JSON.parse(data.toString('utf-8'));

(async () => {
  const output = await createReport({
    template,
    data,
    maximumWalkingDepth: Infinity,
    errorHandler(e, raw_code) {
      console.error(`DOCX error: ${e.name}, ${raw_code}`);
    },
    noSandbox: true,
    additionalJsContext: {
      filterListFormData(
        appName: string,
        dataKey: string,
        resultElementKey: string
      ) {
        const meta = data.data?.[dataKey]?.data.find(
          (metaApp: any) => metaApp.appName == appName
        )?.[resultElementKey];
        if (!meta) {
          console.log(`${dataKey} > Not found app ${appName}`);
        } else {
          console.log(`Starting ${dataKey} for app ${appName}`);
        }
        const result = meta ?? [];
        return result;
      },
      log: (...args: any[]) => {
        console.log(...args);
      },
    },
  });
  fs.writeFileSync(path.join(__dirname, '../output.docx'), output);
})();
