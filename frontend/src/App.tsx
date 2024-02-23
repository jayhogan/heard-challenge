import { Layout, Flex } from 'antd'
import { Transactions } from './transaction'

const { Footer, Content } = Layout

function App() {
  const layoutStyle = {
    overflow: 'hidden',
  };

  const contentStyle: React.CSSProperties = {
    padding: '20px',
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    paddingTop: 0,
  };

  const heardStyle: React.CSSProperties = {
    color: '#226752',
    fontFamily: 'Verdana'
  };

  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>
          {/* A router would go here in a larger app */}
          <Transactions />
        </Content>
        <Footer style={footerStyle}>
          Made with &#10084; for <span style={heardStyle}>Heard</span> by Jay Hogan
        </Footer>
      </Layout>
    </Flex>
  )
}

export default App
