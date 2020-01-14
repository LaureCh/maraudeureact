import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

class EditProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showEdit,
          project: props.project,
          name: props.project.name,
          zip: props.project.zip,
          students: props.project.students,
          id: props.project.id
        };
      }

      handleClose=()=> {
          this.setState({show: false});
          return (this.state.show);
      }

      onSubmit() {
          fetch("https://localhost:8443/projects/"+this.state.id, 
            {
              method: 'PATCH',
              headers: {
                 'Content-Type': 'application/merge-patch+json'
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
          }

      render() {
         const { show } = this.state;
         const { project } = this.state;

      return (
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Name</Form.Label>
                      <Form.Control 
                        type="name" 
                        defaultValue={project.name}
                        onChange = {(event) => this.setState({name: event.target.value })}/>
                      <Form.Text className="text-muted">
                          Enter a name
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicZip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control 
                        type="zip" 
                        defaultValue={project.zip}
                        onChange = {(event) => this.setState({zip: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Enter a zip
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicSelect">
                      <Form.Label>Choose students</Form.Label>
                      <Form.Control 
                        type="student" 
                        defaultValue={project.students}
                        onChange = {(event) => this.setState({students: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Choose students.
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

export default EditProject;
