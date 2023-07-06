import { utils, writeFile } from "xlsx";
import path from "path";
import fs from "fs";

export let createSheetFile = () => {
  // Crea un nuovo workbook
  const workbook = utils.book_new();

  // Utilizzo JSON
  const jsonData = fs.readFileSync("data.json");
  const data = JSON.parse(jsonData);
  const worksheet = utils.json_to_sheet(data);

  // Aggiungi il foglio di lavoro al workbook
  utils.book_append_sheet(workbook, worksheet, "Dati");

  // Salva il workbook come file Excel
  const filePath = path.join(process.cwd(), "file.xlsx");
  writeFile(workbook, filePath);

  console.log("File Excel creato con successo!");
};
