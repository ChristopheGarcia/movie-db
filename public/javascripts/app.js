var React = require("react");
var Movie = require("./movie");
var { Container, Row, Col, Card, Button, Nav, NavItem, NavLink } = require('reactstrap');

class App extends React.Component {

  constructor() {
    super();
    this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
    this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
    this.handleClickFav = this.handleClickFav.bind(this);
    this.state = { viewOnlyLike : false, movies:[], mymovies:[], totalLike : null }
  }

  componentDidMount() {
    var ctx = this;
    fetch('./movies')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
      console.log(data);
        ctx.setState(
          {movies : data}
        );
    }).catch(function(error) {
        console.log('Request failed', error)
    });

    fetch('./mymovies')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
      console.log(data);
        ctx.setState(
          {mymovies : data, totalLike : data.length}
        );
    }).catch(function(error) {
        console.log('Request failed', error)
    });
  }

  handleClickLikeOn() {
    this.setState({
      viewOnlyLike : true
    })
  }

  handleClickLikeOff() {
    this.setState({
      viewOnlyLike : false
    })
  }

  handleClickFav(movie, isLike){

        if (isLike == true) {
          this.setState({
            totalLike : this.state.totalLike + 1
          })
        } else {
          this.setState({
            totalLike : this.state.totalLike - 1
          })

    }
  }

  render() {
    console.log(this.state.movieSelected);

    var cardList = [];
    for(var i=0; i<this.state.movies.length; i++){
      var isLike = false;
      for(var y=0; y<this.state.mymovies.length; y++){
        if(this.state.movies[i].id == this.state.mymovies[y].idMovieDB) {
          isLike = true;
          break;
        }
      }

      cardList.push(
        <Movie idMovieDB={this.state.movies[i].id} title={this.state.movies[i].title} overview={this.state.movies[i].overview.substr(0, 100)+"..."} poster_path={this.state.movies[i].poster_path} viewOnlyLike={this.state.viewOnlyLike} isLike={isLike} handleClickParent={this.handleClickFav}/>
      );
    }


    return (
      <Container>
        <Row>
          <Col>
            <Nav>
              <NavItem>
                <NavLink href="#"><img src="./images/logo.png" /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleClickLikeOff}>Last releases</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleClickLikeOn}>My movies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#"><Button color="secondary">{this.state.mymovies.length} films</Button></NavLink>
              </NavItem>
            </Nav>


          </Col>

        </Row>
        <Row>

          {cardList}

        </Row>
      </Container>
    )
  }
}

module.exports = App;
