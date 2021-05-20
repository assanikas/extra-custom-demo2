import creatDataContext from './CreateContext';

const storeQueryReducer = (state, action) => {
  switch (action.type) {
    case 'storeQuery':
      return { storeQuery: action.payload };
    case 'storeResultsQuery':
      return { storeResultsQuery: action.payload };
    case 'queryPersona':
      return { queryPersona: action.payload };

    default:
      return state;
  }
};

const updateQueryState = (dispatch) => async (val) => {
  dispatch(
    { type: 'storeQuery', payload: val },
    { type: 'storeResultsQuery', payload: '' },
  );
};

const updateQueryStateResults = (dispatch) => async (val) => {
  dispatch(
    { type: 'storeResultsQuery', payload: val },
    { type: 'storeQuery', payload: '' },
  );
};

const updateQueryPersona = (dispatch) => async (val) => {
  dispatch({ type: 'queryPersona', payload: val });
};

export const { Context, Provider } = creatDataContext(
  storeQueryReducer,
  {
    updateQueryState,
    updateQueryStateResults,
    updateQueryPersona,
  },
  {
    storeQuery: '',
    storeResultsQuery: '',
    queryPersona: '',
  },
);
