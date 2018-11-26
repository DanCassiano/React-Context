import React from "react";
import styled from "styled-components";
import { withContext } from "./Context";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20%;
  box-sizing: border-box;
  background-color: ${props => props.background};
`;

const Button = styled.button`
  padding: 10px 15px;
`;

const RedButton = styled(Button)`
  background-color: red;
  color: #fff;
`;

const WrapperButtons = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
`;

const JokeText = styled.div`
  padding: 20px;
  color: ${props => props.color};
`;

class Body extends React.Component {
  componentDidMount() {
    this.props.fetchJoke();
  }

  changeTheme = theme => {
    this.props.setTheme(theme);
  };

  _refresh = () => this.props.fetchJoke();

  render() {
    const { joke, getTheme } = this.props;
    const theme = getTheme();
    return (
      <Wrapper background={theme.bgColor}>
        <WrapperButtons>
          <Button
            disabled={theme.name === "light"}
            onClick={() => this.changeTheme("light")}
          >
            Light
          </Button>
          <Button
            disabled={theme.name === "dark"}
            onClick={() => this.changeTheme("dark")}
          >
            Dark
          </Button>
          <RedButton onClick={this._refresh}>Refresh</RedButton>
        </WrapperButtons>

        {joke && <JokeText color={theme.joke.text}>{joke}</JokeText>}
      </Wrapper>
    );
  }
}

const mapContext = ({ chuckNorris, theme }) => {
  return {
    joke: chuckNorris.joke,
    theme
  };
};

const mapActions = ({ fetchJoke, setTheme, getTheme }) => ({
  fetchJoke,
  setTheme,
  getTheme
});

export default withContext(Body, mapContext, mapActions);
