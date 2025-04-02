import React from "react";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex gap-6 items-center">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectedGender === "male"? "selected":""}`.trim()}>
          <span className="label-text text-white/80">Male</span>
          <input type="checkbox" className="checkbox checkbox-sm border-blue-500 checked:border-blue-500 checked:bg-blue-500" 
          checked={selectedGender==="male"}
          onChange={()=>onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectedGender === "female"? "selected":""}`.trim()}>
          <span className="label-text text-white/80">Female</span>
          <input type="checkbox" className="checkbox checkbox-sm border-blue-500 checked:border-blue-500 checked:bg-blue-500"
          checked={selectedGender==="female"}
          onChange={()=>onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
