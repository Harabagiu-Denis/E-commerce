
import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col classNmae = 'text center py-3'>
                    Copyright &copy; ProShop
                </Col>
            </Row>
        </Container>
        </footer>
  )
}

export default Footer
