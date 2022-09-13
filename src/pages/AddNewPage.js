import parse from 'html-react-parser';
import React from 'react';
import { Helmet } from 'react-helmet';
import { MdCheck } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import LocaleContext from '../context/LocaleContext';
import useInput from '../hooks/useInput';
import { addNote } from '../utils/network-data';

const AddNewPage = () => {
  const navigate = useNavigate();
  const [title, onTitleChangeHandler] = useInput('');
  const [body, setBody] = React.useState('');
  const { locale } = React.useContext(LocaleContext);

  const onBodyInputHandler = (event) => {
    setBody(() => parse(event.target.innerHTML));
  };

  const onAddNoteHandler = async () => {
    const { error } = await addNote({ title, body });
    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className='add-new-page'>
      <Helmet>
        <title>Add New Note - note.self</title>
      </Helmet>
      <div className='add-new-page__input'>
        <input
          className='add-new-page__input__title'
          placeholder={locale === 'id' ? 'Ketik judul catatan...' : 'Type your note title ...'}
          onChange={onTitleChangeHandler}
        />
        <div
          className='add-new-page__input__body'
          contentEditable
          data-placeholder={locale === 'id' ? 'Ketik isi catatan ...' : 'Type your note ...'}
          onInput={onBodyInputHandler}
        />
      </div>
      <div className='add-new-page__action'>
        <Button title='Simpan' onClick={onAddNoteHandler} icon={<MdCheck />} />
      </div>
    </section>
  );
};

export default AddNewPage;
