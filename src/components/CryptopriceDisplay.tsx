import { useMemo } from "react";
import { useCryptoSrote } from "../srote/store";
import Spinner from "./Spinner";

export default function CryptopriceDisplay() {
  const { currencyInfo, loading } = useCryptoSrote();
  const hasInfo = useMemo(
    () => !!Object.keys(currencyInfo).length,
    [currencyInfo]
  );

  return (
    <div className="result-wrapper">
      {loading ? (
        <Spinner />
      ) : (
        hasInfo && (
          <>
            <h2>Contización</h2>
            <div className="result">
              <img
                loading="lazy"
                src={`https://cryptocompare.com/${currencyInfo.IMAGEURL}`}
                alt="Crypto image"
              />
              <div>
                <p>
                  El precio es de: <span>{currencyInfo.PRICE}</span>
                </p>
                <p>
                  Precio más alto del día: <span>{currencyInfo.HIGHDAY}</span>
                </p>
                <p>
                  Precio más bajo del día: <span>{currencyInfo.LOWDAY}</span>
                </p>
                <p>
                  Variación últimas 24 horas:{" "}
                  <span>{currencyInfo.CHANGE24HOUR}</span>
                </p>
                <p>
                  Última Actualización: <span>{currencyInfo.LASTUPDATE}</span>
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
