import React, { useState } from "react";
import { StoreContext } from "@/store";
const FontSelect = () => {
  const [selectedFont, setSelectedFont] = useState("");
  const store = React.useContext(StoreContext);
  const handleFontChange = (event: any) => {
    const selectedFont = event.target.value;
    console.log('selectedFont: ===============================> ', selectedFont);
    setSelectedFont(selectedFont);
    store.setFontFamily(selectedFont);
  };

  return (
    <select
      value={selectedFont}
      onChange={handleFontChange}
      className="block w-full px-4 py-2 mt-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    >
      <option value="">Select Font</option>
      <option value="Arial">Arial</option>
      <option value="Times New Roman">Times New Roman</option>
      <option value="Verdana">Verdana</option>
      {/* Add more font options here */}
    </select>

  );
};

export default FontSelect;
