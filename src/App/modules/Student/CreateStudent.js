import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

class CreateStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showCreate,
          lastName: null,
          firstName: null,
          session: null,
          mail: null,
          sessions: []
        };
      }

      async componentDidMount() {
        const json = await fetch('https://localhost:8443/sessions');
        const response = await json.json();
        const sessions = response['hydra:member'];
        this.setState({sessions});
        console.log({sessions});
  }

      handleClose=()=> {
          this.setState({show: false});
          return (this.state.show);
      }

      handleChange = (e) =>{
        this.setState({ session: "/sessions/"+e.target.value });
      }

    onSubmit() {
           fetch("https://localhost:8443/students", 
            {
                method: 'POST',
                headers: {
                 'Content-Type': 'application/json'
                },
                body: 
                    JSON.stringify( 
                        {
                            "firstName": this.state.firstName, 
                            "lastName": this.state.lastName,
                            "mail": this.state.mail,
                            "session": this.state.session
                        }
                )                                        
            })
            .then(resp => 
                resp.json());
          }

      render() {
         const { show } = this.state;
        const { sessions } = this.state;
      return (
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Student</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>LastName</Form.Label>
                      <Form.Control 
                        type="lastname" 
                        placeholder="LastName"
                        onChange = {(event) => this.setState({lastName: event.target.value })}/>
                      <Form.Text className="text-muted">
                          Enter a lastName
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>FirstName</Form.Label>
                      <Form.Control 
                        type="firstname" 
                        placeholder="FirstName"
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
                        placeholder="email"
                        onChange = {(event) => this.setState({mail: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Enter an email.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Session choice</Form.Label>
                            <Form.Control as="select" className="mb-3" onChange={this.handleChange}>
                            {sessions.map((session, i) =>
                                    <React.Fragment key={session.id}>
                                      <option value= {session.id}>{session.name}</option>
                                    </React.Fragment>
                                  )}
                            </Form.Control>
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

export default CreateStudent;
