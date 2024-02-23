import { Form, Modal } from 'antd';
import { Transaction } from './models';
import { TransactionForm } from './TransactionForm';

export type CreateTransactionParams = {
  open: boolean;
  onCreate: (transaction: Transaction) => void;
  onCancel: () => void;
};

export function CreateTransaction({ open, onCreate, onCancel }: CreateTransactionParams) {
  const [form] = Form.useForm();

  const createTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const response = await fetch('/api/transaction', {
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
      title="Create Transaction"
      okText="Create"
      cancelText="Close"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(createTransaction)
          .then((transaction: Transaction) => {
            form.resetFields();
            onCreate(transaction);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <TransactionForm form={form} name='createTransaction' />
    </Modal>
  )
}
