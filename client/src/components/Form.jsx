import React, { useState, useEffect } from "react";

function Form({ fields, setFields, formIndex }) {
  const [fieldType, setFieldType] = useState("text");
  const [label, setLabel] = useState("");

  const addField = () => {
    if (label.trim() === "") return;

    const newField = {
      type: fieldType,
      label: label.trim(),
      ...(fieldType === "radio" || fieldType === "checkbox"
        ? { options: ["Option 1"] }
        : {})
    };

    setFields((prevFields) => [...prevFields, newField]);
    setLabel("");
  };

  const moveField = (from, to) => {
    const updated = [...fields];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setFields(updated);
  };

  const removeField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const updateFieldLabel = (index, newLabel) => {
    const updated = [...fields];
    updated[index].label = newLabel;
    setFields(updated);
  };

  const updateOption = (fieldIndex, optIndex, newValue) => {
    const updated = [...fields];
    updated[fieldIndex].options[optIndex] = newValue;
    setFields(updated);
  };

  const addOption = (fieldIndex) => {
  const updated = [...fields];
  const field = updated[fieldIndex];

  // Ensure options exists
  if (!Array.isArray(field.options)) {
    field.options = [];
  }

  field.options.push(`Option ${field.options.length + 1}`);
  setFields(updated);
};


  const removeOption = (fieldIndex, optIndex) => {
    const updated = [...fields];
    updated[fieldIndex].options.splice(optIndex, 1);
    setFields(updated);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow">
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Field Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="border p-2"
        />
        <select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          className="border p-2"
        >
          <option value="text">Text Input</option>
          <option value="radio">Radio Button</option>
          <option value="checkbox">Checkbox</option>
        </select>
        <button
          onClick={addField}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Field
        </button>
      </div>

      {fields.length > 0 ? (
        fields.map((field, index) => (
          <div key={index} className="p-4 border rounded space-y-2">
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateFieldLabel(index, e.target.value)}
              className="border w-full p-2"
            />
            <div className="text-sm text-gray-600">Type: {field.type}</div>

            {(field.type === "radio" || field.type === "checkbox") && (
              <div className="space-y-1">
                <label className="font-medium">Options:</label>
                {field.options?.map((opt, optIdx) => (
                  <div key={optIdx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) =>
                        updateOption(index, optIdx, e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                    <button
                      onClick={() => removeOption(index, optIdx)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addOption(index)}
                  className="text-blue-500 text-sm"
                >
                  + Add Option
                </button>
              </div>
            )}

            {/* Reorder Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                disabled={index === 0}
                onClick={() => moveField(index, index - 1)}
                className="text-sm text-gray-700 px-2 py-1 border rounded disabled:opacity-30"
              >
                ↑ Move Up
              </button>
              <button
                disabled={index === fields.length - 1}
                onClick={() => moveField(index, index + 1)}
                className="text-sm text-gray-700 px-2 py-1 border rounded disabled:opacity-30"
              >
                ↓ Move Down
              </button>
              <button
                onClick={() => removeField(index)}
                className="text-red-600 text-sm px-2 py-1 border rounded"
              >
                ✕ Remove Field
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No fields added yet.</p>
      )}
      
    </div>
  );
}

export default Form;
