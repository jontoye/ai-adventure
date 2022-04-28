import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import "./css/Character.css";

export default class Character extends Component {
  CLASSES = [
    "busker",
    "merchant",
    "warrior",
    "archer",
    "bard",
    "sapper",
    "thief",
    "druid",
    "lockpicking lawyer",
    "priest",
    "archangel",
    "zookeeper",
    "ranger",
    "dwarf",
    "elf",
    "ent",
    "goblin",
    "orc",
    "brute",
    "grunt",
    "elite",
    "marine",
    "orator",
    "hunter",
    "trapper",
    "fisherman",
    "cleric",
    "barbarian",
    "paladin",
    "monk",
    "mage",
    "mystic",
    "wizard",
    "horseman",
    "knight",
    "necromancer",
    "dragonborn",
    "warlock",
    "rogue",
    "sorcerer",
    "forager",
    "illusionist",
    "shaman",
    "vampire",
    "werewolf",
    "shapeshifter",
    "dragon",
    "alchemist",
    "sniper",
    "medic",
    "scientist",
    "gladiator",
    "astronomer",
    "blacksmith",
    "scholar",
    "pirate",
    "mafioso",
    "cyborg",
    "jester",
    "guardian",
    "squire",
    "pikeman",
    "gunslinger",
    "skald",
    "engineer",
    "psychic",
    "beastmaster",
    "librarian",
    "sharpshooter",
    "grenadier",
    "inventor",
    "bishop",
    "leader",
    "gypsy",
    "wanderer",
    "duellist",
    "crusader",
    "beserker",
    "samurai",
    "templar",
    "skirmisher",
    "bandit",
    "outlaw",
    "lord",
    "summoner",
    "mime",
    "ninja",
    "assassin",
    "gambler",
    "scout",
    "spy",
    "cultist",
    "zealot",
    "inquisitor",
    "headhunter",
    "nobility",
    "phantom",
    "ghost",
    "spectre",
  ];

  state = {
    character: {
      name: this.props.name,
      class: this.props.class,
      ability: this.props.ability,
      weakness: this.props.weakness,
      backstory: this.props.backstory,
    },
    name: this.props.name,
    log: [this.props.backstory],
    redirect: false,
    redirected: false,
    image: "images/saad.png",
  };

  componentDidMount() {
    this.setImage();
  }

  setImage = () => {
    console.log(this.props.class);
    console.log("class test", this.CLASSES.indexOf(this.props.class));
    if (this.CLASSES.indexOf(this.props.class) !== -1) {
      console.log("class detected");
      let path = `/images/class/${this.props.class.replace(" ", "")}.png`;
      this.setState({
        image: path,
      });
    }
  };

  startAdventure = (e) => {
    // console.log('fancy frontend stuff')
    this.props.createAdventure(this.state.character);
    this.setState({
      redirect: true,
    });
    // console.log(this.state.character)
  };

  deleteCharacter = (e) => {
    // console.log('fancy backend stuff')
    this.props.deleteCharacter(this.props.name);
  };

  characterDetail = () => {
    this.props.setCharacter(this.state.character);
    this.setState({
      redirected: true,
    });
  };

  render() {
    let css = `characters character-${this.props.id}`;
    // console.log(this.state)
    return (
      <div>
        <Card className={css} style={{ width: "18rem", margin: "15px" }}>
          <Card.Img variant='top' src={this.state.image} />
          <Card.Body>
            <Card.Title>
              {this.props.name} the {this.props.class}
            </Card.Title>
            <Card.Text>
              <p className='overflow-char'>{this.props.backstory}</p>
              Ability: {this.props.ability}
              <br />
              Weakness: {this.props.weakness}
            </Card.Text>
            <div className='buttons-container'>
              <Button variant='primary' onClick={this.startAdventure}>
                Start Adventure
              </Button>
              <Button variant='danger' onClick={this.characterDetail}>
                Details
              </Button>
            </div>
          </Card.Body>
        </Card>
        {this.state.redirect && (
          <Navigate
            to='/create-adventure'
            replace={true}
            character={this.state.character}
          />
        )}
        {this.state.redirected && (
          <Navigate
            to='/character-detail'
            replace={true}
            character={this.state.character}
            deleteCharacter={this.props.deleteCharacter}
          />
        )}
      </div>
    );
  }
}
