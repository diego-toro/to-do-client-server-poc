import { createContext, useContext, useState } from "react";

import styles from "./Dropdown.module.css";
import { FiChevronDown } from "react-icons/fi";
import { useClickAway } from "../../utils/useClickAway";
import Card from "../Card/Card";

const DropdownContext = createContext({});

const Dropdown = ({
  placeHolder,
  onChange,
  children,
  value,
  label,
  multiple,
}) => {
  const [isOpen, setShowMenu] = useState(false);

  const ref = useClickAway(() => {
    setShowMenu(false);
  });

  const handleInputClick = () => {
    setShowMenu(!isOpen);
  };

  const handleOptionSelected = (itemValue, event) => {
    if (multiple) {
      const newValue = value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue];
      onChange(newValue, event);
    } else {
      setShowMenu(false);
      onChange(itemValue, event);
    }
  };

  return (
    <DropdownContext.Provider
      value={{ selectedValue: value, onChange: handleOptionSelected, multiple }}
    >
      <div ref={ref} className={styles.container}>
        <button onClick={handleInputClick} className={styles.control}>
          {multiple ? (
            <span>
              {value?.length ? label ?? value.join(",") : placeHolder}
            </span>
          ) : (
            <span>{value ? label ?? value : placeHolder}</span>
          )}
          <FiChevronDown className={styles.chevron} />
        </button>
        {isOpen && <Card className={styles.menu}>{children}</Card>}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;

export function DropdownItem({ value, children, className }) {
  const { selectedValue, onChange, multiple } = useContext(DropdownContext);

  const isSelected = multiple
    ? selectedValue?.includes(value)
    : value === selectedValue;

  return (
    <button
      className={`${styles.option} ${isSelected ? styles.active : ""}`}
      role="menuitem"
      type="button"
      onClick={(event) => onChange(value, event)}
    >
      <div className={className}>{children}</div>
    </button>
  );
}
