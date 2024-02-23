import { Form, FormInstance, Input, InputNumber } from 'antd';
import { Transaction } from './models';

export type TransactionFormParams = {
  form: FormInstance;
  name: string;
  transaction?: Transaction | null;
};

export function TransactionForm({ form, name, transaction }: TransactionFormParams) {
  
  return (
    <Form
      form={form}
      name={name}
      layout='vertical'
      initialValues={transaction ?? {}}
    >
      <Form.Item<Transaction>
        label='Description'
        name='description'
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<Transaction>
        label='Amount'
        name='amount'
        rules={[{ required: true, message: 'Please enter an whole amount greater than 0!' }]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item<Transaction>
        label='From Account'
        name='fromAccount'
        rules={[{ required: true, message: 'Please enter a From Account!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<Transaction>
        label='To Accoount'
        name='toAccount'
        rules={[{ required: true, message: 'Please enter a To Account!' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}
