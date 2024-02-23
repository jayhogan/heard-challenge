
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Transaction } from './models';
import { TransactionList } from './TransactionList';
import { CreateTransaction } from './CreateTransaction';
import { UpdateTransaction } from './UpdateTransaction';
import { PageHeader } from '../shared';

export function Transactions() {
  const [loaded, setLoaded] = useState(false);
  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

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
  }, [refreshCount]);

  const dataChanged = () => {
    // Force data refetch
    setRefreshCount(refreshCount + 1);
  }

  const onEdit = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setOpenEdit(true);
  };

  return <>
    <PageHeader>Transaction List</PageHeader>
    {!loaded && 'Loading...'}  {/* Would use a spinner or skeleton in a larger app*/}
    {loaded && (
      <div>
        <Button onClick={() => setOpenCreate(true)}>+ Add</Button>
        <TransactionList
          data={transactions}
          onEdit={onEdit}
        />
        <CreateTransaction
          open={openCreate}
          onCreate={() => {
            setOpenCreate(false);
            dataChanged();
          }}
          onCancel={() => setOpenCreate(false)}
        />
        <UpdateTransaction
          open={openEdit}
          transactionId={selectedTransactionId}
          onUpdate={() => {
            setOpenEdit(false);
            dataChanged();
          }}
          onCancel={() => setOpenEdit(false)}
          />
      </div>
    )}
  </>
}
