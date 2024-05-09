'use client';

import ErrorToast from '@/components/errorToast';
import usePollingEtherPrice from '@/hooks/usePollingEtherPrice';
import usePollingGasPrices from '@/hooks/usePollingGasPrices';

export default function Home() {
  const {
    error: errorGasPrices,
    data: gasPrices
  } = usePollingGasPrices();
  const {
    error: errorEtherPrice,
    data: etherPrice
  } = usePollingEtherPrice();

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 lg:p-24 md:p-12 p-4">
      <p className="text-4xl text-center">
        Real time information from &nbsp;
        <a href="https://etherscan.io/" className="font-mono font-bold">etherscan.io</a>
      </p>

      <div className="w-full lg:max-w-5xl py-6 flex flex-col md:flex-row justify-around items-center md:items-start from-inherit border bg-gradient-to-b backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 rounded-xl bg-zinc-800/30">
        <div className="px-6 py-4 flex flex-col divide-y divide-slate-600">
          <p className="text-2xl pb-4">
            Gas prices
          </p>
          {
            gasPrices && (
              <div className="pt-4">
                <p className="py-1">Safe gas price: <b>{gasPrices.safeGasPrice}</b></p>
                <p className="py-1">Propose gas price: <b>{gasPrices.proposeGasPrice}</b></p>
                <p className="py-1">Fast gas price: <b>{gasPrices.fastGasPrice}</b></p>
              </div>
            )
          }
          {errorGasPrices && (
            <ErrorToast message={errorGasPrices} onCloseToast={() => {}} />
          )}
        </div>
        <div className="px-6 py-4 flex flex-col divide-y divide-slate-600">
          <p className="text-2xl pb-4">
            Ether price
          </p>
          {
            etherPrice && (
              <div className="pt-4">
                <p className="py-1"><b>{Number(etherPrice.ethbtc).toFixed(6)}</b> BTC</p>
                <p className="py-1">$ <b>{Number(etherPrice.ethusd).toFixed(2)}</b></p>
              </div>
            )
          }
          {errorEtherPrice && (
            <ErrorToast message={errorEtherPrice} onCloseToast={() => {}} />
          )}
        </div>
      </div>
    </main>
  );
}
