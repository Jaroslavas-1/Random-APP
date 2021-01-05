import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import errorImage from "../../assets/error.png";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import {  FaBitcoin } from "react-icons/fa";
import { IconContext } from "react-icons";

const BitcoinPrice = () => {
  const bitcoinPriceURL = "https://api.coindesk.com/v1/bpi/currentprice.json";
  const [bitcoinData, setBitcoinData] = useState([]);
  const [bitcoinRate, setBitcoinRate] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isSortInASC, setSort] = useState(false);

  const noBitcoinData =
    !bitcoinData || (bitcoinData && bitcoinData.length === 0);

  useEffect(() => {
    getBitcoinData();

    const interval = setInterval(() => {
      setLoading(true);
      getBitcoinData();
    }, 10000);

    return () => clearInterval(interval);
  }, [isSortInASC]);

  const getBitcoinData = () => {
    axios
      .get(bitcoinPriceURL)
      .then((response) => {
        setBitcoinData(response.data);
        sortBitcoinRate(response.data.bpi);
      }).then(() => {
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const doSorting = () => {
    sortBitcoinRate(bitcoinRate);
    setSort(!isSortInASC);
  };

  const sortBitcoinRate = (x) => {
    const sorted = Object.values(x).sort((a, b) => {
      return isSortInASC
        ? b.code.localeCompare(a.code)
        : a.code.localeCompare(b.code);
    });
    setBitcoinRate(sorted);
  };

  if (!noBitcoinData && !isError) {
    return (
      <div className="bitcoin-price-page">
        <div>
          <h1 className="page-head-text">
            <IconContext.Provider value={{ className: 'bitcoin-icon' }}>
              <FaBitcoin />
            </IconContext.Provider>
            {bitcoinData.chartName} Conversion Rates
          </h1>
          <h5 className="float-right">
            {isLoading && (
              <Spinner animation="border" size="sm">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            {moment(bitcoinData.time.updatedISO).format("YYYY-MM-DD HH:mm")}
          </h5>
        </div>
        <Table striped bordered>
          <thead className="table-head">
            <tr>
              <th onClick={doSorting} className="sort-column">
                <div className="sort-column-head">Currency</div>
                <IconContext.Provider value={{ color: "white" }}>
                  {isSortInASC ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
                </IconContext.Provider>
              </th>
              <th>Currency Full Name</th>
              <th>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(bitcoinRate).map((currency, index) => {
              return (
                <tr key={index}>
                  <td>{bitcoinRate[currency].code}</td>
                  <td>{bitcoinRate[currency].description}</td>
                  <td>{bitcoinRate[currency].rate}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  } else if (isError) {
    return (
      <div className="error-page-block">
        <img src={errorImage} className="error-image" />
        <h3> Ups... Something went wrong.</h3>
        <p>But don't worry, we will fix it!</p>
        <p>Try again later.</p>
      </div>
    );
  }
  return (
    <div className="loader">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default BitcoinPrice;
