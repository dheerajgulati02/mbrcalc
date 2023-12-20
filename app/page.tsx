"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tradeAmount, setTradeAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [lots, setLots] = useState(0);

  const [brokerageValue, setBrokerageValue] = useState(0);
  const [brokerageType, setBrokerageType] = useState("CR");
  const [brokerage, setBrokerage] = useState(0);

  const [marginValue, setMarginValue] = useState(0);
  const [marginType, setMarginType] = useState("CR");
  const [margin, setMargin] = useState(0);

  const handleChangeMargin = (e: any) => {
    setMarginType(e.target.value);
  };

  const handleChangeBrokerage = (e: any) => {
    setBrokerageType(e.target.value);
  };

  useEffect(() => {
    if (quantity == 0 || price == 0) {
      setTradeAmount(0);
    } else {
      setTradeAmount(quantity * price);
    }
  }, [quantity, price]);

  useEffect(() => {
    if (marginValue == 0 || lots == 0 || price == 0 || quantity == 0) {
      setMargin(0);
    }
    if (marginType === "CR") {
      setMargin((marginValue * tradeAmount) / 100);
    } else if (marginType == "LOT") {
      setMargin(marginValue * lots);
    }
  }, [marginValue, marginType, lots, price, quantity]);

  useEffect(() => {
    if (brokerageValue == 0 || lots == 0 || price == 0 || quantity == 0) {
      setBrokerage(0);
    }
    if (brokerageType == "CR") {
      setBrokerage((brokerageValue * tradeAmount) / 100);
    } else if (brokerageType == "LOT") {
      setBrokerage(brokerageValue * lots);
    }
  }, [brokerageValue, brokerageType, lots, price, quantity]);

  return (
    <div className="p-5">
      <h1 className="text-xl">Calculator</h1>
      {/* Quantity */}
      <div className="flex space-x-10 overflow-x-auto px-10">
        <div className="flex flex-col space-y-2">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
            className="border-2 w-40"
            value={quantity}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="lots">Number of Lots</label>
          <input
            type="number"
            name="lots"
            id="lots"
            onChange={(e) => setLots(parseInt(e.target.value))}
            className="border-2 w-40"
            value={lots}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="price">Buy Price</label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="border-2 w-40"
            value={price}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="margin">Margin Per lot or % for CR</label>
          <input
            type="number"
            name="margin"
            id="margin"
            onChange={(e) => setMarginValue(parseFloat(e.target.value))}
            value={marginValue}
            className="border-2 w-40"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="brokerage">Brokerage Per lot or % for CR</label>
          <input
            type="number"
            name="brokerage"
            id="brokerage"
            onChange={(e) => setBrokerageValue(parseFloat(e.target.value))}
            value={brokerageValue}
            className="border-2 w-40"
          />
        </div>

        <div>
          <label htmlFor="" className="flex flex-col space-y-2">
            <p>Margin Type</p>
            <select
              name="margin"
              id=""
              onChange={handleChangeMargin}
              className="w-20"
            >
              <option value="CR">Cr</option>
              <option value="LOT">Lot</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="" className="flex flex-col space-y-2">
            <p>Brokerage Type</p>
            <select
              name="brokerage"
              id=""
              onChange={handleChangeBrokerage}
              className="w-20"
            >
              <option value="CR">Cr</option>
              <option value="LOT">Lot</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="Margin">Margin</label>
          <p>{margin.toFixed(2)}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="Brokerage">Brokerage</label>
          <p>{brokerage.toFixed(2)}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <h1>Trade Amount</h1>
          <p>{tradeAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
