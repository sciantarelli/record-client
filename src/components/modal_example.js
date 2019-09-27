const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${props => props.opacity};
  transition: opacity ease 500ms;
`;

class FancyModalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      opacity: 0
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.afterOpen = this.afterOpen.bind(this);
    this.beforeClose = this.beforeClose.bind(this);
  }

  toggleModal(e) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  afterOpen() {
    setTimeout(() => {
      this.setState({ opacity: 1 });
    });
  }

  beforeClose() {
    return new Promise(resolve => {
      this.setState({ opacity: 0 });
      setTimeout(resolve, 200);
    });
  }

  render() {
    return (
        <div>
          <button onClick={this.toggleModal}>Open modal</button>
          <StyledModal
              isOpen={this.state.isOpen}
              afterOpen={this.afterOpen}
              beforeClose={this.beforeClose}
              onBackgroundClick={this.toggleModal}
              onEscapeKeydown={this.toggleModal}
              opacity={this.state.opacity}
              backgroundProps={{ opacity: this.state.opacity }}
          >
            <span>I am a modal!</span>
            <button onClick={this.toggleModal}>Close me</button>
          </StyledModal>
        </div>
    );
  }
}