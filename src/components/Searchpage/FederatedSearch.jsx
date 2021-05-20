import React from "react";

// Import Customs
import {
  CustomColorHits,
  CustomCategoriesHits,
  CustomProductsHits,
} from "./Hits";

const FederatedSearch = ({
  Index,
  CustomQueryRuleRedirect,
  CustomQueryRuleCustomData,
  HitsPerPage,
}) => {
  return (
    <div className="federated-search">
      <div className="ma-left">
        {/* <Index
        indexName="armani_poc_2_demo_suggestions"
        indexId="productName"
      >
        <HitsPerPage defaultRefinement={5} items={[]} />
          <CustomCategoriesHits 
          />
      </Index>    */}

        <Index indexName="eXtra_categorylvl1" indexId="categorylvl1">
          <HitsPerPage defaultRefinement={5} items={[]} />
          <CustomCategoriesHits />
        </Index>

        <Index indexName="eXtra_query_suggestions" indexId="productName">
          <HitsPerPage defaultRefinement={4} items={[]} />
          <CustomColorHits />
        </Index>
      </div>
      <div className="ma-right">
        <CustomQueryRuleCustomData />
        <CustomQueryRuleRedirect />
        <Index indexName="eXtra" indexId="products">
          <HitsPerPage defaultRefinement={8} items={[]} />
          <CustomProductsHits />
        </Index>
      </div>
    </div>
  );
};

export default FederatedSearch;
