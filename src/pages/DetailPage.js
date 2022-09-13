import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { MdDeleteOutline, MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../components/Button';
import NoMatchPage from '../pages/NoMatchPage';
import { showFormattedDate } from '../utils';
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/local-data';

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
    if (!this.state.note) {
      return <NoMatchPage />;
    }
    const { title, createdAt, body, archived } = this.state.note;
    console.log(body);
    return (
      <section className='detail-page'>
        <Helmet>
          <title>{title} - notes.self</title>
        </Helmet>
        <h3 className='detail-page__title'>{title}</h3>
        <p className='detail-page__createdAt'>{showFormattedDate(createdAt)}</p>
        <div className='detail-page__body'>{parse(body)}</div>
        <div className='detail-page__action'>
          {archived ? (
            <Button
              title='Aktifkan'
              onClick={this.onUnarchiveNoteEventHandler}
              icon={<MdOutlineUnarchive />}
            />
          ) : (
            <Button
              title='Arsipkan'
              onClick={this.onArchiveNoteEventHandler}
              icon={<MdOutlineArchive />}
            />
          )}
          <Button
            title='Hapus'
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
