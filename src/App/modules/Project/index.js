import React from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import EditProject from "./EditProject";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";
import Aux from "../../../hoc/_Aux";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          datas:[],
          showEdit: false,
          showCreate: false,
          showDelete: false,
          students: [],
        };
      }

    async componentDidMount() {
        const json = await fetch('https://localhost:8443/projects');
        const response = await json.json();
        const datas = response['hydra:member'];
        for (const data of datas) {
            const resp = await fetch('https://localhost:8443'+data.student);
            this.state.students.push(data);
            data.session = (await resp.json()).name;
          }
        
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
      this.setState({project: data, showEdit: true});
  }

  onCreate=()=> {
      this.setState({project: null, showCreate: true});
  }

  onDelete=(data)=> {
    this.setState({project: data, showDelete: true});
  }

  render() {
    const { datas } = this.state;
    const { students } = this.state;
    
      return (
          <Aux>
              <Row>
                  <Col>
                      <Card>
                          <Card.Header>
                              <Card.Title as="h5">Projects List</Card.Title>
                              <button type="button" className="btn btn-primary" onClick={()=>this.onCreate()}>Create</button>
                          </Card.Header>
                          <Card.Body>
                              <Table responsive hover>
                                  <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Name</th>
                                      <th>Zip</th>
                                      <th>Students Name</th>
                                      {/* <th>List of Students ?(with link?)</th> */}
                                      <th>Edit</th>
                                      <th>Delete</th>
                                  </tr>
                                  </thead>

                                  <tbody>
                                  {datas.map((data, i) =>
                                    <React.Fragment key={data.id}>
                                      <tr>
                                      <th scope="row">{i+1}</th>
                                      <td>{data.name}</td>
                                      <td>{data.zip}</td>
                                      <td>{data.students}</td>
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
              { this.state.showEdit ? <EditProject session={this.state.session} showEdit={this.state.showEdit} students={this.state.students}></EditProject> : null }
              { this.state.showCreate ? <CreateProject session={null} showCreate={this.state.showCreate} students={this.state.students}></CreateProject> : null }
              { this.state.showDelete ? <DeleteProject session={this.state.session} showDelete={this.state.showDelete} students={this.state.students}></DeleteProject> : null }
          </Aux>
      );
  }
  }



export default Project;
