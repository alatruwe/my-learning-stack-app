import React from "react";
import Entry from "../Entry/Entry.js";
import EntriesApiService from "../../services/entries-api-services";
import { format, parseISO } from "date-fns";

export default class EntryList extends React.Component {
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
                date={format(parseISO(entry.date), "L-d- yyyy")}
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
