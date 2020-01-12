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
          id:props.student.id
        };
      }

      handleClose=()=> {
          this.setState({show: false});
          return (this.state.show);
      }

      onSubmit=()=> {
          let url = "https://localhost:8443/students/"+this.state.id ;
          fetch(url, 
            {
              // headers: {
              //   'Accept': 'application/json',
              //   'Content-Type': 'application/json'
              // },
              method: 'PATCH',                                                              
              body: 
              JSON.stringify( 
                { firstName: this.state.firstName } 
                )                                        
            })
              //method: 'patch',
              // body:
              //   "lastName": "string",
              //   "firstName": "string",
              //   "session": "string",
              //   "mail": "string",
              //   "avatar": "string",
              //   "projects": [
              //       "string"
              //   ],
              //   "jobCard": "string"
            .then(resp => resp.json())
            // .then((data) =>
            //   this.setState({student}))
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
                      <Form.Control type="email" defaultValue={student.mail}/>
                      <Form.Text className="text-muted">
                          Enter an email.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
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
