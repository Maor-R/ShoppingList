import React, { useState, useEffect, useRef } from "react";

const AutocompleteWithQuantity =  ({ availableItems }) => {

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue.length > 0) {
      console.log("selectedItems", selectedItems);
      const filteredSuggestions = availableItems.filter(
        (item) =>
          item.name.includes(inputValue) &&
          !selectedItems.some((selected) => selected.id === item.id)  
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, selectedItems]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectSuggestion = (item) => {
    setSelectedItems((prev) => [...prev, { ...item, quantity: 1 }]);  
    setInputValue("");  
    setSuggestions([]); 
    setEditingItemId(item.id);  
    setTimeout(() => {
       const quantityInput = document.getElementById(
        `quantity-input-${item.id}`
      );
      if (quantityInput) {
        quantityInput.focus();
        quantityInput.select();  
      }
       console.log("selectedItems", selectedItems);
      setItem("shoppingList", [...selectedItems, { ...item, quantity: 1 }]);
    }, 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: parseInt(newQuantity) || 0 }
          : item
      )
    );
          setItem("shoppingList",     selectedItems.map((item) =>
          item.id === itemId
            ? { ...item, quantity: parseInt(newQuantity) || 0 }
            : item
        ));

  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleStartEditingQuantity = (itemId) => {
    setEditingItemId(itemId);
    setTimeout(() => {
      const quantityInput = document.getElementById(`quantity-input-${itemId}`);
      if (quantityInput) {
        quantityInput.focus();
        quantityInput.select();
      }
    }, 0);
  };

  const handleBlurQuantity = () => {
    setEditingItemId(null); // יוצאים ממצב עריכה כשהמיקוד עוזב
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="item-search"
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          הוסף מוצר לסל:
        </label>
        <input
          id="item-search"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="שם המוצר"
          ref={inputRef}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              margin: "5px 0 0 0",
              border: "1px solid #eee",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {suggestions.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectSuggestion(item)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3>פריטים שנבחרו:</h3>
      {selectedItems.length === 0 ? (
        <p style={{ color: "#666" }}>עדיין לא נבחרו פריטים.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: "0" }}>
          {selectedItems.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px dashed #eee",
              }}
            >
              <div
                style={{ flexGrow: 1, display: "flex", alignItems: "center" }}
              >
                <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                  {item.name}
                </span>
                {editingItemId === item.id ? (
                  <input
                    id={`quantity-input-${item.id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    onBlur={handleBlurQuantity}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setEditingItemId(null); // יוצאים ממצב עריכה בלחיצת אנטר
                        inputRef.current.focus(); // מחזירים מיקוד לשדה החיפוש
                      }
                    }}
                    min="0"
                    style={{
                      width: "80px",
                      padding: "5px",
                      fontSize: "14px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  />
                ) : (
                  <span
                    onClick={() => handleStartEditingQuantity(item.id)}
                    style={{ cursor: "pointer", color: "#007bff" }}
                  >
                    &nbsp;&nbsp; - {item.quantity}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                הסר
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default AutocompleteWithQuantity;

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
 