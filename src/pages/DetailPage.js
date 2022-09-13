import parse from 'html-react-parser';
import React from 'react';
import { Helmet } from 'react-helmet';
import { MdDeleteOutline, MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../components/Button';
import NoMatchPage from '../pages/NoMatchPage';
import { showFormattedDate } from '../utils';
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/network-data';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);

  React.useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
    });
  }, [id]);

  const onArchiveNoteHandler = async (id) => {
    const { error } = await archiveNote(id);
    if (!error) {
      navigate('/');
    }
  };

  const onUnarchiveNoteHandler = async (id) => {
    const { error } = await unarchiveNote(id);
    if (!error) {
      navigate('/');
    }
  };

  const onDeleteNoteHandler = async (id) => {
    const { error } = await deleteNote(id);
    if (!error) {
      navigate('/');
    }
  };

  if (!note) {
    return <NoMatchPage />;
  }

  const { title, createdAt, body, archived } = note;

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
          <Button title='Aktifkan' onClick={onUnarchiveNoteHandler} icon={<MdOutlineUnarchive />} />
        ) : (
          <Button title='Arsipkan' onClick={onArchiveNoteHandler} icon={<MdOutlineArchive />} />
        )}
        <Button title='Hapus' onClick={onDeleteNoteHandler} icon={<MdDeleteOutline />} />
      </div>
    </section>
  );
};

export default DetailPage;

// const DetailPageWrapper = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const onDeleteNoteHandler = async (id) => {
//     const { error } = await deleteNote(id);
//     if (!error) {
//       navigate('/');
//     }
//   };

//   const onArchiveNoteHandler = async (id) => {
//     const { error } = await archiveNote(id);
//     if (!error) {
//       navigate('/');
//     }
//   };

//   const onUnarchiveNoteEventHandler = async (id) => {
//     const { error } = await unarchiveNote(id);
//     if (!error) {
//       navigate('/');
//     }
//   };
//   return (
//     <DetailPage
//       id={id}
//       deleteNote={onDeleteNoteHandler}
//       archiveNote={onArchiveNoteHandler}
//       unarchiveNote={onUnarchiveNoteEventHandler}
//     />
//   );
// };

// class DetailPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       note: getNote(props.id),
//     };

//     this.onDeleteNoteEventHandler = this.onDeleteNoteEventHandler.bind(this);
//     this.onArchiveNoteEventHandler = this.onArchiveNoteEventHandler.bind(this);
//     this.onUnarchiveNoteEventHandler = this.onUnarchiveNoteEventHandler.bind(this);
//   }

//   onDeleteNoteEventHandler() {
//     this.props.deleteNote(this.state.note.id);
//   }

//   onArchiveNoteEventHandler() {
//     this.props.archiveNote(this.state.note.id);
//   }

//   onUnarchiveNoteEventHandler() {
//     this.props.unarchiveNote(this.state.note.id);
//   }

//   render() {
//     if (!this.state.note) {
//       return <NoMatchPage />;
//     }
//     const { title, createdAt, body, archived } = this.state.note;
//     console.log(body);
//     return (
//       <section className='detail-page'>
//         <Helmet>
//           <title>{title} - notes.self</title>
//         </Helmet>
//         <h3 className='detail-page__title'>{title}</h3>
//         <p className='detail-page__createdAt'>{showFormattedDate(createdAt)}</p>
//         <div className='detail-page__body'>{parse(body)}</div>
//         <div className='detail-page__action'>
//           {archived ? (
//             <Button
//               title='Aktifkan'
//               onClick={this.onUnarchiveNoteEventHandler}
//               icon={<MdOutlineUnarchive />}
//             />
//           ) : (
//             <Button
//               title='Arsipkan'
//               onClick={this.onArchiveNoteEventHandler}
//               icon={<MdOutlineArchive />}
//             />
//           )}
//           <Button
//             title='Hapus'
//             onClick={this.onDeleteNoteEventHandler}
//             icon={<MdDeleteOutline />}
//           />
//         </div>
//       </section>
//     );
//   }
// }

// DetailPage.propTypes = {
//   id: PropTypes.string.isRequired,
//   deleteNote: PropTypes.func.isRequired,
//   archiveNote: PropTypes.func.isRequired,
//   unarchiveNote: PropTypes.func.isRequired,
// };

// export default DetailPageWrapper;
