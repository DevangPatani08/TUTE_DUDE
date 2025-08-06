import { createContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    currency: '₹'
  });

  // Load data from localStorage on render
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedBudgets = localStorage.getItem('budgets');
    const savedUser = localStorage.getItem('user');

    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save data to localStorage on changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('budgets', JSON.stringify(budgets));
    localStorage.setItem('user', JSON.stringify(user));
  }, [transactions, budgets, user]);

  // Add default data
  useEffect(() => {
    if (transactions.length === 0 && budgets.length === 0) {
      const defaultTransactions = [
        { id: 1, type: 'income', amount: 50000, category: 'salary', date: new Date().toISOString().split('T')[0], description: 'Monthly salary' },
        { id: 2, type: 'expense', amount: 10000, category: 'rent', date: new Date().toISOString().split('T')[0], description: 'House rent' },
        { id: 3, type: 'expense', amount: 5000, category: 'groceries', date: new Date().toISOString().split('T')[0], description: 'Monthly groceries' },
        { id: 4, type: 'expense', amount: 2000, category: 'entertainment', date: new Date().toISOString().split('T')[0], description: 'Movie tickets' },
        { id: 5, type: 'expense', amount: 1000, category: 'entertainment', date: new Date().toISOString().split('T')[0], description: 'Lunch Outside' },
      ];

      const defaultBudgets = [
        { id: 1, category: 'groceries', amount: 6000 },
        { id: 2, category: 'entertainment', amount: 3500 },
        { id: 3, category: 'transport', amount: 2000 },
      ];

      setTransactions(defaultTransactions);
      setBudgets(defaultBudgets);
    }
  }, []);


  // Transaction Actions
  const addTransaction = (transaction) => { setTransactions([...transactions, { ...transaction, id: Date.now() }]); };
  const updateTransaction = (id, updatedTransaction) => { setTransactions(transactions.map(t => t.id === id ? { ...updatedTransaction, id } : t)); };
  const deleteTransaction = (id) => { setTransactions(transactions.filter(t => t.id !== id)); };

  // Budget Actions
  const addBudget = (budget) => { setBudgets([...budgets, { ...budget, id: Date.now() }]); };
  const updateBudget = (id, updatedBudget) => { setBudgets(budgets.map(b => b.id === id ? { ...updatedBudget, id } : b)); };
  const deleteBudget = (id) => { setBudgets(budgets.filter(b => b.id !== id)); };

  // Update Profile
  const updateUser = (updatedUser) => { setUser(updatedUser); };

  // Calculate summary values
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + (t.amount || 0), 0);
  const remainingBudget = totalIncome - totalExpenses;
  const savings = Math.max(0, remainingBudget);

  return (
    <FinanceContext.Provider value={{
      transactions,
      budgets,
      user,
      totalIncome,
      totalExpenses,
      remainingBudget,
      savings,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addBudget,
      updateBudget,
      deleteBudget,
      updateUser
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export { FinanceContext, FinanceProvider };