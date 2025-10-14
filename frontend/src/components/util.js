import { getAllDisciplinesRoute } from "../routes/DisciplineRoutes";

export const defaultPeriodStructure = {
    1: ["P1", "LP1", "FMCC1", "IC", "Direito"],
    2: ["P2", "LP2", "FMCC2", "C1", "Economia"],
    3: ["EDA", "LEDA", "Linear", "C2", "Lógica"],
    4: ["TC", "OAC", "BD1", "PLP", "Grafos", "Prob"],
    5: ["IA", "SO", "ES", "PSoft", "Redes", "Estatística"],
    6: ["AS", "ATAL", "PC"],
    7: ["Compila", "Metodologia"],
    8: ["Projeto em Computação I", "Português"],
    9: ["Projeto em Computação II", "TCC"],
};

export const defaultSelect = [
    {
        name: "Planejamento padrão",
        key: '0',
        label: (
            <a rel="noopener noreferrer" href="#">
                Planejamento padrão
            </a>
        ),
    }
];

const disciplines = await getAllDisciplinesRoute();

const getDisciplineIdByName = (disciplines, name) => {
    const discipline = disciplines.find(discipline => discipline.name === name)
    return discipline.id
}

const highlightPreRequisites = (disciplines, discipline) => {
    const pre_requisites = new Set();
    
    discipline.pre_requisites?.forEach((name) => pre_requisites.add(getDisciplineIdByName(disciplines, name)));
    
    return [...pre_requisites];
};

const highlightPostRequisites = (disciplines, discipline) => {
    const post_requisites = new Set();
    
    discipline.post_requisites?.forEach((name) => post_requisites.add(getDisciplineIdByName(disciplines, name)));
    
    return [...post_requisites];
};

export const handleCardHover = (disciplines, discipline) => {
    return {"pre_requisites": highlightPreRequisites(disciplines, discipline),
            "post_requisites": highlightPostRequisites(disciplines, discipline)
           }

};