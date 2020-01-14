import React from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import EditInternship from "./EditInternship";
import CreateInternship from "./CreateInternship";
import DeleteInternship from "./DeleteInternship";
import Aux from "../../../hoc/_Aux";

class Internship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          datas:[],
          showEdit: false,
          showCreate: false,
          showDelete: false,
          internships: [],
        };
      }

    async componentDidMount() {
        const json = await fetch('https://localhost:8443/internships');
        const response = await json.json();
        const datas = response['hydra:member'];
        const sortedDatas = datas.sort(this.compareValues('name', 'asc'));
        this.setState({datas: sortedDatas})
    }

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  onEdit=(data)=> {
      this.setState({internship: data, showEdit: true});
  }

  onCreate=()=> {
      this.setState({internship: null, showCreate: true});
  }

  onDelete=(data)=> {
    this.setState({internship: data, showDelete: true});
  }

  render() {
    const { datas } = this.state;
    
      return (
          <Aux>
              <Row>
                  <Col>
                      <Card>
                          <Card.Header>
                              <Card.Title as="h5">Internships List for</Card.Title>
                              <button type="button" className="btn btn-primary" onClick={()=>this.onCreate()}>Create</button>
                          </Card.Header>
                          <Card.Body>
                              <Table responsive hover>
                                  <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Company Name</th>
                                      <th>Contact date</th>
                                      <th>Contact Way</th>
                                      <th>Contact Name</th>
                                      <th>Job Name</th>
                                      <th>Second contact date</th>
                                      <th>Response</th>
                                      <th>Internship proposed</th>
                                      <th>Internship accepted</th>
                                      <th>Edit</th>
                                      <th>Delete</th>
                                  </tr>
                                  </thead>

                                  <tbody>
                                  {datas.map((data, i) =>
                                    <React.Fragment key={data.id}>
                                      <tr>
                                      <th scope="row">{i+1}</th>
                                      <td>{data.student.name}</td>
                                      <td>{data.gitLink}</td>
                                      <td>{data.websiteLink}</td>
                                      <td>{data.linkedinLink}</td>
                                      <td>{data.cv}</td>
                                      <td onClick={()=>this.onEdit(data)}> <i className="feather icon-edit"></i></td>
                                      <td onClick={()=>this.onDelete(data)}> <i className="feather icon-trash-2"></i></td>
                                      </tr>
                                    </React.Fragment>
                                  )}
                                  </tbody>
                              </Table>
                          </Card.Body>
                      </Card>
                  </Col>
              </Row>
              { this.state.showEdit ? <EditInternship internship={this.state.internship} showEdit={this.state.showEdit}></EditInternship> : null }
              { this.state.showCreate ? <CreateInternship internship={null} showCreate={this.state.showCreate}></CreateInternship> : null }
              { this.state.showDelete ? <DeleteInternship internship={this.state.internship} showDelete={this.state.showDelete}></DeleteInternship> : null }
          </Aux>
      );
  }
  }



export default Internship;
