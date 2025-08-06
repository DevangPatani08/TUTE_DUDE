import { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import SummaryCard from '../components/SummaryCard';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Table, Card, Row, Col } from 'react-bootstrap';

Chart.register(...registerables);

const Dashboard = () => {
  const { transactions, totalIncome, totalExpenses, remainingBudget } = useContext(FinanceContext);
  
  const summaryData = [
    { 
      title: 'Total Income', 
      amount: totalIncome.toFixed(2), 
      variant: 'success',
    },
    { 
      title: 'Total Expenses', 
      amount: totalExpenses.toFixed(2), 
      variant: 'danger',
    },
    { 
      title: 'Remaining Budget', 
      amount: remainingBudget.toFixed(2), 
      variant: remainingBudget >= 0 ? 'info' : 'warning',
    },
    { 
      title: 'Savings', 
      amount: remainingBudget >= 0 ? remainingBudget : 0, 
      variant: 'warning',
    },
  ];

  // Today's expenses
  const today = new Date().toISOString().split('T')[0];
  const todaysExpenses = transactions.filter(t => t.type === 'expense' && t.date === today).map(t => ({ ...t, amount: Number(t.amount) }));

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      
      <Row className="mb-4">
        {summaryData.map((data, i) => (
          <Col key={i} md={6} lg={3}>
            <SummaryCard title={data.title} amount={data.amount} variant={data.variant} />
          </Col>
        ))}
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Monthly Spending Trend</Card.Title>
              <div className="text-center py-4">
                <p className="text-muted">Chart will be displayed here</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Category-wise Expense Split</Card.Title>
              <div className="text-center py-4">
                <p className="text-muted">Chart will be displayed here</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="card p-3">
        <h5>Today's Expenses</h5>
        {todaysExpenses.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {todaysExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No expenses recorded for today.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;