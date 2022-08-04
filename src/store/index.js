import create from "zustand";
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "vZjG1EqwMIfggp7ZnlJA";

const BASE_URL = "https://cast.netadim.com.tr";

const personalStore = create((set, get) => ({
  personals: [],
  addressTypes: [],
  cities: [],
  selectedDistricts: [],
  getPersonals: async () => {
    const response = await axios
      .get(`${BASE_URL}/api/personal`)
      .then((resp) => resp.data);

    console.log(response);
    set({
      personals: response.personals,
      addressTypes: response.address_type.map((item) => {
        return {
          id: item.id,
          value: item.type + item.id,
          label: item.type
        };
      }),
      cities: response.city.map((item) => {
        return {
          id: item.id,
          value: item.city + item.id,
          label: item.city
        };
      })
    });

    console.log(get().addressTypes);
  },
  getDistricts: async (payload = 1) => {
    const response = await axios
      .get(`${BASE_URL}/api/personal/district/${payload}`)
      .then((resp) => resp);

    set({
      selectedDistricts: response.data.district.map((item) => {
        return {
          id: item.id,
          value: item.district + item.id,
          label: item.district
        };
      })
    });
  },
  addPersonal: async (payload) => {
    const response = axios
      .post(`${BASE_URL}/api/personal/add`, payload)
      .then((resp) => resp);
  },
  addAddressType: async (payload) => {
    if (!payload) {
      return { error: true, messaage: "plase write address type field" };
    }
    const response = await axios
      .post(`${BASE_URL}/api/personal/address-type`, { type: payload })
      .then((resp) => resp);
    const item = response.data.address_type;
    set({
      addressTypes: [
        ...get().addressTypes,
        {
          id: item.id,
          value: item.type + item.id,
          label: item.type
        }
      ]
    });
    console.log(get().addressTypes);
    console.log(response);
  }
}));

export default personalStore;
