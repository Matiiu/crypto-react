import { Currency } from "../types";

const currencies: Currency[] = [
  { code: "USD", name: "Dolar de Estados Unidos" },
  { code: "MXN", name: "Peso Mexicano" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "Libra Esterlina" },
  { code: "COP", name: "Peso Colombiano" },
];

export const orderedCurrencies = [...currencies].sort((a, b) =>
  a.name.trim().localeCompare(b.name.trim())
);
