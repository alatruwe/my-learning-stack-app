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
      deleted: false,
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

  componentDidUpdate() {
    EntriesApiService.getEntries().then((res) => {
      this.setState({ entries: res });
    });
  }

  handleDeleteEntry = (id) => {
    this.setState({ deleted: true });
  };

  render() {
    const entries = this.state.entries;
    return (
      <section className="wrapper">
        <ul className="entry-list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <Entry
                handleDeleteEntry={this.handleDeleteEntry}
                date={format(parseISO(entry.date), "L-d- yyyy")}
                mood={entry.current_mood}
                id={entry.id}
                tech={entry.tech_id}
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
