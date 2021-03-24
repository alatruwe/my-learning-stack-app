import React from "react";
import entries from "../../entries.js";
import Entry from "../Entry/Entry.js";

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      touched: false,
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  // API call here to get data

  render() {
    return (
      <section className="wrapper">
        <ul className="entry-list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <Entry
                date={entry.date}
                mood={entry.mood}
                id={entry.id}
                tech={entry.tech}
                learningNotes={entry.learningNotes}
                strugglingNotes={entry.strugglingNotes}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
