  import React from 'react';
  import {Row, Col, Card, Table} from 'react-bootstrap';
  import EditStudent from "./EditStudent";
  import CreateStudent from "./CreateStudent";
  import DeleteStudent from "./DeleteStudent";
  import Aux from "../../../hoc/_Aux";

  class Student extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
            datas:[],
            showEdit: false,
            showCreate: false,
            showDelete: false,
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
          
          const sortedDatas = datas.sort(this.compareValues('lastName', 'asc'));
        
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
      console.log('edit');
        this.setState({student: data, showEdit: true});
    }

    onCreate=()=> {
      console.log('create');
        this.setState({student: null, showCreate: true});
    }

    onDelete=(data)=> {
      console.log('delete');
      this.setState({student: data, showDelete: true});
    }

    // onSubmit() {
    //   console.log ('hello there');
    //   const resp = fetch("https://localhost:8443/students/3", 
    //    {
    //        method: 'PATCH',
    //        headers: {
    //         'Content-Type': 'application/merge-patch+json'
    //        },
    //        body: 
    //            JSON.stringify( 
    //                {
    //                    firstName: "testfirstname"
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
                                {/* <button type="button" className="btn btn-primary" onClick={()=>this.onSubmit()}>Testcreate</button>  */}
                            </Card.Header>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Last Name</th>
                                        <th>First Name</th>
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
                { this.state.showEdit ? <EditStudent student={this.state.student} showEdit={this.state.showEdit}></EditStudent> : null }
                { this.state.showCreate ? <CreateStudent student={null} showCreate={this.state.showCreate}></CreateStudent> : null }
                { this.state.showDelete ? <DeleteStudent student={this.state.student} showDelete={this.state.showDelete}></DeleteStudent> : null }

                {/* <EditStudent student={this.student} showEdit></EditStudent> */}
            </Aux>
        );
    }
    }



  export default Student;
