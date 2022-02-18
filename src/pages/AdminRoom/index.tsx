import { useParams, useHistory } from 'react-router-dom'

import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';


import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';
import logoImg from '../../assets/images/logo.svg';
import openEyeImg from '../../assets/images/View_light.svg';
import hideEyeImg from '../../assets/images/View_hide_light.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Questions } from '../../components/Question';
import { Modal } from '../../components/Modal/index';

import './style.scss';
import '../../styles/customButton.scss';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type RoomParams = {
  id: string;
}

export function AdminRoom() {

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const history = useHistory();
  const [highlighted, setHighlighted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    if (!highlighted) {
      const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true,
      })
      setHighlighted(true);

    } else {
      const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: false,
      })
      setHighlighted(false);


    }
  }


  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button
              isOutlined
              onClick={handleModal}
            >
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Questions
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marca pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>

              </Questions>
            );
          })}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleModal}
          title={title}
        >
          <div className="btnModal">
            <h3>Desativar Sala?</h3>
            <div>
              <button
                className="button-57"
                onClick={handleEndRoom}
              >
                <span>Desativar</span>
                <span>😭</span>
              </button>
              <button
                className="button-58"
                onClick={() => setIsModalOpen(false)}>
                <span>Cancelar</span>
                <span>😍</span>
              </button>
            </div>
          </div>
        </Modal>

      </main>


      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </div>
  );
}