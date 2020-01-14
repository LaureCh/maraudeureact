import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

class CreateProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showCreate,
          name: null,
          zip: null,
          students: props.students
        };
      }

      handleClose=()=> {
          this.setState({show: false});
          return (this.state.show);
      }

      handleChange = (e) =>{
        this.setState({ students: "/projects/"+e.target.value });
      }

    onSubmit() {
          fetch("https://localhost:8443/projects", 
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: 
                    JSON.stringify( 
                        {
                            name: this.state.name, 
                            zip: this.state.zip,
                            students: this.state.students
                        }
                )                                        
            })
          this.componentDidUpdate();
          }

      render() {
        const { show } = this.state;

        return(
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Project</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Name</Form.Label>
                      <Form.Control 
                        type="name" 
                        placeholder="Name"
                        onChange = {(event) => this.setState({name: event.target.value })}/>
                      <Form.Text className="text-muted">
                          Enter a name
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicZip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control 
                        type="zip" 
                        placeholder="Zip"
                        onChange = {(event) => this.setState({zip: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Dl a zip
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicSelect">
                      <Form.Label>Students</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Students"
                        onChange = {(event) => this.setState({students: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                        Choose student(s).  
                      </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={()=>this.onSubmit()}>
                      Submit
                    </Button>
                  </Form>
                </Modal.Body>

              </Modal>
              </>
          );

        }
  }

export default CreateProject;
