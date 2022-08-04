import React, { useState, useEffect } from "react";
import "./SignupForm.scss";
import ModelCanvas from "./ModelCanvas";
import Modal from "./Modal/index";

import Select from "react-select";
import personalStore from "../store";

const SignupForm = () => {
  const cities = personalStore((state) => state.cities);
  const districts = personalStore((state) => state.selectedDistricts);
  const addPersonal = personalStore((state) => state.addPersonal);
  const getDistricts = personalStore((state) => state.getDistricts);
  const addressTypes = personalStore((state) => state.addressTypes);

  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [personalData, setPersonalData] = useState({
    name: "",
    surname: "",
    birthday: "",
    birthdayPlace: "",
    city: null,
    district: null,
    phone: null
  });
  useEffect(() => {
    console.log(selectedCityId);
    getDistricts(selectedCityId);
  }, [selectedCityId, getDistricts]);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChnage = (e) => {
    const { value, id } = e.target;

    setPersonalData((prev) => {
      return { ...prev, [id]: value };
    });

    console.log(personalData);
  };

  useEffect(() => {
    setCityOptions(() => cities);

    return () => {
      setCityOptions([]);
    };
  }, [cities]);

  return (
    <div class="signup-container">
      <div class="left-container">
        <ModelCanvas />
      </div>
      <div class="right-container">
        <header>
          <h3 class="form-tile">Person Registiration Form</h3>
          <div class="set">
            <div class="name">
              <label for="name">Name</label>
              <input
                id="name"
                placeholder="Name"
                type="text"
                value={personalData.name}
                onChange={handleChnage}
              />
            </div>
            <div class="name">
              <label htmlFor="surname">Surname</label>
              <input
                id="surname"
                placeholder="Surname"
                type="text"
                value={personalData.surname}
                onChange={handleChnage}
              />
            </div>
          </div>
          <div class="set">
            <div class="breed">
              <label for="breed">Birthday Place</label>
              <input
                id="birthdayPlace"
                placeholder="Birthday Place"
                type="text"
                value={personalData.birthdayPlace}
                onChange={handleChnage}
              />
            </div>
            <div class="birthday">
              <label for="birthday">Birthday</label>
              <input
                id="birthday"
                placeholder="MM/DD/YYYY"
                type="date"
                onChange={handleChnage}
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
          <div className="divider" />
          <div class="set">
            <div class="adress-city">
              <label htmlFor="cities">Cities</label>
              {cities && (
                <Select
                  id="city"
                  options={cityOptions}
                  styles={{ height: "40px" }}
                  onChange={(newVal) => {
                    setPersonalData((prev) => {
                      return { ...prev, city: newVal.value };
                    });
                    console.log(newVal);
                    setSelectedCityId(() => newVal.id);
                  }}
                />
              )}
            </div>

            <div class="adress-city">
              <label htmlFor="cities">Districts</label>
              {cities && (
                <Select
                  id="district"
                  isDisabled={!personalData && !personalData.city}
                  options={districts}
                  onChange={(newVal) => {
                    setPersonalData((prev) => {
                      return { ...prev, district: newVal.value };
                    });
                  }}
                />
              )}
            </div>
          </div>
          <div class="set">
            <div class="address-type">
              <label htmlFor="address-types">Address Type</label>
              {cities && (
                <Select
                  id="city"
                  options={addressTypes}
                  styles={{ width: "80%" }}
                  onChange={(newVal) => {}}
                />
              )}
              <div className="add-address-type-btn" onClick={toggleModal}>
                +
              </div>
              <Modal onClose={toggleModal} show={isOpen} />
            </div>
          </div>

          <div class="set">
            <div class="address-type">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                value={personalData.phone}
                onChnage={handleChnage}
              />
            </div>
          </div>
        </header>
        <footer>
          <div class="set">
            <button id="next" onClick={() => addPersonal(personalData)}>
              Submit
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SignupForm;
