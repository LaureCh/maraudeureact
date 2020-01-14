import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

class EditJobcard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showEdit,
          jobcard: props.jobcard,
          gitLink: props.jobcard.gitLink,
          websiteLink: props.jobcard.websiteLink,
          linkedinLink: props.jobcard.linkedinLink,
          cv: props.jobcard.cv,
          student: props.jobcard.student,
          id: props.jobcard.id
        };
      }

      handleClose=()=> {
          this.setState({show: false});
          return (this.state.show);
      }

      onSubmit() {
          fetch("https://localhost:8443/job_cards/"+this.state.id, 
            {
              method: 'PATCH',
              headers: {
                 'Content-Type': 'application/merge-patch+json'
              },
              body: 
                JSON.stringify( 
                  {  
                    gitLink: this.state.gitLink,
                    websiteLink: this.state.websiteLink,
                    linkedinLink: this.state.linkedinLink,
                    cv: this.state.cv
                  } 
                )                                        
            })
          }

      render() {
         const { show } = this.state;
         const { jobcard } = this.state;

      return (
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Jobcard</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Git Link</Form.Label>
                      <Form.Control 
                        type="text" 
                        defaultValue={jobcard.gitLink}
                        onChange = {(event) => this.setState({gitLink: event.target.value })}/>
                      <Form.Text className="text-muted">
                          Enter a git Link
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>Website link</Form.Label>
                      <Form.Control 
                        type="text" 
                        defaultValue={jobcard.websiteLink}
                        onChange = {(event) => this.setState({websiteLink: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Enter a website Link
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>Linkedin Link</Form.Label>
                      <Form.Control 
                        type="text" 
                        defaultValue={jobcard.linkedinLink}
                        onChange = {(event) => this.setState({linkedinLink: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Enter a linkedin link
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicText">
                      <Form.Label>CV</Form.Label>
                      <Form.Control 
                        type="text" 
                        defaultValue={jobcard.cv}
                        onChange = {(event) => this.setState({cv: event.target.value })}
                        />
                      <Form.Text className="text-muted">
                          Dl a cv
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

export default EditJobcard;
