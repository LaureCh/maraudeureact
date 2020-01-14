import React from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import EditJobcard from "./EditJobcard";
import CreateJobcard from "./CreateJobcard";
import DeleteJobcard from "./DeleteJobcard";
import Aux from "../../../hoc/_Aux";

class Jobcard extends React.Component {
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
        const json = await fetch('https://localhost:8443/job_cards');
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
      this.setState({jobcard: data, showEdit: true});
  }

  onCreate=()=> {
      this.setState({jobcard: null, showCreate: true});
  }

  onDelete=(data)=> {
    this.setState({jobcard: data, showDelete: true});
  }

  render() {
    const { datas } = this.state;
    
      return (
          <Aux>
              <Row>
                  <Col>
                      <Card>
                          <Card.Header>
                              <Card.Title as="h5">Jobcards List</Card.Title>
                              <button type="button" className="btn btn-primary" onClick={()=>this.onCreate()}>Create</button>
                          </Card.Header>
                          <Card.Body>
                              <Table responsive hover>
                                  <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Student</th>
                                      <th>Git Link</th>
                                      <th>Website Link</th>
                                      <th>Linkedin link</th>
                                      <th>CV</th>
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
              { this.state.showEdit ? <EditJobcard jobcard={this.state.jobcard} showEdit={this.state.showEdit}></EditJobcard> : null }
              { this.state.showCreate ? <CreateJobcard jobcard={null} showCreate={this.state.showCreate}></CreateJobcard> : null }
              { this.state.showDelete ? <DeleteJobcard jobcard={this.state.jobcard} showDelete={this.state.showDelete}></DeleteJobcard> : null }
          </Aux>
      );
  }
  }



export default Jobcard;
