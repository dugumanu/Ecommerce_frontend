import React, { useEffect, useState } from 'react';
import { State, City } from 'country-state-city';
import { fetchAllCategories } from '../../services/operations/category';
import { searchByFilter } from '../../services/operations/search';
import { setProductData } from '../../slices/productSlice';
import { useDispatch } from 'react-redux';

export default function SearchFilter() {
  const allStates = State.getStatesOfCountry("IN");

  const [formData, setFormData] = useState({
    query: "",
    category: "",
    state: "", // state name
    city: ""
  });

  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    try {
      const result = await fetchAllCategories();
      setCategories(result);
    } catch (error) {
      //console.log("Error in fetching categories: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "state") {
    
      const selectedState = allStates.find((state) => state.name === value);
      if (selectedState) {
        const citiesInState = City.getCitiesOfState("IN", selectedState.isoCode); // Use isoCode to fetch cities
        setCities(citiesInState);
      }
    }
  };

  const dispatch = useDispatch();

  const searchHandler = async () => {
    try {
      const response = await searchByFilter(formData);  

      if (response) {
        dispatch(setProductData(response));
      }
      else {
        dispatch(setProductData(null))
      }
      window.scroll({
        top: 500,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      //console.log('Error in search filter ', error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formData.query) {
      return alert("Please enter a search keyword!");
    }
    searchHandler();
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col md:flex-row md:w-[70%] p-3 justify-evenly items-center bg-white rounded-xl md:space-y-0 space-y-2"
    >
      <input
        type="text"
        name="query"
        value={formData.query}
        onChange={handleInputChange}
        placeholder="Enter ads keyword"
        className="p-2 w-full md:w-[15%] focus:outline-none border md:border-none border-gray-300 rounded"
      />

<div className='border-[1px] md:block hidden h-[30px]  mt-[1%] border-gray-400 '  ></div>
  
      <select
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        className="p-2 w-full md:w-[15%] focus:outline-none md:border-none border border-gray-300 rounded"
      >
        <option value="">Select State</option>
        <option value="Bihar">Bihar</option>

        {/* {allStates.map((state) => (
          <option key={state.isoCode} value={state.name}>
            {state.name}
          </option>
        ))} */}
      </select>

      <div className='border-[1px] md:block hidden h-[30px]  mt-[1%] border-gray-400 '  ></div>
  
      <select
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        className="p-2 w-full md:w-[15%] md:border-none focus:outline-none border border-gray-300 rounded"
      >
        <option value="">Select City</option>
        <option value="Siwan">Siwan</option>

        {/* {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))} */}
      </select>

      <div className='border-[1px] md:block hidden h-[30px]  mt-[1%] border-gray-400 '  ></div>
  
      <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        className="p-2 w-full md:w-[15%] md:border-none focus:outline-none border border-gray-300 rounded"
      >
        <option value="">Select Category</option>
        {
  categories && categories.length > 0 ? (
    categories.map((data) => (
      <option key={data.name} value={data.name}>
        {data.name}
      </option>
    ))
  ) : (
    <p>No category available</p>
  )
}

      </select>
  
      <button
        type="submit"
        className="w-full md:w-[15%] flex flex-row justify-center items-center py-2 font-bold bg-green rounded-lg text-white gap-2"
      >
        Search Now
      </button>
    </form>
  );
  
}
