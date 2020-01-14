import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

class CreateJobcard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showCreate,
          gitLink: null,
          websiteLink: null,
          linkedinLink: null,
          cv: null,
          studentsAll: props.students,
          student: null
        };
      }

      handleClose=()=> {
          this.setState({show: false});
          return (this.state.show);
      }

      handleChange = (e) =>{
        this.setState({ student: "/students/"+e.target.value });
      }

    onSubmit() {
          fetch("https://localhost:8443/job_cards", 
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: 
                    JSON.stringify( 
                        {
                            student: this.state.student, 
                            gitLink: this.state.gitLink,
                            websiteLink: this.state.websiteLink,
                            linkedinLink: this.state.linkedinLink,
                            cv: this.state.cv
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
                  <Modal.Title>Create JobCard</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Student</Form.Label>
                      <Form.Control 
                        type="name" 
                        placeholder="Name"
                        onChange = {(event) => this.setState({student: event.target.value })}/>
                      <Form.Text className="text-muted">
                        Choose a student. 
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>Git Link</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Git Link"
                        onChange = {(event) => this.setState({gitLink: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Git Link
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>Website Link</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Website Link"
                        onChange = {(event) => this.setState({websiteLink: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                        Website Link 
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>Linkedin Link</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Linkedin Link"
                        onChange = {(event) => this.setState({linkedinLink: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                        Linkedin Link 
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>CV</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="CV"
                        onChange = {(event) => this.setState({cv: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                        CV
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

export default CreateJobcard;
