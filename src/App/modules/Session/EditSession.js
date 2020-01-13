import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

class EditSession extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showEdit,
          session: props.session,
          name: props.session.name,
          startDate: props.session.startDate,
          endDate: props.session.endDate,
          id: props.session.id
        };
      }

      handleClose=()=> {
          this.setState({show: false});
          return (this.state.show);
      }

      onSubmit() {
          fetch("https://localhost:8443/sessions/"+this.state.id, 
            {
              method: 'PATCH',
              headers: {
                 'Content-Type': 'application/merge-patch+json'
              },
              body: 
                JSON.stringify( 
                  {  
                    name: this.state.firstName,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                  } 
                )                                        
            })
          }

      render() {
         const { show } = this.state;
         const { session } = this.state;

      return (
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Session</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Name</Form.Label>
                      <Form.Control 
                        type="name" 
                        defaultValue={session.name}
                        onChange = {(event) => this.setState({name: event.target.value })}/>
                      <Form.Text className="text-muted">
                          Enter a name
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicDate">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control 
                        type="startDate" 
                        defaultValue={session.name}
                        onChange = {(event) => this.setState({name: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Enter a name
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicDate">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control 
                        type="endDate" 
                        defaultValue={session.endDate}
                        onChange = {(event) => this.setState({endDate: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Enter an end Date.
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

export default EditSession;
