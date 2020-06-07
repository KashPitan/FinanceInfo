import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./layout/navbar";
// import Button from "./layout/button";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";

var update = false;

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            desc: 'Not updating prices',
        };
    }

    handleClick(){
      
      console.log("Before: ", this.state.value)
      this.setState({value: !this.state.value});
      console.log("After: ", this.state.value)

        if (this.state.value){
            this.setState({desc: 'Updating prices'});
        } else {
            this.setState({desc: 'Not updating prices'});
        }

        update = !update
        // console.log("TEST", update);

    }

    render() {
        return (
            <button
            id="updatebutton"
            type="button"
            onClick = {() => this.handleClick()}
            >{this.state.desc}
            </button>
        );
    };
}



const App = () => {
  const [apiResTest, setApiResTest] = useState("");

  const apiTest = () => {
    axios.get("/live").then((res) => {
      // console.log("This is res: ", res);
      setApiResTest(res.data);
    });
  };

  
  useEffect(() => {
        
    const intervalId = setInterval(function(){
      if (update) {
        apiTest();
      }
    }, 2000);
    
    return () => clearInterval(intervalId);

  }, []);

  return (
    <>
      <Navbar />
      <h1>HEADER + {apiResTest}</h1>
      <Button />
    </>
  );

};

export default App;
