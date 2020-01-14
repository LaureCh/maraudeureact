  import React from 'react';
  import {Modal} from 'react-bootstrap';
  import {Button} from 'react-bootstrap';
  import {Form} from 'react-bootstrap';

  class CreateSession extends React.Component {

      constructor(props) {
          super(props);
          this.state = {
            show: props.showCreate,
            name: null,
            startDate: null,
            endDate: null,
            students: null,
            sessions: []
          };
        }

        async componentDidMount() {
          const json = await fetch('https://localhost:8443/sessions');
          const response = await json.json();
          const sessions = response['hydra:member'];
          this.setState({sessions});
      }

        handleClose=()=> {
            this.setState({show: false});
            return (this.state.show);
        }

        handleChange = (e) =>{
          this.setState({ session: "/sessions/"+e.target.value });
        }

      onSubmit() {
            fetch("https://localhost:8443/sessions", 
              {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json'
                  },
                  body: 
                      JSON.stringify( 
                          {
                              name: this.state.name, 
                              startDate: this.state.startDate,
                              endDate: this.state.endDate
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
                    <Modal.Title>Create Session</Modal.Title>
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

                      <Form.Group controlId="formBasicDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control 
                          type="startDate" 
                          placeholder="StartDate"
                          onChange = {(event) => this.setState({startDate: event.target.value })}
                          />
                        <Form.Text className="text-muted">
                            Enter a start Date
                        </Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control 
                          type="endDate" 
                          placeholder="EndDate"
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

  export default CreateSession;
