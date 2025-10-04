import { Modal, Descriptions } from 'antd';
const toPascalCase = (str) => str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1));
const toPortuguese = (str) => {return (toPascalCase(str) === "Origatory") ? "Obrigatória" : "Optativa" };
const isSpecified = (str) => { const regex = new RegExp('((?<=Not).+)'); return str.length < 1 || regex.test(str); }

const ShowOneDisciplineForm =  ({ discipline, open, onClose }) => {

  return (
    <>
      <Modal 
        // title={`${ discipline.name }`}
        open={ open }
        onCancel={ onClose }
        destroyOnClose={ false }
        footer={ null }
        className='discipline-details-modal'
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Nome">{discipline.name}</Descriptions.Item>
          <Descriptions.Item label="Sigla">{discipline.acronym}</Descriptions.Item>          
          <Descriptions.Item label="Professor">
            {isSpecified(discipline.professor) ? "Indefinido" : discipline.professor }
          </Descriptions.Item>
          <Descriptions.Item label="Descrição">
            {isSpecified(discipline.description) ? "Não há descrição" : discipline.description }          
          </Descriptions.Item>
          <Descriptions.Item label="Horário">
            {isSpecified(discipline.schedule) ? "Indefinido" : discipline.schedule }
          </Descriptions.Item>
          <Descriptions.Item label="Tipo">{toPortuguese(discipline.type)}</Descriptions.Item>
          <Descriptions.Item label="Pré-requisitos">
            {discipline.pre_requisites?.join(', ') || 'Não há pré-requisitos'}
          </Descriptions.Item>
          <Descriptions.Item label="Pós-requisitos">
            {discipline.post_requisites?.join(', ') || 'Não há pós-requisitos'}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default ShowOneDisciplineForm;
export { toPascalCase };