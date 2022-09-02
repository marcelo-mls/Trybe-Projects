import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import CardDisplayedInDeck from './components/CardDisplayedInDeck';
import SubHeader from './components/subHeader';
import Menu from './components/Menu';
import data from './data/data';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      deckOfCards: data,

      filterName: '',
      filterRarity: '',
      filterTrunfo: false,
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const values = type === 'checkbox' ? checked : value;

    this.setState({
      [name]: values,
    });
  }

  validateAttrs = (cardAttr) => {
    const maxValue = 90;
    return (Number(cardAttr) < 0 || Number(cardAttr) > maxValue);
  }

  handleSaveButtonDisabled = () => {
    const limAttrSum = 210;
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;

    return ((Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3)) > limAttrSum
      || cardName === ''
      || cardRare === ''
      || cardImage === ''
      || cardDescription === ''
      || this.validateAttrs(cardAttr1)
      || this.validateAttrs(cardAttr2)
      || this.validateAttrs(cardAttr3));
  }

  identifyTrunfo = () => {
    const { deckOfCards } = this.state;
    return deckOfCards.some((card) => card.cardTrunfo === true);
  }

  handleSaveButtonClick = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState((prevState) => (
      { cardName: '',
        cardDescription: '',
        cardAttr1: 0,
        cardAttr2: 0,
        cardAttr3: 0,
        cardImage: '',
        cardRare: 'normal',
        cardTrunfo: false,
        deckOfCards: [...prevState.deckOfCards, newCard],
      }),
    () => this.setState({ hasTrunfo: this.identifyTrunfo() }));
  }

  handleDeleteButtonClick = (event) => {
    const { id } = event.target;
    this.setState((prevState) => ({
      deckOfCards: prevState.deckOfCards.filter((card) => card.cardName !== id) }),
    () => this.setState({ hasTrunfo: this.identifyTrunfo() }));
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      deckOfCards,

      filterName,
      filterRarity,
      filterTrunfo,
    } = this.state;

    const toShuffle = 0.5;
    const filteredDeck = deckOfCards
      .filter((card) => (!filterTrunfo ? true : card.cardTrunfo))
      .filter((card) => card.cardRare.replace(/ raro/g, '')
        .includes(filterRarity.replace(/ raro/g, '')))
      .filter((card) => card.cardName.toLowerCase().includes(filterName.toLowerCase()))
      .sort(() => Math.random() - toShuffle);

    return (
      <>
        <h1>TRYUNFO</h1>
        <header className="header">
          <section>
            <SubHeader subHeader="Create a custom card" />
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
              isSaveButtonDisabled={ this.handleSaveButtonDisabled() }
              onInputChange={ this.handleChange }
              onSaveButtonClick={ this.handleSaveButtonClick }
            />
          </section>
          <section>
            <SubHeader subHeader="Preview" />
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </section>
          <section>
            <SubHeader subHeader="Menu" />
            <Menu
              filterName={ filterName }
              filterRarity={ filterRarity }
              filterTrunfo={ filterTrunfo }
              onInputChange={ this.handleChange }
            />
          </section>
        </header>

        <SubHeader subHeader="Your deck of cards" />
        <main className="deck">
          {
            filteredDeck.map((card) => (
              <CardDisplayedInDeck
                key={ card.cardName }
                className="displayCardOnDeck"
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
                id={ card.cardName }
                onClick={ (event) => this.handleDeleteButtonClick(event) }
              />
            ))
          }
        </main>
      </>
    );
  }
}

export default App;
