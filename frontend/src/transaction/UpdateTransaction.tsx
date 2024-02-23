import { useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import { Transaction } from './models';
import { TransactionForm } from './TransactionForm';

export type UpdateTransactionParams = {
  transactionId: string | null;
  open: boolean;
  onUpdate: (transaction: Transaction) => void;
  onCancel: () => void;
};

export function UpdateTransaction({
  transactionId,
  open,
  onUpdate,
  onCancel,
}: UpdateTransactionParams) {
  const [loaded, setLoaded] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [form] = Form.useForm();
  const resourceUrl = `/api/transaction/${transactionId}`

  useEffect(() => {
    // Would use something like ReactQuery in a larger app, or create a custom hook
    const fetchTransaction = async () => {
      if (!transactionId) return;

      const response = await fetch(resourceUrl, { method: 'GET' })
      if (!response.ok) {
        // TODO - The app should have some consistent approach to error feedback 
        console.error(response);
        throw new Error(`${response.status} - ${response.statusText}`)
      }

      setTransaction(await response.json() as Transaction);
      setLoaded(true);
    }

    fetchTransaction().catch(console.error);
  }, [resourceUrl, transactionId]);
  
  const updateTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const response = await fetch(`/api/transaction/${transactionId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      // TODO - The app should have some consistent approach to error feedback 
      console.error(response);
      console.log(await response.json())
      throw new Error(`${response.status} - ${response.statusText}`)
    }

    return await response.json() as Transaction;
  };

  return (
    <Modal
      open={open}
      title="Update Transaction"
      okText="Update"
      cancelText="Close"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(updateTransaction)
          .then((transaction: Transaction) => {
            form.resetFields();
            onUpdate(transaction);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      {!loaded && 'Loading...'}
      {loaded && <TransactionForm form={form} name='updateTransaction' transaction={transaction}/>}
    </Modal>
  )
}
