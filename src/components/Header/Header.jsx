import React, { useEffect, useState, useContext } from 'react';

import Select from 'react-select';

// Import third party packages
import algoliasearch from 'algoliasearch/lite';

import {
  InstantSearch,
  HitsPerPage,
  Index,
  connectHits,
  Pagination,
  RefinementList,
  ClearRefinements,
} from 'react-instantsearch-dom';

import { Link } from 'react-router-dom';
import { Context as DemoSettingsContext } from '../../context/appActions';

// Import Cusyoms
import {
  VirtualSearchBox,
  CustomProductsHits,
  CustomHierarchicalMenu,
  CustomProductResultsHits,
  CustomCategoriesHits,
  CustomSearchBox,
  CustomHighlight,
  CustomRangeSlider,
} from '../Searchpage/Hits';

// Import icons
import { IconArmani } from '../../assets/icons';

const searchClient = algoliasearch(
  'JDBD6EJM33',
  '0fe54b2e3991d370c91376981aff9d48',
);

const HierarchicalResHits = ({ hits }) => {
  if (hits.length > 0) {
    return (
      <div>
        <div className='ma2-pro-list'>
          {hits.map((hit) => (
            <div
              className='am3-card'
              onClick={(e) => localStorage.setItem('item', JSON.stringify(hit))}
            >
              <Link to='/product-details' style={{ textDecoration: 'none' }}>
                <img src={hit.image_link} />
                <span className='card-ttl3'>
                  {<CustomHighlight hit={hit} attribute='title' />}
                </span>
                <p className='card-price3'>€ {hit.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const CustomHierarchicalResultsHits = connectHits(HierarchicalResHits);

const options = [
  { value: 'Mike', label: 'Mike' },
  { value: 'Nina', label: 'Nina' },
  { value: '', label: 'None' },
];

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
    padding: 20,
    textAlign: 'center',
  }),

  control: (_, { selectProps: { width } }) => ({
    width: width,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 400ms';

    return { ...provided, opacity, transition };
  },
};

const Header = ({
  userToken,
  setUserToken,
  setShowCat,
  showCat,
  setIsSearchVisible,
  isSearchVisible,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const switchPersoToken = (selectedOption) => {
    setSelectedOption(selectedOption);
    setUserToken(selectedOption.value);
  };

  const { state } = useContext(DemoSettingsContext);

  useEffect(() => {
    if (state.queryPersona !== '') {
      let tmp = { value: state.queryPersona, label: state.queryPersona };
      // setUserToken(state.queryPersona);
      switchPersoToken(tmp);
    }
  }, [state.queryPersona]);

  if (isSearchVisible) setShowCat(false);

  return (
    <div className='header'>
      <InstantSearch indexName='eXtra' searchClient={searchClient}>
        <div className='header-logo'>
          <IconArmani />
        </div>

        <div style={{ position: 'relative' }} className='header-cats'>


          <CustomHierarchicalMenu
            attributes={[
              'categorylvl1',
            ]}
            setShowCat={setShowCat}
          />





          <div
            onClick={(e) => setIsSearchVisible(!isSearchVisible)}
            className='header-search-icon'
          >
            <span className='searchIcon'></span>
          </div>
          <Select
            options={options}
            value={selectedOption}
            onChange={switchPersoToken}
            styles={customStyles}
            width='250px'
          />
        </div>

        {showCat ? (
          //     <Index
          //     indexName="eXtra"
          //     indexId="products"
          //   >
          //     <HitsPerPage defaultRefinement={24} items={[]} />

          //     <CustomHierarchicalResultsHits
          //     />
          // </Index>
          <div className='search-results'>
            <div
              className='left-facets'
              style={{ backgroundColor: 'rgb(241,241,241)' }}
            >
              <div className='search-header'>
                <div className='header-item'>
                  <span>
                    <h3 style={{ color: 'black' }}>CATEGORY PAGE</h3>
                  </span>
                </div>
               
              </div>
              <hr />


              <div className='filter-container'>
                
               
              </div>
            </div>
            <div className='right-results'>
              <Index indexName='eXtra' indexId='products'>
                <HitsPerPage defaultRefinement={18} items={[]} />
                <CustomProductsHits />
              </Index>
              <Pagination id='pagination' />
            </div>
          </div>
        ) : null}
      </InstantSearch>
    </div>
  );
};

export default Header;
