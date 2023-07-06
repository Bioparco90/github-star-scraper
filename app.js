import { utils, writeFile } from "xlsx";
import path from "path";

// Crea un nuovo workbook
const workbook = utils.book_new();

// Crea un nuovo foglio di lavoro
const worksheet = utils.aoa_to_sheet([
  ["Nome", "Cognome", "Età"],
  ["Mario", "Rossi", 30],
  ["Laura", "Bianchi", 25],
  ["Luca", "Verdi", 35],
]);

// Aggiungi il foglio di lavoro al workbook
utils.book_append_sheet(workbook, worksheet, "Dati");

// Salva il workbook come file Excel
const filePath = path.join(process.cwd(), "file.xlsx");
writeFile(workbook, filePath);

console.log("File Excel creato con successo!");
