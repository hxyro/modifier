import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import {
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Form,
} from "reactstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
);
const url = `/u/a/m`;

function Intro() {
  const [redirect_url, setRedirect_url] = useState("");
  const [title, setTitle] = useState("");
  const [asset_url, setAsset_url] = useState("");
  const [description, setDescription] = useState("");
  const [iferror, setIferror] = useState("");
  const [ifurl, setIfurl] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (newPos) => setPosition(newPos),
      console.error
    );
  }, []);

  const handleClose = () => setShow(false);

  const clear = () => {
    setRedirect_url("");
    setTitle("");
    setAsset_url("");
    setDescription("");
    setVisible(false);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    setIferror("");
    setIfurl("");
    setShow(false);
    const modifier_name = nanoid(6);
    const data = {
      redirect_url: redirect_url,
      modifier_name: modifier_name,
      title: title,
      asset_url: asset_url,
      description: description,
    };
    axios.post(url, data).then((res) => {
      if (res.data.url) {
        setIferror("");
        setIfurl("http://" + window.location.host + res.data.url);
        setShow(true);
        clear();
      } else {
        setIfurl("");
        setIferror("The Custom Url code is already in use");
        setShow(true);
        clear();
      }
    });
  };

  return (
    <Container className="text-center my-3 intro">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modified URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>{iferror ? iferror : ifurl}</Modal.Body>
        <Modal.Footer>
          {ifurl ? (
            <Button
              variant="primary"
              onClick={async () => {
                if ("clipboard" in navigator) {
                  await navigator.clipboard.writeText(ifurl);
                } else {
                  document.execCommand("copy", true, ifurl);
                }
                handleClose();
              }}
            >
              Copy
            </Button>
          ) : null}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 className="display-2">URL modifier V2</h1>
      <p className="lead">The Next-Gen URL Modifier</p>
      <p className="text-muted">Create Custom URLs & Embeds</p>
      <Row>
        <Col className="input-form text-start">
          {/* <Form action={url} method="post"> */}
          <Form onSubmit={(e) => formSubmit(e)}>
            <InputGroup>
              <InputGroupText>
                <i className="bi bi-link-45deg"></i>
              </InputGroupText>
              <Input
                required
                id="intro"
                name="redirect_url"
                value={redirect_url}
                onChange={(e) => setRedirect_url(e.target.value)}
                placeholder="Enter a link to modify"
              />
              {isVisible ? null : (
                <Button onClick={() => setVisible(true)}>Next</Button>
              )}
            </InputGroup>
            {isVisible ? (
              <div>
                {/* <InputGroup> */}
                {/*   <InputGroupText> */}
                {/*     <i className="bi bi-textarea-t"></i> */}
                {/*   </InputGroupText> */}
                {/*   <Input */}
                {/*     required */}
                {/*     type="text" */}
                {/*     name="modifier_name" */}
                {/*     value={modifier_name} */}
                {/*     onChange={(e) => setModifier_name(e.target.value)} */}
                {/*     id="url" */}
                {/*     placeholder="Custom url code (Alphanumeric characters)" */}
                {/*   /> */}
                {/* </InputGroup> */}

                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-card-heading"></i>
                  </InputGroupText>
                  <Input
                    required
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    placeholder="Title"
                  />
                </InputGroup>

                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-card-image"></i>
                  </InputGroupText>
                  <Input
                    required
                    type="url"
                    name="asset_url"
                    value={asset_url}
                    onChange={(e) => setAsset_url(e.target.value)}
                    id="image_url"
                    placeholder="Image url"
                  />
                </InputGroup>

                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-card-text"></i>
                  </InputGroupText>
                  <Input
                    required
                    type="textarea"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    placeholder="Description"
                  />
                </InputGroup>
                <Button type="submit">Submit</Button>
              </div>
            ) : null}
          </Form>
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "justify" }} className="my-3">
          <p>
            URL modifer lets you create a custom URL for any link, AND let you
            add the metadata that is shown in the embeds.
          </p>
          <p>
            This is works much like a URL shortner, but it's generalized and
            it's almost as if you've made a whole new website!
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Intro;
