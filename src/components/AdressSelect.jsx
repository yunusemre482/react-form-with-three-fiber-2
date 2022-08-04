import React from "react";
import Select from "react-select";
import personalStore from "../store";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  width: 60%;
  margin-left: auto;
`;

const AdressSelect = ({ setSelected }) => {
  const addressTypes = personalStore((state) => state.addressTypes);
  return <StyledSelect options={addressTypes}></StyledSelect>;
};

export default AdressSelect;
