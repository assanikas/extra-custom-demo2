import React, { useEffect, useState, useContext } from 'react';

// Import Customs
import {
  VirtualSearchBox,
  CustomProductResultsHits,
  CustomRangeSlider,
  CustomSearchBox,
} from './Hits';

import FederatedSearch from './FederatedSearch';
import LandingPage from '../Homepage/LandingPage';

import { Context as DemoSettingsContext } from '../../context/appActions';

// Import third party packages
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Index,
  Configure,
  HitsPerPage,
  Pagination,
  HierarchicalMenu,
  VoiceSearch,
  RefinementList,
  connectQueryRules,
  ClearRefinements,
  connectHierarchicalMenu,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'JDBD6EJM33',
  '0fe54b2e3991d370c91376981aff9d48',
);

// Add Banner
const QueryRuleCustomData = ({ items }) =>
  items.map(({ image }) => {
    if (!image) {
      return null;
    }

    return (
      <div className='banner-img'>
        <img src={image} alt='test' />
      </div>
    );
  });

const CustomQueryRuleCustomData = connectQueryRules(QueryRuleCustomData);

// Add Banner

const QueryRuleRedirect = ({ items }) =>
  items.map(({ redirect }) => {
    if (!redirect) {
      return null;
    }

    window.location.href = redirect;
  });

const CustomQueryRuleRedirect = connectQueryRules(QueryRuleRedirect);

const Searchpage = ({
  userToken,
  showCat,
  isSearchVisible,
  setIsSearchVisible,
  isSearching,
  setIsSearching,
}) => {
  const [query, setQuery] = useState('');
  const [showEmptySearch, setShowEmptySearch] = useState(true);
  const [isSearchbarClicked, setIsSearchbarClicked] = useState(false);
  const [enterPressed, setIsEnterPressed] = useState('no');
  const { state } = useContext(DemoSettingsContext);

  useEffect(() => {
    console.log('state :', state);
    if (state.storeQuery && state.storeQuery !== '') {
      setIsSearchVisible(true);
      setIsSearching(true);
      setQuery(state.storeQuery);
      setIsEnterPressed('no');
    }

    if (state.storeResultsQuery && state.storeResultsQuery !== '') {
      setIsSearchVisible(true);
      setIsSearching(true);
      setQuery(state.storeResultsQuery);
      setIsEnterPressed('yes');
    }
  }, [state.storeQuery, state.storeResultsQuery]);

  return (
    <div>
      {isSearchVisible ? (
        <InstantSearch
          indexName='eXtra'
          searchClient={searchClient}
        >
          <Configure enablePersonalization='true' userToken={userToken} />

          <div className='search-container'>
            <div className='search-bar'>
              <i className='fa fa-search'></i>
              <CustomSearchBox
                id='search-input'
                setIsSearchbarClicked={setIsSearchbarClicked}
                query={query}
                setIsEnterPressed={setIsEnterPressed}
                setIsSearching={setIsSearching}
                setQuery={setQuery}
                setShowEmptySearch={setShowEmptySearch}
              />
              <VoiceSearch />
            </div>
          </div>

          {isSearching && query !== '' && enterPressed === 'no' ? (
            <FederatedSearch
              CustomQueryRuleRedirect={CustomQueryRuleRedirect}
              CustomQueryRuleCustomData={CustomQueryRuleCustomData}
              Index={Index}
              HitsPerPage={HitsPerPage}
            />
          ) : enterPressed === 'yes' ? (
            <div className='search-results'>
              <div className='left-facets'>
                <div className='search-header'>
                  <div className='header-item'>
                    <h2>SEARCH</h2>
                  </div>
                  <div className='header-item'>
                    <ClearRefinements />
                  </div>
                </div>
                <hr />

                <div className='filter-container'>
                  <div className='filter-header'>
                    <span>Category</span>
                  </div>

                  <HierarchicalMenu
                    attributes={[
                      'categorylvl1',
                      'categorylvl2',
                      'categorylvl3',
                    ]}
                    translations={{
                      showMore(expanded) {
                        return expanded ? 'Show less' : 'Show more';
                      },
                    }}
                  />

                  <hr />

                  <div className='filter-header'>
                    <span>Brand</span>
                  </div>
                  <RefinementList attribute='brandName' />

                  <hr />
                 
                  <div className='filter-header'>
                    <span>Home Delivery</span>
                  </div>
                  <RefinementList attribute='homeDelivery' limit={5} />

                  <hr />
                  <div className='filter-header'>
                    <span>Price</span>
                  </div>
                  {/* <RefinementList attribute="price" /> */}
                  <CustomRangeSlider attribute='price' />
                </div>
              </div>
              <div className='right-results'>
                <Index indexName='eXtra' indexId='products'>
                  <HitsPerPage defaultRefinement={18} items={[]} />
                  <CustomProductResultsHits />
                </Index>
                <Pagination id='pagination' />
              </div>
            </div>
          ) : (
            <LandingPage />
          )}

          <VirtualSearchBox defaultRefinement={query} />
        </InstantSearch>
      ) : !showCat ? (
        <LandingPage />
      ) : null}
    </div>
  );
};

export default Searchpage;
