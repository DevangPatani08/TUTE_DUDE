import { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { toast } from 'react-toastify';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';
import CurrencyDropdown from '../components/CurrencyDropdown';

const Profile = () => {
  const { user, totalIncome, totalExpenses, remainingBudget, updateUser } = useContext(FinanceContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCurrencyChange = (currency) => {
    setFormData({
      ...formData,
      currency
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    toast.success('Profile updated successfully!');
    setEditMode(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Profile</h2>
        {!editMode && (
          <Button variant="primary" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      {editMode ? (
        <Card className="p-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Default Currency</Form.Label>
              <CurrencyDropdown 
                selectedCurrency={formData.currency}
                onSelect={handleCurrencyChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setEditMode(false)} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      ) : (
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Name:</strong> {user.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {user.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Default Currency:</strong> {user.currency}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Lifetime Total Income:</strong> {user.currency}{totalIncome.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Lifetime Total Expenses:</strong> {user.currency}{totalExpenses.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Lifetime Total Savings:</strong> {user.currency}{Math.max(0, remainingBudget).toLocaleString()}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}
    </div>
  );
};

export default Profile;