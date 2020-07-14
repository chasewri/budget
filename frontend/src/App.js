import React from "react";

function App() {
  return <div className="App">
    <User username={this.props.user.name} />
  </div>;
}





const mapStateToProps = (state) => {
  return {
    user: state.user,
    math: state.math,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch({
        type: "SET_NAME",
        payload: name
      })
    }
  }
}





export default connect(mapStateToProps, mapDispatchToProps)(App);
