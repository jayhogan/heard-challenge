import { Layout, Flex } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const { Header, Footer, Content } = Layout

function App() {
  const queryClient = new QueryClient()

  const layoutStyle = {
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#0958d9',
  };

  const contentStyle: React.CSSProperties = {
    minHeight: 400,
    padding: '20px',
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#0958d9',
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Flex gap="middle" wrap="wrap">
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>Transactions</Header>
          <Content style={contentStyle}>Content</Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Flex>
    </QueryClientProvider>
  )
}

export default App
