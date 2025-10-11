import { DeleteOutlined } from "@ant-design/icons";
import "./style.css"

const Card = ({card, period, isFlow=false, highlight=false, canDelete=false, onHover=() => null, handleCardDelete=() => null, handleAddDiscipline=() => null}) => {
    
    const handleDragStart = e => {
        e.dataTransfer.setData("card", card.id)
        e.dataTransfer.setData("period", period)
    }

    return (
        <div className={`card ${highlight ? "highlighted" : ""} ${isFlow ? "" : card.type}`}
            title={isFlow? "" : card.name}
            onMouseEnter={onHover}
            onClick={handleAddDiscipline}
            draggable onDragStart={e => handleDragStart(e)}>
            {canDelete ? <DeleteOutlined onClick={handleCardDelete} /> : <></>}
            <h3 className="title">{isFlow ? card: card.name }</h3>
        </div>
    )
}

export default Card;
