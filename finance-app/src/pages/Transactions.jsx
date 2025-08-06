import { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { toast } from 'react-toastify';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import TransactionTable from '../components/TransactionTable';

const Transactions = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useContext(FinanceContext);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTransaction({
      ...currentTransaction,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      updateTransaction(currentTransaction.id, currentTransaction);
      toast.success('Transaction updated successfully!');
    } else {
      addTransaction(currentTransaction);
      toast.success('Transaction added successfully!');
    }
    
    handleClose();
  };

  const handleEdit = (transaction) => {
    setCurrentTransaction(transaction);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.success('Transaction deleted successfully!');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentTransaction({
      type: 'expense',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Transactions</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Transaction
        </Button>
      </div>

      <TransactionTable 
        transactions={transactions} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit' : 'Add'} Transaction</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select 
                name="type" 
                value={currentTransaction.type}
                onChange={handleInputChange}
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={currentTransaction.amount}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={currentTransaction.category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={currentTransaction.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentTransaction.description}
                onChange={handleInputChange}
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

export default Transactions;