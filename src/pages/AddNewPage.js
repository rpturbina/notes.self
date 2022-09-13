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
          data-placeholder={locale === 'id' ? 'Ketik isi catatan ...' : 'Type your note'}
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

// const AddNewPageWrapper = () => {
//   const navigate = useNavigate();
//   const onAddNoteHandler = async (note) => {
//     const { error } = await addNote(note);
//     if (!error) {
//       navigate('/');
//     }
//   };

//   return <AddNewPage addNote={onAddNoteHandler} />;
// };

// class AddNewPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: '',
//       body: '',
//     };

//     this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
//     this.onBodyInputEventHandler = this.onBodyInputEventHandler.bind(this);
//     this.onAddNoteEventHandler = this.onAddNoteEventHandler.bind(this);
//   }

//   onTitleChangeEventHandler(event) {
//     this.setState(() => {
//       return {
//         title: event.target.value,
//       };
//     });
//   }

//   onBodyInputEventHandler(event) {
//     this.setState(() => {
//       return {
//         body: parse(event.target.innerHTML),
//       };
//     });
//   }

//   onAddNoteEventHandler() {
//     this.props.addNote(this.state);
//   }

//   render() {
//     return (
//       <section className='add-new-page'>
//         <Helmet>
//           <title>Add New Note - note.self</title>
//         </Helmet>
//         <div className='add-new-page__input'>
//           <input
//             className='add-new-page__input__title'
//             placeholder='Ketik judul catatan...'
//             onChange={this.onTitleChangeEventHandler}
//           />
//           <div
//             className='add-new-page__input__body'
//             contentEditable
//             data-placeholder='Ketik isi catatan...'
//             onInput={this.onBodyInputEventHandler}
//           />
//         </div>
//         <div className='add-new-page__action'>
//           <Button title='Simpan' onClick={this.onAddNoteEventHandler} icon={<MdCheck />} />
//         </div>
//       </section>
//     );
//   }
// }

// AddNewPage.propTypes = {
//   addNote: PropTypes.func.isRequired,
// };

// export default AddNewPageWrapper;
