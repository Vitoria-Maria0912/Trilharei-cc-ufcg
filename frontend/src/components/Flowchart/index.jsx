import React, { useEffect, useState } from "react"
import Card from "../Card";
import DropZone from "../DropZone";
import "./style.css"
import { handleCardHover } from "../util";
import { getAllDisciplinesRoute } from "../../routes/DisciplineRoutes";

const Flowchart = () => {
    const [cards, setCards] = useState({
        periodo1: ["P1", "LP1", "FMCC1", "IC", "Direito"],
        periodo2: ["P2", "LP2", "FMCC2", "C1", "Economia"],
        periodo3: ["C2", "EDA", "LEDA", "Lógica", "Linear"],
        periodo4: ["TC", "OAC", "BD1", "PLP", "Grafos", "Prob"],
        periodo5: ["IA", "SO", "ES", "PSoft", "Redes", "Estatística"],
        periodo6: ["AS", "ATAL", "Concorrente", "Optativa", "Optativa"],
        periodo7: ["Compila", "Metodologia", "Optativa", "Optativa", "Optativa"],
        periodo8: ["P1", "Português", "Optativa", "Optativa", "Optativa"],
        periodo9: ["P2", "TCC", "Optativa", "Optativa", "Optativa"],
    });

    const [highlightedDisciplines, setHighlightedDisciplines] = useState([]);
    const [disciplines, setDisciplines] = useState([]);

    return (
        <div className="flowchart">
            {Object.keys(cards).map(period => (
                <div id={period} className="period">
                    <DropZone targetPeriod={period} index={0} setCards={setCards} />
                    {cards[period].map((card, index) => (
                        {card} &&
                        <React.Fragment>
                            <Card
                                onHover={() => setHighlightedDisciplines(handleCardHover(disciplines, card))}
                                highlight={highlightedDisciplines.includes(card.id)}
                                card={card}
                                period={period.id}
                                isFlow={true}
                            />
                            <DropZone targetPeriod={period} index={index + 1} setCards={setCards} />
                        </React.Fragment>
                ))}
                </div>
            ))}
        </div>
    )
}

export default Flowchart;