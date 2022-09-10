import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';

import { searchFilter } from '../utils';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/local-data';
import { Helmet } from 'react-helmet';

const ArchivePageWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword');

    const onKeywordChangeHandler = (keyword) => {
        setSearchParams({ keyword });
    };

    return <ArchivePage defaultKeyword={keyword} keywordChange={onKeywordChangeHandler} />;
};

class ArchivePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getArchivedNotes(),
            keyword: props.defaultKeyword || '',
        };

        this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this);
        this.onDeleteNoteEventHandler = this.onDeleteNoteEventHandler.bind(this);
        this.onUnarchiveNoteEventHandler = this.onUnarchiveNoteEventHandler.bind(this);
    }

    onKeywordChangeEventHandler(keyword) {
        this.setState(() => {
            return {
                keyword,
            };
        });
        this.props.keywordChange(keyword);
    }

    onDeleteNoteEventHandler(id) {
        deleteNote(id);
        this.setState(() => {
            return {
                notes: getArchivedNotes(),
            };
        });
    }

    onUnarchiveNoteEventHandler(id) {
        unarchiveNote(id);
        this.setState(() => {
            return {
                notes: getArchivedNotes(),
            };
        });
    }

    render() {
        const notes = searchFilter(this.state.notes, this.state.keyword);
        return (
            <section className="archives-page">
                <Helmet>
                    <title>Archives Page - notes.self</title>
                </Helmet>
                <h2>Catatan Arsip</h2>
                <SearchBar
                    keyword={this.state.keyword}
                    keywordChange={this.onKeywordChangeEventHandler}
                />
                <NotesList
                    notes={notes}
                    onDelete={this.onDeleteNoteEventHandler}
                    onArchive={this.onUnarchiveNoteEventHandler}
                />
            </section>
        );
    }
}

ArchivePage.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
};

export default ArchivePageWrapper;
