import { useEffect, useState, useMemo } from "react";
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
        key: "0",
        label: (
            <a rel="noopener noreferrer" href="#">
                Planejamento padrão
            </a>
        ),
    },
];

export const disciplines = () => {
    const [disciplines, setDisciplines] = useState([]);

    useEffect(() => {
        getAllDisciplinesRoute()
            .then((data) => setDisciplines(data || []))
            .catch(() => setDisciplines([]));
    }, []);

    return disciplines;
};

const useDisciplineMap = (disciplines) => {
    return useMemo(() => {
        const map = new Map();

        disciplines.forEach((d) => {
            if (d?.name) {
                map.set(d.name.trim().toLowerCase(), d.id);
            }
        });

        return map;
    }, [disciplines]);
};

const getDisciplineIdByName = (map, name) => {
    if (!name) return null;
    return map.get(name.trim().toLowerCase()) || null;
};

const highlightPreRequisites = (map, discipline) => {
    const pre_requisites = new Set();

    discipline?.pre_requisites?.forEach((name) => {
        const id = getDisciplineIdByName(map, name);
        if (id !== null) pre_requisites.add(id);
    });

    return [...pre_requisites];
};

const highlightPostRequisites = (map, discipline) => {
    const post_requisites = new Set();

    discipline?.post_requisites?.forEach((name) => {
        const id = getDisciplineIdByName(map, name);
        if (id !== null) post_requisites.add(id);
    });

    return [...post_requisites];
};

export const handleCardHover = (disciplines) => {
    const map = useDisciplineMap(disciplines);

    const usehandleCardHover = (discipline) => {
        if (!discipline || !map) {
            return { pre_requisites: [], post_requisites: [] };
        }

        return {
            pre_requisites: highlightPreRequisites(map, discipline),
            post_requisites: highlightPostRequisites(map, discipline),
        };
    };

    return usehandleCardHover;
};
