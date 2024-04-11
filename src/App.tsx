import { useEffect } from "react";
import CryptoSearchForm from "./components/CryptoSearchForm";
import { useCryptoSrote } from "./srote/store";
import CryptopriceDisplay from "./components/CryptopriceDisplay";
export default function App() {
  const { fetchCryptos } = useCryptoSrote();

  useEffect(() => {
    fetchCryptos();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          Cotizador de <span>Criptomonedas</span>
        </h1>

        <div className="content">
          <CryptoSearchForm />
          <CryptopriceDisplay />
        </div>
      </div>
    </>
  );
}
