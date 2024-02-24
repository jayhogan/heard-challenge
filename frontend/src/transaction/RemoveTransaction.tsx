import { Modal } from 'antd';
import { Transaction } from './models';

export type RemoveTransactionParams = {
  transactionId: string | null;
  open: boolean;
  onRemove: (transaction: Transaction) => void;
  onCancel: () => void;
};

export function RemoveTransaction({
  transactionId,
  open,
  onRemove,
  onCancel,
}: RemoveTransactionParams) {
  
  const removeTransaction = async (): Promise<Transaction> => {
    const response = await fetch(`/api/transaction/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      }
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
      title="Remove Transaction?"
      okText="Yes"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        removeTransaction()
          .then(onRemove)
          .catch(console.error);
      }}
    >
        Are you sure want to remove this transaction?
    </Modal>
  )
}
