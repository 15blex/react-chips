import React, { Component, PropTypes } from 'react'
import Autocomplete from 'react-autocomplete'
import Radium from 'radium';

import Chip from './Chip';

class Chips extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: "",
      chips: ["Hello", "Goodbye", "Taco", "Pizza"],
    };
  }

  onAutocompleteChange = (value) => {
    if (value.indexOf(',') !== -1) {
      let chips = value.split(",").map((val) => val.trim()).filter((val) => val !== "");
      chips.forEach(chip => {
        this.addChip(chip)
      });
      // this.setState({chips: this.state.chips.concat(chips), value: ""});
    } else {
      this.setState({value})
    }
  }

  addChip(object) {
    if (this.props.uniqueChips && this.state.chips.indexOf(object) !== -1) {
      this.setState({value: ""});
      return;
    }
    let chips = [...this.state.chips, object]
    this.setState({chips, value: ""})
  }

  removeChip = (idx) => {
    let { chips } = this.state;
    let left = chips.slice(0, idx);
    let right = chips.slice(idx + 1);
    this.setState({chips: [...left, ...right]});
  }

  renderChips = () => {
    return this.state.chips.map((chip, idx) => {
      return (
        <Chip
          onClick={this.removeChip}
          index={idx}
          key={`chip${idx}`}
          value={chip} />
      );
    });
  }

  getItems = () => {
    let items = ["Ruby", "Java", "CSS", "Javascript"];
    return items.filter(item => this.state.chips.indexOf(item) === -1);
  }

  render() {
    return (
      <div style={this.props.wrapperStyle}>
        {this.renderChips()}
        <Autocomplete
          value={this.state.value}
          inputProps={{name: "US state", id: "states-autocomplete", style: {
            border: "0",
            outline: "none",
            boxSizing: "border-box",
            width: "100%",
            padding: 5,
          }}}
          wrapperStyle={styles.wrapper}
          menuStyle={styles.menu}
          items={this.getItems()}
          getItemValue={(item) => item}
          shouldItemRender={(opt, val) => opt.toLowerCase().indexOf(val.toLowerCase()) !== -1}
          onChange={(event, value) => this.onAutocompleteChange(value)}
          onSelect={value => this.addChip(value)}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.abbr}
            >{item}</div>
          )}
          />
      </div>
    );
  }
}


let styles = {
  container: {
    display: "flex",
    position: "relative",
    border: "1px solid #ccc",
    font: "13.33333px Arial",
    minHeight: 24,
    alignItems: "center",
    flexWrap: "wrap",
    padding: "2.5px",
    borderRadius: 5,
  },
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  },
  input: {

  },
  wrapper: {
    display: "block",
    margin: 2.5,
    flexGrow: 1,
  },
  menu: {
    position: "absolute",
    left: 0,
    right: 0,
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    overflow: 'auto',
    maxHeight: '100px',
  }
}

Chips.propTypes ={
  wrapperStyle: PropTypes.object,
  autoCompleteData: PropTypes.array,
  autoCompleteOnly: PropTypes.bool,
  uniqueChips: PropTypes.bool,
};

Chips.defaultProps = {
  wrapperStyle: styles.container,
  autoCompleteData: ['Ruby', 'Java', 'Javascript', 'Go', 'C++', 'C', 'Swift'],
  autoCompleteOnly: false,
  uniqueChips: true,
};

export default Radium(Chips);