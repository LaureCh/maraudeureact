import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';

import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
class EditStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: props.show,
          student: props.student,
          // lastName: props.student.lastName,
          // firstName: props.student.firstName,
          // session: props.session,
          // mail: props.mail,
          // id:props.id,
        };
      }

      handleClose=()=> {
          this.setState({show: false});
      }

      render() {
         const { show } = this.state;
         const { student } = this.state;
        // const [show, setShow] = React.useState(false);
        // const handleClose = () => setShow(false);
        // const handleShow = () => setShow(true);

      return (
              <>
              <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                {student}
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>

              </Modal>
              </>
          );

        }
  }




export default EditStudent;
