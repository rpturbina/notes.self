import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';

import Button from '../components/Button';

import { addNote } from '../utils/local-data';
import { Helmet } from 'react-helmet';

const AddNewPageWrapper = () => {
    const navigate = useNavigate();
    const onAddNoteHandler = (note) => {
        addNote(note);
        navigate('/');
    };

    return <AddNewPage addNote={onAddNoteHandler} />;
};

class AddNewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
        };

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyInputEventHandler = this.onBodyInputEventHandler.bind(this);
        this.onAddNoteEventHandler = this.onAddNoteEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value,
            };
        });
    }

    onBodyInputEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.innerHTML,
            };
        });
    }

    onAddNoteEventHandler() {
        this.props.addNote(this.state);
    }

    render() {
        return (
            <section className="add-new-page">
                <Helmet>
                    <title>Add New Note - note.self</title>
                </Helmet>
                <div className="add-new-page__input">
                    <input
                        className="add-new-page__input__title"
                        placeholder="Ketik judul catatan..."
                        onChange={this.onTitleChangeEventHandler}
                    />
                    <div
                        className="add-new-page__input__body"
                        contentEditable
                        data-placeholder="Ketik isi catatan..."
                        onInput={this.onBodyInputEventHandler}
                    />
                </div>
                <div className="add-new-page__action">
                    <Button
                        title="Simpan"
                        onClick={this.onAddNoteEventHandler}
                        icon={<MdCheck />}
                    />
                </div>
            </section>
        );
    }
}

AddNewPage.propTypes = {
    addNote: PropTypes.func.isRequired,
};

export default AddNewPageWrapper;
