import React from "react";
import entries from "../../entries.js";
import Entry from "../Entry/Entry.js";
import EntriesApiService from "../../services/entries-api-services";

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      touched: false,
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  // API call here to get data
  componentDidMount() {
    EntriesApiService.getEntries().then((res) => {
      this.setState({ entries: res });
    });
  }

  render() {
    const entries = this.state.entries;
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
