import React from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import EditStudent from "./EditStudent";
import CreateStudent from "./CreateStudent";
import Aux from "../../../hoc/_Aux";

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          datas:[],
          showEdit: false,
          showCreate: false,
          student: null,
        };
      }

    async componentDidMount() {
        const json = await fetch('https://localhost:8443/students');
        const response = await json.json();
        const datas = response['hydra:member'];
          for (const data of datas) {
            const resp = await fetch('https://localhost:8443'+data.session);

            data.session = (await resp.json()).name;
          }
                this.setState({datas})

  }

  onEdit=(data)=> {
    console.log('edit');
      this.setState({student: data, showEdit: true});
  }

  onCreate=()=> {
    console.log('create');
      this.setState({student: null, showCreate: true});
  }

  // onSubmit() {
  //   console.log ('hello there');
  //   const resp = fetch("https://localhost:8443/students", 
  //    {
  //        method: 'POST',
  //        headers: {
  //         'Content-Type': 'application/json'
  //        },
  //        body: 
  //            JSON.stringify( 
  //                {
  //                    "firstName": "here", 
  //                    "lastName": "works",
  //                    "mail": "helloworks@mail.com",
  //                    "session": "/sessions/1"
  //                }
  //        )                                        
  //    });
  //    //const json = resp.json();
  //   }

  render() {
    const { datas } = this.state;
      return (
          <Aux>
              <Row>
                  <Col>
                      <Card>
                          <Card.Header>
                              <Card.Title as="h5">Students List</Card.Title>
                              <button type="button" className="btn btn-primary" onClick={()=>this.onCreate()}>Create</button>
                              {/* <button type="button" className="btn btn-primary" onClick={()=>this.onSubmit()}>Testcreate</button> */}
                          </Card.Header>
                          <Card.Body>
                              <Table responsive hover>
                                  <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>First Name</th>
                                      <th>Last Name</th>
                                      <th>Mail</th>
                                      <th>Session</th>
                                      <th>Edit</th>
                                      <th>Delete</th>
                                  </tr>
                                  </thead>

                                  <tbody>
                                  {datas.map((data, i) =>
                                    <React.Fragment key={data.id}>
                                      <tr>
                                      <th scope="row">{i+1}</th>
                                      <td>{data.lastName}</td>
                                      <td>{data.firstName}</td>
                                      <td>{data.mail}</td>
                                      <td>{data.session}</td>
                                      <td onClick={()=>this.onEdit(data)}> <i className="feather icon-edit"></i></td>
                                      <td> <i className="feather icon-trash-2"></i></td>
                                      </tr>
                                    </React.Fragment>
                                  )}
                                  </tbody>
                              </Table>
                          </Card.Body>
                      </Card>
                  </Col>
              </Row>
              { this.state.showEdit ? <EditStudent student={this.state.student} showEdit={this.state.showEdit}></EditStudent> : null }
              { this.state.showCreate ? <CreateStudent student={null} showCreate={this.state.showCreate}></CreateStudent> : null }

               {/* <EditStudent student={this.student} showEdit></EditStudent> */}
          </Aux>
      );
  }
  }



export default Student;
