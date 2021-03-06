import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

class EditStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showEdit,
          student: props.student,
          lastName: props.student.lastName,
          firstName: props.student.firstName,
          session: props.student.session,
          mail: props.student.mail,
          id: props.student.id
        };
      }

      handleClose=()=> {
          this.setState({show: false});
          return (this.state.show);
      }

      onSubmit() {
          fetch("https://localhost:8443/students/"+this.state.id, 
            {
              method: 'PATCH',
              headers: {
                 'Content-Type': 'application/merge-patch+json'
              },
              body: 
                JSON.stringify( 
                  {  
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    mail: this.state.mail
                  } 
                )                                        
            })
          }

      render() {
         const { show } = this.state;
         const { student } = this.state;

      return (
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>LastName</Form.Label>
                      <Form.Control 
                        type="lastname" 
                        defaultValue={student.lastName}
                        onChange = {(event) => this.setState({lastName: event.target.value })}/>
                      <Form.Text className="text-muted">
                          Enter a lastName
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>FirstName</Form.Label>
                      <Form.Control 
                        type="firstname" 
                        defaultValue={student.firstName}
                        onChange = {(event) => this.setState({firstName: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Enter a firstName
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control 
                        type="email" 
                        defaultValue={student.mail}
                        onChange = {(event) => this.setState({firstName: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Enter an email.
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

export default EditStudent;
