import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';

import { archiveNote, deleteNote, getActiveNotes } from '../utils/local-data';
import { searchFilter } from '../utils';

const HomePageWrapper = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword');

    const onNavigateToAddPageHandler = () => {
        navigate('/notes/new');
    };

    const onKeywordChangeHandler = (keyword) => {
        setSearchParams({ keyword });
    };

    return (
        <HomePage
            navigateToAddPage={onNavigateToAddPageHandler}
            defaultKeyword={keyword}
            keywordChange={onKeywordChangeHandler}
        />
    );
};

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getActiveNotes(),
            keyword: props.defaultKeyword || '',
        };

        this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this);
        this.onDeleteNoteEventHandler = this.onDeleteNoteEventHandler.bind(this);
        this.onArchiveNoteEventHandler = this.onArchiveNoteEventHandler.bind(this);
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
                notes: getActiveNotes(),
            };
        });
    }

    onArchiveNoteEventHandler(id) {
        archiveNote(id);
        this.setState(() => {
            return {
                notes: getActiveNotes(),
            };
        });
    }

    render() {
        const notes = searchFilter(this.state.notes, this.state.keyword);
        return (
            <section className="homepage">
                <Helmet>
                    <title>Home Page - notes.self</title>
                </Helmet>
                <h2>Catatan Aktif</h2>
                <SearchBar
                    keyword={this.state.keyword}
                    keywordChange={this.onKeywordChangeEventHandler}
                />
                <NotesList
                    notes={notes}
                    onDelete={this.onDeleteNoteEventHandler}
                    onArchive={this.onArchiveNoteEventHandler}
                />
                <div className="homepage__action">
                    <Button
                        title="Tambah"
                        onClick={this.props.navigateToAddPage}
                        icon={<MdAdd />}
                    />
                </div>
            </section>
        );
    }
}

HomePage.propTypes = {
    navigateToAddPage: PropTypes.func.isRequired,
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
