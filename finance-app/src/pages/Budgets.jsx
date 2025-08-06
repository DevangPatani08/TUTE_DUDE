import { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { toast } from 'react-toastify';
import { Button, Modal, Form, ProgressBar, Card } from 'react-bootstrap';

const Budgets = () => {
  const { budgets, transactions, addBudget, updateBudget, deleteBudget } = useContext(FinanceContext);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBudget, setCurrentBudget] = useState({
    category: '',
    amount: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBudget({
      ...currentBudget,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      updateBudget(currentBudget.id, currentBudget);
      toast.success('Budget updated successfully!');
    } else {
      addBudget(currentBudget);
      toast.success('Budget added successfully!');
    }
    
    handleClose();
  };

  const handleEdit = (budget) => {
    setCurrentBudget(budget);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudget(id);
      toast.success('Budget deleted successfully!');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentBudget({
      category: '',
      amount: ''
    });
  };

  // Calculate spent amount for each budget category
  const budgetsWithSpent = budgets.map(budget => {
    const spent = transactions.filter(t => t.type === 'expense' && t.category === budget.category).reduce((sum, t) => sum + (t.amount || 0), 0);
    const percentage = budget.amount > 0 ? Math.min(100, (spent / budget.amount) * 100) : 0;
    return {
      ...budget,
      spent,
      percentage
    };
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Budgets</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Budget
        </Button>
      </div>

      <div className="row">
        {budgetsWithSpent.map((budget) => (
          <div key={budget.id} className="col-md-6 mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title>{budget.category}</Card.Title>
                  <div>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => handleEdit(budget)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => handleDelete(budget.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span>₹{budget.spent} of ₹{budget.amount}</span>
                  <span>{budget.percentage.toFixed(1)}%</span>
                </div>
                <ProgressBar 
                  variant={budget.percentage > 90 ? 'danger' : budget.percentage > 70 ? 'warning' : 'success'}
                  now={budget.percentage} 
                />
                {budget.spent > budget.amount && (
                  <div className="text-danger mt-2">
                    Budget exceeded by ₹{(budget.spent - budget.amount).toLocaleString()}
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit' : 'Add'} Budget</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={currentBudget.category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={currentBudget.amount}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editMode ? 'Update' : 'Save'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Budgets;