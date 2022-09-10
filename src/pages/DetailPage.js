import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdOutlineArchive, MdOutlineUnarchive, MdDeleteOutline } from 'react-icons/md';

import Button from '../components/Button';

import { showFormattedDate } from '../utils';
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/local-data';
import { Helmet } from 'react-helmet';

const DetailPageWrapper = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const onDeleteNoteHandler = (id) => {
        deleteNote(id);
        navigate('/');
    };

    const onArchiveNoteHandler = (id) => {
        archiveNote(id);
        navigate('/');
    };

    const onUnarchiveNoteEventHandler = (id) => {
        unarchiveNote(id);
        navigate('/');
    };
    return (
        <DetailPage
            id={id}
            deleteNote={onDeleteNoteHandler}
            archiveNote={onArchiveNoteHandler}
            unarchiveNote={onUnarchiveNoteEventHandler}
        />
    );
};

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: getNote(props.id),
        };

        this.onDeleteNoteEventHandler = this.onDeleteNoteEventHandler.bind(this);
        this.onArchiveNoteEventHandler = this.onArchiveNoteEventHandler.bind(this);
        this.onUnarchiveNoteEventHandler = this.onUnarchiveNoteEventHandler.bind(this);
    }

    onDeleteNoteEventHandler() {
        this.props.deleteNote(this.state.note.id);
    }

    onArchiveNoteEventHandler() {
        this.props.archiveNote(this.state.note.id);
    }

    onUnarchiveNoteEventHandler() {
        this.props.unarchiveNote(this.state.note.id);
    }

    render() {
        const { title, createdAt, body, archived } = this.state.note;
        return (
            <section className="detail-page">
                <Helmet>
                    <title>{title} - notes.self</title>
                </Helmet>
                <h3 className="detail-page__title">{title}</h3>
                <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
                <div className="detail-page__body">{body}</div>
                <div className="detail-page__action">
                    {archived ? (
                        <Button
                            title="Aktifkan"
                            onClick={this.onUnarchiveNoteEventHandler}
                            icon={<MdOutlineUnarchive />}
                        />
                    ) : (
                        <Button
                            title="Arsipkan"
                            onClick={this.onArchiveNoteEventHandler}
                            icon={<MdOutlineArchive />}
                        />
                    )}
                    <Button
                        title="Hapus"
                        onClick={this.onDeleteNoteEventHandler}
                        icon={<MdDeleteOutline />}
                    />
                </div>
            </section>
        );
    }
}

DetailPage.propTypes = {
    id: PropTypes.string.isRequired,
    deleteNote: PropTypes.func.isRequired,
    archiveNote: PropTypes.func.isRequired,
    unarchiveNote: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
