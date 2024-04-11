import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCryptoPrice, getCryptos } from "../apis/cryptos";
import type { CryptoCurrency, CurrencyInfo, Pair } from "../types";

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  currencyInfo: CurrencyInfo;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoSrote = create<CryptoStore>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    currencyInfo: {} as CurrencyInfo,
    loading: false,

    fetchCryptos: async () => {
      set(() => ({ loading: true }));
      let ordenedCryptoCurrencies: CryptoCurrency[] = [];
      const cryptoCurrencies = await getCryptos();
      if (cryptoCurrencies) {
        ordenedCryptoCurrencies = [...cryptoCurrencies].sort((a, b) =>
          a.CoinInfo.FullName.localeCompare(b.CoinInfo.FullName)
        );
      }
      set(() => ({
        cryptoCurrencies: ordenedCryptoCurrencies,
        loading: false,
      }));
    },
    fetchData: async (pair) => {
      set(() => ({ loading: true }));
      const currencyInfo = await getCryptoPrice(pair);
      set(() => ({ currencyInfo, loading: false }));
    },
  }))
);
