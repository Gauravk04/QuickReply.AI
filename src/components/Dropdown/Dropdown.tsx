import React, { useState } from 'react';
import { Info, UserCircle, Check } from 'phosphor-react';
import './Dropdown.scss';

type DropdownType = 'SingleNoIcon' | 'SingleRadio' | 'Multi';

export interface DropdownProps {
  label: string;
  labelVisibility: 'Visible' | 'Hidden';
  status: 'Unfilled' | 'Filled' | 'Disabled' | 'Error';
  labelIconVisibility: 'Visible' | 'Hidden';
  leftIconVisibility: 'Visible' | 'Hidden';
  helperText: string;
  required: boolean;
  text: string;
  type: DropdownType;
  activeItemIndex: number;
  items: string[];
  onItemSelect?: (item: string, index: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  labelVisibility,
  status,
  labelIconVisibility,
  leftIconVisibility,
  helperText,
  required,
  text,
  type,
  activeItemIndex,
  items,
  onItemSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item: string, index: number) => {
    if (type === 'Multi') {
      setSelectedItems((prev) => {
        if (prev.includes(item)) {
          return prev.filter((i) => i !== item);
        } else {
          return [...prev, item];
        }
      });
    } else {
      if (onItemSelect) {
        onItemSelect(item, index);
      }
      setSelectedItems([item]);
      setIsOpen(false);
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'Unfilled':
        return 'dropdown--unfilled';
      case 'Filled':
        return 'dropdown--filled';
      case 'Disabled':
        return 'dropdown--disabled';
      case 'Error':
        return 'dropdown--error';
      default:
        return '';
    }
  };

  return (
    <div className={`dropdown ${getStatusClass()} ${isOpen ? 'dropdown--open' : ''}`}>
      {labelVisibility === 'Visible' && (
        <div className="dropdown__label">
          {labelIconVisibility === 'Visible' && <Info />}
          {label} {required && '*'}
        </div>
      )}
      <div className="dropdown__input" onClick={toggleDropdown} role="button" tabIndex={0} aria-haspopup="true" aria-expanded={isOpen}>
        {leftIconVisibility === 'Visible' && <UserCircle />}
        <input type="text" value={text} readOnly disabled={status === 'Disabled'} aria-label={label} />
      </div>
      {isOpen && (
        <div className="dropdown__menu" role="menu" aria-label="Dropdown Menu">
          {items.map((item, index) => (
            <div
              key={index}
              className={`dropdown__item ${selectedItems.includes(item) ? 'dropdown__item--active' : ''}`}
              role="menuitem"
              onClick={() => handleItemClick(item, index)}
            >
              {type === 'Multi' ? <input type="checkbox" checked={selectedItems.includes(item)} readOnly /> : null}
              {type === 'SingleRadio' ? <input type="radio" name="dropdown" checked={selectedItems.includes(item)} readOnly /> : null}
              {type === 'SingleNoIcon' && selectedItems.includes(item) ? <Check /> : null}
              {item}
            </div>
          ))}
        </div>
      )}
      {helperText && <div className="dropdown__helper-text">{helperText}</div>}
    </div>
  );
};

export default Dropdown;
