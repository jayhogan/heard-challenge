import { Table, Space, Button } from 'antd';
import type { TableProps } from 'antd';
import { Transaction } from './models';

export type TransactionListParams = {
  data: Transaction[];
  onEdit: (transactionId: string) => void;
  onRemove: (transactionId: string) => void;
};

export function TransactionList({ data, onEdit, onRemove }: TransactionListParams) {
  const columns: TableProps<Transaction>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'transactionId',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'From Account',
      dataIndex: 'fromAccount',
    },
    {
      title: 'To Account',
      dataIndex: 'toAccount',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' onClick={() => onEdit(record.transactionId)}>Edit</Button>
          <Button danger onClick={() => onRemove(record.transactionId)}>Remove</Button>
        </Space>
      )
    },
  ];

  return <Table
    columns={columns}
    dataSource={data}
    rowKey={'transactionId'}
    pagination={false}
    />
}
