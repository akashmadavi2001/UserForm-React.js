import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useState } from 'react';
import './App.css'

function App() {

  let [formData, setformData] = useState({
    uname: '',
    uemail: '',
    uphone: '',
    umsg: '',
    index: ''
  })

  let [userData, setuserData] = useState([]);

  let getValue = (event) => {
    let oldData = { ...formData };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setformData(oldData);
  }

  let handleSubmit = (event) => {
    let currentUserFormData = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umsg: formData.umsg
    }

    if (formData.index === '') {
      let checkFilterUser = userData.filter((v) => v.uemail === formData.uemail || v.uphone === formData.uphone);

      if (checkFilterUser.length === 1) {
        toast.error('Email or phone is already exists...', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
      } 
      else
       {
        let oldUserData = [...userData, currentUserFormData]
        setuserData(oldUserData);
        event.preventDefault();
        setformData({
          uname: '',
          uemail: '',
          uphone: '',
          umsg: '',
          index: ''
        });
      }
    }
    else {
      let editIndex = formData.index;
      let oldData = userData;
      let checkFilterUser = userData.filter((v, i) => (v.uemail === formData.uemail || v.uphone === formData.uphone) && i !== editIndex);
      if (checkFilterUser.length === 1) {
        toast.error('Email or phone is already exists...', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
      }
      else {
        oldData[editIndex]['uname'] = formData.uname;
        oldData[editIndex]['uemail'] = formData.uemail;
        oldData[editIndex]['uphone'] = formData.uphone;
        oldData[editIndex]['umsg'] = formData.umsg;
        setuserData(oldData);
        setformData({
          uname: '',
          uemail: '',
          uphone: '',
          umsg: '',
          index: ''
        });
      }
    }
    event.preventDefault();
  }

  let deleteRow = (indexNo) => {
    let filterDataDelete = userData.filter((v, i) => i !== indexNo);
    setuserData(filterDataDelete);
    toast.warning('file delete', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
  });
  }

  let editRow = (indexNo) => {
    toast.info('Updata your data...', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
  });
    let editData = userData.filter((v, i) => i === indexNo)[0];
    editData['index'] = indexNo;
    setformData(editData);
  }

  return (
    <Container fluid className='bg-con'>
      <ToastContainer />
      <Container className='bg-container'>
        <Row>
          <Col className='text-center py-5'>
            <h1 className=''>Enquiry Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <form onSubmit={handleSubmit} className='form-bg'>
              <div className='pb-3'>
                <label className='form-label' htmlFor='uname'>Name</label>
                <input type='text' id='uname' onChange={getValue} value={formData.uname} name='uname' className='form-control' />
              </div>
              <div className='pb-3'>
                <label htmlFor='uemail' className='form-label'>Email</label>
                <input id='uemail' type='email' onChange={getValue} value={formData.uemail} name='uemail' className='form-control' />
              </div>
              <div className='pb-3'>
                <label htmlFor='utext' className='form-label'>Phone</label>
                <input id='utext' type='text' onChange={getValue} value={formData.uphone} name='uphone' className='form-control' />
              </div>
              <div className='pb-3'>
                <label htmlFor='msg' className='form-label'>Message</label>
                <textarea id='msg' name='umsg' onChange={getValue} value={formData.umsg} className='form-control' />
              </div>
              <button className='btn btn-primary'>
                {
                  formData.index ? 'Update' : "Save"
                }
              </button>
            </form>
            <br />
          </Col>
          <Col lg={7}>
            <Table striped bordered hover className='table-d'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length >= 1
                  ?
                  userData.map((obj, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{obj.uname}</td>
                        <td>{obj.uemail}</td>
                        <td>{obj.uphone}</td>
                        <td>{obj.umsg}</td>
                        <td>
                          <button className='btn btn-primary' onClick={() => deleteRow(index)}>Delete</button>
                          <button className='btn btn-primary' onClick={() => editRow(index)}>Update</button>
                        </td>
                      </tr>
                    )
                  })
                  :
                  <tr>
                    <td colSpan={6}>No Data </td>
                  </tr>
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default App;