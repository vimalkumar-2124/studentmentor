import React,{useContext, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ContextApi } from '../App';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
export default function AddMentor() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
    let [name, setName] = useState("")
    let contextApi = useContext(ContextApi)
    let [message, setMessage] = useState("")
    
let handleSubmit = async() => {
  
    let studentsAssigned = []
    let res = await axios.post(`${contextApi.apiUrl}/mentors`,{
      name,
      studentsAssigned
    })
    if(res.data.statusCode===200){
      setShow(true)
      setMessage(res.data.message)
    }
}


  return <>
  <div>
    {
      message?
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> : <></>
    }
  </div>
  <div>
  <Form className='offset-3 col-sm-6 mt-5'>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label className='home'>Mentor Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}/>
      </Form.Group>
      {name.length > 0 ?
      <Button className='mt-2' variant="primary"  onClick={() => handleSubmit()}>
        Submit
      </Button>
      :
      <div style={{'color':'red'}}>
        * Required
      
      </div>

      }
    </Form>
    </div>
    
</>
}