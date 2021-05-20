import React, { useState } from "react";

import DetailImg from "../../assets/img/detail.png";
import RetBtn from "../../assets/img/returnButton.png";
import DummyHeader from "./HeaderDummy";

// Import third party packages
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  Index,
  HitsPerPage,
  Pagination,
  HierarchicalMenu,
  VoiceSearch,
  RefinementList,
  ClearRefinements,
  Configure,
  connectHierarchicalMenu,
  connectHits,
} from "react-instantsearch-dom";

import { Link } from "react-router-dom";

const searchClient = algoliasearch(
  "59OB5AJ41S",
  "c7b1827fd68f710658d730cf69b68094",
);

const SuggestionsPageHits = ({ hits }) => {
  if (hits.length > 0) {
    return (
      <div className="ma-pro-list">
        {hits.map((hit) => (
          <div
            className="suggestions-am-card"
            onClick={(e) => localStorage.setItem("item", JSON.stringify(hit))}
          >
            <Link to="/product-details" style={{ textDecoration: "none" }}>
              <img src={hit.imagePath} />
              <span className="s-card-ttl">{hit.nameEn}</span>
              <p className="card-price">€ {hit.price}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

const CustomSuggestionsPageHits = connectHits(SuggestionsPageHits);

const ProductDetails = () => {
  // Review this
  let product = JSON.parse(localStorage.getItem("item"));
  const [userToken, setUserToken] = useState("");

  // console.log("===>", product);

  return (
    <React.Fragment>
      <DummyHeader userToken={userToken} setUserToken={setUserToken} />
      <div className="product-details-container">
        <div className="product-details">
          <img src={product.imagePath} />

          <div className="product-details-right">
            <img src={RetBtn} />
            <span style={{ color: "rgb(100,100,100)" }}>{product.nameEn}</span>
            <span style={{ color: "rgb(100,100,100)" }}>
              {product.description}
            </span>
            <span>€ {product.price}</span>
            <img src={DetailImg} />
          </div>
        </div>

        <div className="product-sugestions">
          <div className="suggestion-header">You may also like ...</div>

          <InstantSearch
            indexName="eXtra"
            searchClient={searchClient}
          >
            <Configure enablePersonalization="true" userToken={userToken} />
            <Configure
              facetFilters={[`categorylvl1:${product["categorylvl1"]}`]}
            />
            <HitsPerPage defaultRefinement={4} items={[]} />
            <CustomSuggestionsPageHits />
          </InstantSearch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
