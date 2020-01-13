import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class DeleteStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showDelete,
          student: props.student,
          lastName: props.student.lastName,
          firstName: props.student.firstName,
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
              method: 'DELETE',
              headers: {
                 'Content-Type': 'application/merge-patch+json'
              }                                     
            })
    }

      render() {
         const { show } = this.state;
         const { student } = this.state;

      return (
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Student</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  Do you really want to delete {student.lastName} {student.firstName} ?
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

export default DeleteStudent;
