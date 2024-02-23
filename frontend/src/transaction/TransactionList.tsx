import { Table } from 'antd';
import type { TableProps } from 'antd';
import { Transaction } from './models';

export type TransactionListParams = {
  data: Transaction[];
};

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
];

export function TransactionList({ data }: TransactionListParams) {
  return <Table
    columns={columns}
    dataSource={data}
    rowKey={'transactionId'}
    pagination={false}
    />
}
