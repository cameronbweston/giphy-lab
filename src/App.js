import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { render } from '@testing-library/react';




class App extends React.Component {
  state = {
    giphyAPIKey: '&api_key=Nn819Vz4PODYs8ZzEXxCjmXaJW9TXH01',
    limit: '',
    searchGif: '',
    searchURL: '',
    returnedGifs: []
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  getGif = (event) => {
    event.preventDefault()
    try{
        fetch(`http://api.giphy.com/v1/gifs/search?${this.state.giphyAPIKey}&q=${this.state.searchGif}&limit=1`)
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.setState({
            returnedGifs: json.data,
          })
        })
    }
    catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="App">
          <h1>Giphy Lab</h1>
          <form onSubmit={this.getGif}>
        <input type="text" name="searchGif" value={this.state.searchGif} onChange={this.handleChange}/>
        <button>Submit</button>
      </form>
           {this.state.returnedGifs.map((gif, idx) => {
             return(
               <img src={gif.images.original.url} key={idx} alt='GIF'/>
             )
           })}
      </div>
    );
  }
}

export default App;
