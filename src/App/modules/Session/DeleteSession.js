import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class DeleteSession extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showDelete,
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
              method: 'DELETE',
              headers: {
                 'Content-Type': 'application/merge-patch+json'
              }                                     
            })
    }

      render() {
         const { show } = this.state;
         const { session } = this.state;

      return (
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Session</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  Do you really want to delete {session.name} ?
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

export default DeleteSession;
