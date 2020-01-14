import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class DeleteJobcard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showDelete,
          jobcard: props.jobcard,
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
              method: 'DELETE',
              headers: {
                 'Content-Type': 'application/merge-patch+json'
              }                                     
            })
    }

      render() {
         const { show } = this.state;
         const { jobcard } = this.state;

      return (
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Jobcard</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  Do you really want to delete {jobcard.student.name} ?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" type="submit" onClick={()=>this.handleClose}>
                        No
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=>this.onSubmit()}>
                        Yes, delete it
                    </Button>
                </Modal.Footer>
              
              </Modal>
              </>
          );

        }
  }

export default DeleteJobcard;
