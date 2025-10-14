import { DeleteOutlined } from "@ant-design/icons";
import "./style.css"

const Card = ({card, period, isFlow=false, preRequisite=false, postRequisite=false,
            canDelete=false, onHover=() => null, onMouseLeave=() => null,
            handleCardDelete=() => null, handleAddDiscipline=() => null}) => {
    
    const handleDragStart = e => {
        e.dataTransfer.setData("card", card.id)
        e.dataTransfer.setData("period", period)
    }

    var highlighted = "";
    
    if (preRequisite) { highlighted = "preRequisite"}
    else if (postRequisite) { highlighted = "postRequisite"}

    return (
        <div className={`card ${highlighted} ${isFlow ? "" : card.type}`}
            title={isFlow? "" : card.name}
            onMouseEnter={onHover}
            onMouseLeave={onMouseLeave}
            onClick={handleAddDiscipline}
            draggable onDragStart={e => handleDragStart(e)}>
            {canDelete ? <DeleteOutlined onClick={handleCardDelete} /> : <></>}
            <h3 className="title">{isFlow ? card: card.name }</h3>
        </div>
    )
}

export default Card;
