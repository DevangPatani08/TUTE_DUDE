import { Table, Button } from 'react-bootstrap';

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className={transaction.type === 'income' ? 'text-success' : 'text-danger'}>
                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
              </td>
              <td>₹{transaction.amount?.toLocaleString() || '0'}</td>
              <td>{transaction.category}</td>
              <td>{transaction.date}</td>
              <td>{transaction.description || '-'}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={() => onEdit(transaction)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => onDelete(transaction.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">No transactions found</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TransactionTable;