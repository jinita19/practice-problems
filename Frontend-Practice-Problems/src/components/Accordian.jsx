import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Accordion() {
  const [isMultiple, setIsMultiple] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await fetch('/accordian.json');
            const data = await res.json();
            setItems(data);
        } catch (e) {
            console.log('Error fetching data:', e);
        }
    };

    fetchData();
  }, [])

  const checkIfSelected = (index) =>
    isMultiple ? selectedIds.includes(index) : selectedId === index;

  const toggleAccordian = (index) => {
    if (isMultiple) {
      setSelectedIds((prev) =>
        prev.includes(index)
          ? prev.filter((id) => id !== index)
          : [...prev, index]
      );
    } else {
      setSelectedId((prev) => (prev === index ? null : index));
    }
  };

  const toggleCheckbox = () => {
    if (!isMultiple) {
      setSelectedIds([selectedId]);
    } else {
        setSelectedId(null);
    }
    setIsMultiple(!isMultiple);
  };

  return (
    <div>
      <div
        style={{
          fontWeight: "bold",
          textAlign: "right",
          margin: "10px",
        }}
      >
        <input
          id="checkbox"
          type="checkbox"
          checked={isMultiple}
          onChange={toggleCheckbox}
        />
        <label htmlFor="checkbox">Multiple</label>
      </div>

      {items.map((item, index) => {
        const expanded = checkIfSelected(index);
        const contentId = `accordion-content-${index}`;
        const headingId = `accordion-header-${index}`;

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "98%",
              margin: "10px",
            }}
            key={index}
          >
            <button
              style={{
                background: "lightgray",
                padding: "12px 10px",
                fontWeight: "bold",
                position: "relative",
                cursor: "pointer",
                textAlign: "left",
                border: "none",
              }}
              onClick={() => toggleAccordian(index)}
              id={headingId}
              aria-controls={contentId}
              aria-expanded={expanded}
            >
              {item.title}
              <span style={{ position: "absolute", right: "10px" }}>
                {expanded ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {expanded && (
              <div
                style={{
                  padding: "5px 14px",
                }}
                id={contentId}
                aria-labelledby={headingId}
                role="region"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
