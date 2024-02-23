
import { useEffect, useState } from 'react';
import { Transaction } from './models';
import { TransactionList } from './TransactionList';
import { PageHeader } from '../shared';

export function Transactions() {
  const [loaded, setLoaded] = useState(false);
  const [transactions, setTransactions] = useState([] as Transaction[]);

  useEffect(() => {
    // Would use something like ReactQuery in a larger app
    const fetchTransactions = async () => {
      const response = await fetch('/api/transaction')
      if (!response.ok) {
        // TODO - The app should have some consistent approach to error feedback 
        console.error(response);
        throw new Error(`${response.status} - ${response.statusText}`)
      }

      setLoaded(true);
      setTransactions(await response.json() as Transaction[]);
    }
    fetchTransactions().catch(console.error);
  }, []);

  return <>
    <PageHeader>Transaction List</PageHeader>
    {!loaded && 'Loading...'}  {/* Would use a spinner or skeleton in a larger app*/}
    {loaded && <TransactionList data={transactions}/>}
  </>
}
