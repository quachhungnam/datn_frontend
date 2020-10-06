/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function App() {

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [arr_trans, set_arr_trans] = useState([])
  const initFormState = { username: null, password: null }
  const [task, setTask] = useState(initFormState)
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  async function get_account_infor() {
    try {
      let result = await fetch(`http://127.0.0.1:8000/api/users/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let resultJson = await result.json();
      return resultJson;
    } catch (err) {
      console.error(`Error is: ${err}`);
      return err;
    }
  }

  const getAllPosts = async () => {
    try {
      const res = await get_account_infor()
      if (res.error) {
        set_arr_trans([])
        return
      } else {
        const all_trans = res
        set_arr_trans(all_trans)
      }
    } catch (ex) {
      console.log(ex)
    }
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setTask({ ...task, [name]: value })

  }


  useEffect(() => {
    // getAllPosts()
  }, [])

  const login = () => {
    getAllPosts()
  }
  const show = () => {
    getAllPosts()
    alert(JSON.stringify(arr_trans))
  }
  const show2 = () => {

    alert(JSON.stringify(task.username))
  }
  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
      />

      <ul>
        {/* {arr_trans} */}
        {/* {items.map(item => (
        <li key={item.name}>
          {item.name} {item.price}
        </li>
      ))} */}
      </ul>
      <form action="" method="POST" onSubmit={login}>
        <input type="text" name="username" onChange={handleInputChange} value={task.username}></input>
        <br></br>
        <input type="text" name="password" onChange={handleInputChange} value={task.password}></input>
        <button type="submit">OK</button>
      </form>
      <button type="" onClick={show}>show Json</button>
      <button type="" onClick={show2}>show username</button>
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <h3>Column 1</h3>
            <p>Lorem ipsum dolor..</p>
          </div>
          <div class="col-sm-4">
            <h3>Column 2</h3>
            <p>Lorem ipsum dolor..</p>
          </div>
          <div class="col-sm-4">
            <h3>Column 3</h3>
            <p>Lorem ipsum dolor..</p>
          </div>
        </div>
      </div>


      <tr>

        <td>
          <span

          >

          </span>
        </td>
        <td>
          <Button>gi tthe</Button>
          <button type="button" className="btn btn-primary" >Sửa</button>&nbsp;
                <button type="button" className="btn btn-danger" >Xóa</button>
        </td>
      </tr>
    </>
  );
}

export default App;

