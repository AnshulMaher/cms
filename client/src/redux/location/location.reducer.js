import LocationActionTypes from './location.types';

const initialState = {
  city: '',
  state: [
    'Andhra Pradesh',
    'Andaman and Nicobar Islands',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry ',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ],
  isFetching: false,
  error: null
};

const locationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LocationActionTypes.FETCH_STATE_START:
      return { ...state, isFetching: true };

    default:
      return state;
  }
};

export default locationReducer;
