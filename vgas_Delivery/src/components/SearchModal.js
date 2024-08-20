import { convertVi } from '../utils';

const SearchModal = (data,value)=> {
      const SearchResults = data?.filter(element => {
          const arrayKey = Object.keys(element);
          return arrayKey.some(_element => {
            if (element[_element]) {
              const convertedValue = convertVi(element[_element].toString().toLowerCase());
              return convertedValue.includes(value.toString().toLowerCase()) || element[_element].toString().toLowerCase().includes(value.toString().toLowerCase());
            }
          });
        });
      return (SearchResults !== null || SearchResults !== undefined) ? SearchResults : null;
  };
  
  export default SearchModal;