import { utils, writeFile, WorkBook, WorkSheet } from "xlsx";
import { getStargazers } from "./gitHub";
import path from "path";

export const createSheetFile = async () => {
  // Crea un nuovo workbook
  const workbook: WorkBook = utils.book_new();

  // Utilizzo JSON
  const data = await getStargazers();
  const worksheet: WorkSheet = utils.json_to_sheet(data);

  // Aggiungi il foglio di lavoro al workbook
  utils.book_append_sheet(workbook, worksheet, "Dati");

  // Salva il workbook come file Excel
  const filePath: string = path.join(process.cwd(), "file.xlsx");
  writeFile(workbook, filePath);

  console.log("File Excel creato con successo!");
};
