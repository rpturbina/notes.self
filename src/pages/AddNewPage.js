import React from 'react';
import { Helmet } from 'react-helmet';
import { MdCheck } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import LocaleContext from '../context/LocaleContext';
import useInput from '../hooks/useInput';
import { decodeHTMLEntities } from '../utils';
import { addNote } from '../utils/network-data';

const AddNewPage = () => {
  const navigate = useNavigate();
  const [title, onTitleChangeHandler] = useInput('');
  const [body, setBody] = React.useState('');
  const { locale } = React.useContext(LocaleContext);

  const onBodyInputHandler = (event) => {
    setBody(() => decodeHTMLEntities(event.target.innerHTML));
  };

  React.useEffect(() => {
    console.log(body);
  }, [body]);

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
          data-placeholder={locale === 'id' ? 'Ketik isi catatan ...' : 'Type your note ...'}
          contentEditable
          onInput={onBodyInputHandler}
        />
      </div>
      <div className='add-new-page__action'>
        <Button
          title={locale === 'id' ? 'Simpan' : 'Save'}
          onClick={onAddNoteHandler}
          icon={<MdCheck />}
        />
      </div>
    </section>
  );
};

export default AddNewPage;
