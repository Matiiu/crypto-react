import { useState, ChangeEvent, FormEvent } from "react";
import { useCryptoSrote } from "../srote/store";
import { orderedCurrencies } from "../data";
import { Pair } from "../types";
import ErrorMsg from "./ErrorMsg";

export default function CryptoSearchForm() {
  const { cryptoCurrencies, fetchData } = useCryptoSrote();
  const [pair, setPair] = useState<Pair>({
    currency: "",
    cryptoCurrency: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldEmpty = Object.values(pair).some((value) => !value);
    if (fieldEmpty) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
    fetchData(pair);
  };

  return (
    <form className="crypto-form" onSubmit={handleSubmit}>
      {!!error && <ErrorMsg>{error}</ErrorMsg>}
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select name="currency" id="currency" onChange={handleChange}>
          <option value="" hidden>
            -- Seleccione --
          </option>
          {orderedCurrencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cryptoCurrency">Criptomoneda:</label>
        <select
          name="cryptoCurrency"
          id="cryptoCurrency"
          onChange={handleChange}
        >
          <option value="" hidden>
            -- Seleccione --
          </option>
          {!!cryptoCurrencies.length &&
            cryptoCurrencies.map((crypto) => (
              <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
                {crypto.CoinInfo.FullName}
              </option>
            ))}
        </select>
      </div>

      <input type="submit" value="Cotizar" />
    </form>
  );
}
