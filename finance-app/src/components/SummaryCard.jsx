import { Card } from 'react-bootstrap';

const SummaryCard = ({ title, value, variant }) => {
  // Ensure value is a number before formatting
  const formattedValue = typeof value === 'number' ? value.toLocaleString() : '0';
  return (
    <Card bg={variant} text="white" className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="fs-4">₹{formattedValue}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SummaryCard; 