import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class DeleteProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.showDelete,
          project: props.project,
          name: props.project.name,
          zip: props.project.zip,
          students: props.project.students,
          id: props.project.id
        };
      }

      handleClose=()=> {
          this.setState({show: false});
          return (this.state.show);
      }

    onSubmit() {
          fetch("https://localhost:8443/projects/"+this.state.id, 
            {
              method: 'DELETE',
              headers: {
                 'Content-Type': 'application/merge-patch+json'
              }                                     
            })
    }

      render() {
         const { show } = this.state;
         const { project } = this.state;

      return (
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Project</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  Do you really want to delete {project.name} ?
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

export default DeleteProject;
