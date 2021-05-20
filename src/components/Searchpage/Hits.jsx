import React, { useState } from 'react';

// Prerequisite: install rheostat@4
import 'rheostat/initialize';
import Rheostat from 'rheostat';
import 'rheostat/css/rheostat.css';

import {
  connectHighlight,
  connectHits,
  connectRange,
  connectHierarchicalMenu,
  connectSearchBox,
} from 'react-instantsearch-dom';

import { Link } from 'react-router-dom';

// 1. Create a React component
const Highlights = ({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  return (
    <span>
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark className='markH' key={index}>
            {part.value}
          </mark>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </span>
  );
};

// 2. Connect the component using the connector
const CustomHighlight = connectHighlight(Highlights);

const ProductsHits = ({ hits }) => {
  if (hits.length > 0) {
    return (
      <div>
        {/* <span className="am-product">PRODUCTS</span> */}
        <div className='ma-pro-list'>
          {hits.map((hit) => (
            <div
              className='am-card'
              onClick={(e) => localStorage.setItem('item', JSON.stringify(hit))}
            >
              <Link to='/product-details' style={{ textDecoration: 'none' }}>
                <img src={hit.imagePath} />
                <span className='card-ttl' style={{ textAlign: 'center' }}>
                  {<CustomHighlight hit={hit} attribute='nameEn' />}
                </span>
                <p className='card-price'>SR {hit.price}</p>
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

const CustomProductsHits = connectHits(ProductsHits);

const CategoriesHits = ({ hits }) => {
  if (hits.length > 0) {
    return (
      <div>
        <span className='am-categories filter-header'>CATEGORIES</span>
        <div className='cat-list'>
          {hits.map((hit) => (
            <span className='cat-ttl'>{hit['categorylvl3']}</span>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const CustomCategoriesHits = connectHits(CategoriesHits);

const ColorHits = ({ hits }) => {
  if (hits.length > 0) {
    return (
      <div>
        <span className='am-categories filter-header'>SUGGESTIONS</span>
        <div className='cat-list'>
          {hits.map((hit) => (
            <span className='cat-ttl'>
              {<CustomHighlight hit={hit} attribute='nameEn' />}
            </span>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const CustomColorHits = connectHits(ColorHits);

const SearchBox = ({
  setIsSearchbarClicked,
  query,
  setIsSearching,
  setQuery,
  setIsEnterPressed,
  setShowEmptySearch,
}) => (
  <input
    placeholder='Search here ...'
    type='search'
    value={query}
    onClick={() => {
      setIsSearchbarClicked(true);
    }}
    onKeyPress={(e) => {
      if (e.charCode == 13) setIsEnterPressed('yes');
    }}
    onChange={(event) => {
      if (event.currentTarget.value !== '') {
        setIsSearchbarClicked(false);
        setIsSearching(true);
        if (event.currentTarget.value != '') {
          setIsSearching(true);
          setShowEmptySearch(false);
        } else {
          setShowEmptySearch(true);
          setIsEnterPressed('no');
        }
        setQuery(event.currentTarget.value);
      } else {
        setIsEnterPressed('no');
        setIsSearching(false);
        setIsSearchbarClicked(false);
        setShowEmptySearch(true);
        setQuery('');
      }
    }}
    onReset={() => {
      setIsSearching(false);
      setIsSearchbarClicked(false);
      setQuery('');
    }}
    className='searchbar'
  />
);

const CustomSearchBox = connectSearchBox(SearchBox);
const VirtualSearchBox = connectSearchBox(() => null);

const ProductsResHits = ({ hits }) => {
  if (hits.length > 0) {
    return (
      <div>
        <div className='ma2-pro-list'>
          {hits.map((hit) => (
            <div
              className='am2-card'
              onClick={(e) => localStorage.setItem('item', JSON.stringify(hit))}
            >
              <Link to='/product-details' style={{ textDecoration: 'none' }}>
                <img src={hit.imagePath} />
                <span className='card-ttl2'>
                  {<CustomHighlight hit={hit} attribute='nameEn' />}
                </span>
                <p className='card-price2'>SR {hit.price}</p>
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

const CustomProductResultsHits = connectHits(ProductsResHits);

// Cats
const HierarchicalSubMenu = ({ setShowCat, items, refine, createURL }) =>
  items.map((item) => (
    <div key={item.label} className='header-subcats--item'>
      <span
        onClick={(event) => {
          event.preventDefault();
          refine(item.value);
        }}
        style={{ textDecoration: 'none' }}
        href={createURL(item.value)}
        style={{ fontWeight: item.isRefined ? 'bold' : '' }}
      >
        {item.label}
      </span>
    </div>
  ));

const HierarchicalMenu = ({ items, setShowCat, refine, createURL }) => {
  // console.log("items :", items);

  return items.map((item, i) => (
    <div key={item.label} className='header-cats-item'>
      <span
        id={'am-' + i}
        onClick={(event) => {
          event.preventDefault();
          refine(item.value);
          setShowCat(true);
        }}
        style={{ textDecoration: 'none' }}
        href={createURL(item.value)}
        style={{ fontWeight: item.isRefined ? 'bold' : '' }}
      >
        {item.label}
        {/* ({item.count}) */}
      </span>
      <div id={'am-' + parseInt(i + 3)} className='header-subcats--items'>
        {item.items && (
          <HierarchicalSubMenu
            items={item.items}
            refine={refine}
            setShowCat={setShowCat}
            createURL={createURL}
          />
        )}
      </div>
    </div>
  ));
};

setTimeout(() => {
  let elem = document.querySelector('#am-0');
  if (elem)
    elem.addEventListener('mouseenter', () => {
      let elem4 = document.querySelector('#am-3');
      if (elem4) {
        if (elem4.children.length > 0) elem4.style.opacity = '1';
        else elem.click();
      }
    });

  let elem3 = document.querySelector('#am-3');
  if (elem3)
    elem3.addEventListener('mouseleave', () => {
      if (elem3) elem3.style.opacity = '0';
    });

  // Second element
  let elem2 = document.querySelector('#am-1');
  if (elem2)
    elem2.addEventListener('mouseenter', () => {
      let elem5 = document.querySelector('#am-4');
      if (elem5)
        if (elem5.children.length > 0) elem5.style.opacity = '1';
        else elem2.click();
    });

  let elem6 = document.querySelector('#am-4');

  if (elem6)
    elem6.addEventListener('mouseleave', () => {
      elem6.style.opacity = '0';
    });

  // Third
  let elem8 = document.querySelector('#am-2');
  if (elem8)
    elem8.addEventListener('mouseenter', () => {
      let elem6 = document.querySelector('#am-5');
      if (elem6.children.length > 0) elem6.style.opacity = '1';
      else elem8.click();
    });

  let elem7 = document.querySelector('#am-5');
  if (elem7)
    elem7.addEventListener('mouseleave', () => {
      elem7.style.opacity = '0';
    });
}, 1000);

const CustomHierarchicalMenu = connectHierarchicalMenu(HierarchicalMenu);

const RangeSlider = ({ min, max, currentRefinement, canRefine, refine }) => {
  const [stateMin, setStateMin] = React.useState(min);
  const [stateMax, setStateMax] = React.useState(max);

  React.useEffect(() => {
    if (canRefine) {
      setStateMin(currentRefinement.min);
      setStateMax(currentRefinement.max);
    }
  }, [currentRefinement.min, currentRefinement.max]);

  if (min === max) {
    return null;
  }

  const onChange = ({ values: [min, max] }) => {
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  };

  const onValuesUpdated = ({ values: [min, max] }) => {
    setStateMin(min);
    setStateMax(max);
  };

  return (
    <Rheostat
      min={min}
      max={max}
      values={[currentRefinement.min, currentRefinement.max]}
      onChange={onChange}
      onValuesUpdated={onValuesUpdated}
    >
      <div
        className='rheostat-marker rheostat-marker--large'
        style={{ left: 0 }}
      ></div>

      <div
        className='rheostat-marker rheostat-marker--large'
        style={{ right: 0 }}
      ></div>

      <div className='range-values'>
        <div className='rheostat-value'>€{stateMin}</div>
        <div className='rheostat-value'>€{stateMax}</div>
      </div>
    </Rheostat>
  );
};

const CustomRangeSlider = connectRange(RangeSlider);

export {
  CustomRangeSlider,
  CustomProductResultsHits,
  CustomColorHits,
  CustomCategoriesHits,
  CustomHighlight,
  CustomHierarchicalMenu,
  VirtualSearchBox,
  CustomProductsHits,
  CustomSearchBox,
};
