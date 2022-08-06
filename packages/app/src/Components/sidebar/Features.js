import { ListGroup, ListGroupItem } from 'reactstrap'

function Features() {
  return (
    <div className="mb-5">
      <h2 className="h2 features">Features</h2>
      <ListGroup>
        <ListGroupItem>Custom url code</ListGroupItem>
        <ListGroupItem>Custom metadata (ofc)</ListGroupItem>
        <ListGroupItem>Personal prefix (User account)</ListGroupItem>
        <ListGroupItem>Open Source!</ListGroupItem>
      </ListGroup>
    </div>
  )
}

export default Features
