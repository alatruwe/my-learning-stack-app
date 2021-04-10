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

  handleDeleteEntry = () => {
    this.setState({ deleted: true });
    EntriesApiService.getEntries().then((res) => {
      this.setState({ entries: res });
    });
  };

  render() {
    const entries = this.state.entries;
    return (
      <section className="wrapper dashboard-wrapper">
        <h2 className="card-title">Dashboard</h2>
        <ul className="entry-list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <Entry
                handleDeleteEntry={this.handleDeleteEntry}
                date={format(parseISO(entry.date), "L-d- yy")}
                mood={entry.current_mood}
                id={entry.id}
                tech={entry.name}
                learningNotes={entry.learning_notes}
                strugglingNotes={entry.struggling_notes}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
