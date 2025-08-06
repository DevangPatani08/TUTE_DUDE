import { Dropdown } from 'react-bootstrap';

const currencies = [
  { symbol: '₹', name: 'Indian Rupee' },
  { symbol: '$', name: 'US Dollar' },
  { symbol: '€', name: 'Euro' },
  { symbol: '£', name: 'British Pound' },
  { symbol: '¥', name: 'Japanese Yen' },
];

const CurrencyDropdown = ({ selectedCurrency, onSelect }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        {selectedCurrency}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {currencies.map((currency) => (
          <Dropdown.Item 
            key={currency.symbol} 
            onClick={() => onSelect(currency.symbol)}
            active={currency.symbol === selectedCurrency}
          >
            {currency.symbol} - {currency.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CurrencyDropdown;