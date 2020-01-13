  import React from 'react';
  import {Row, Col, Card, Table} from 'react-bootstrap';
  import EditSession from "./EditSession";
  import CreateSession from "./CreateSession";
  import DeleteSession from "./DeleteSession";
  import Aux from "../../../hoc/_Aux";

  class Session extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
            datas:[],
            showEdit: false,
            showCreate: false,
            showDelete: false,
            session: null,
          };
        }

      async componentDidMount() {
          const json = await fetch('https://localhost:8443/sessions');
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
        this.setState({session: data, showEdit: true});
    }

    onCreate=()=> {
        this.setState({session: null, showCreate: true});
    }

    onDelete=(data)=> {
      this.setState({session: data, showDelete: true});
    }

    render() {
      const { datas } = this.state;
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Sessions List</Card.Title>
                                <button type="button" className="btn btn-primary" onClick={()=>this.onCreate()}>Create</button>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
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
                                        <td>{data.startDate}</td>
                                        <td>{data.endDate}</td>
                                        {/* <td>{data.students}</td> */}
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
                { this.state.showEdit ? <EditSession session={this.state.session} showEdit={this.state.showEdit}></EditSession> : null }
                { this.state.showCreate ? <CreateSession session={null} showCreate={this.state.showCreate}></CreateSession> : null }
                { this.state.showDelete ? <DeleteSession session={this.state.session} showDelete={this.state.showDelete}></DeleteSession> : null }
            </Aux>
        );
    }
    }



  export default Session;
