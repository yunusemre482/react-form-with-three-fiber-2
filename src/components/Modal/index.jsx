import React, { useState } from "react";
import "./index.css";
import personalStore from "../../store";
export default function Modal({ onClose, show }) {
  const addAddressType = personalStore((state) => state.addAddressType);

  const [addressType, setAddressType] = useState("");

  if (!show) {
    return null;
  }
  return (
    <div class="modal" id="modal">
      <div class="content">
        <label for="address-type">Birthday</label>
        <input
          id="address-type"
          placeholder="Enter Address Type"
          type="text"
          value={addressType}
          onChange={(e) => setAddressType(e.target.value)}
        />
      </div>
      <div class="actions">
        <button class="close-button" onClick={onClose}>
          Close
        </button>
        <button
          class="add-button"
          onClick={(e) => {
            addAddressType(addressType);
            onClose(e);
          }}
        >
          Add Adress
        </button>
      </div>
    </div>
  );
}
