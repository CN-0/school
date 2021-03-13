import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
    const [students, setStudents] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getDataFromServer();
    }, []);

    const getDataFromServer = async () => {
        const res = await fetch(
            "https://student-management-api-1u3cd4j7s.now.sh/students"
        );
        const data = await res.json();
        const finalData = {};
        data.forEach((student) => {
            const sClass = student.class;
            const sSection = student.section;
            if (finalData[sClass]) {
                if (finalData[sClass][sSection]) {
                    finalData[sClass][sSection] = finalData[sClass][
                        sSection
                    ].concat(student);
                } else {
                    finalData[sClass] = {
                        ...finalData[sClass],
                        [sSection]: [student],
                    };
                }
            } else {
                finalData[sClass] = { [sSection]: [student] };
            }
        });
        setStudents(finalData);
    };

    return (
        <div className='App'>
            <ul className='classes_list'>
                {students &&
                    Object.keys(students).map((sClass) => {
                        return (
                            <li key={sClass} className='class'>
                                <p>Class {sClass}</p>
                                <ul className='sections_list'>
                                    {Object.keys(students[sClass]).map(
                                        (sSection) => {
                                            return (
                                                <li
                                                    key={sClass + sSection}
                                                    className='section'>
                                                    <p>Section {sSection}</p>
                                                    <div className='students_list'>
                                                        {students[sClass][
                                                            sSection
                                                        ].map((s) => (
                                                            <div
                                                                onClick={() =>
                                                                    setSelected(
                                                                        s
                                                                    )
                                                                }
                                                                key={
                                                                    sClass +
                                                                    sSection +
                                                                    s[
                                                                        "rollNumber"
                                                                    ]
                                                                }
                                                                className='tooltip student'>
                                                                {s.name}
                                                                <div className='content'>
                                                                    <p>
                                                                        Name:{" "}
                                                                        {s.name}
                                                                    </p>
                                                                    <p>
                                                                        Age:{" "}
                                                                        {s.age}
                                                                    </p>
                                                                    <p>
                                                                        Gender:{" "}
                                                                        {
                                                                            s.gender
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        Sports:{" "}
                                                                        {s.sports.map(
                                                                            (
                                                                                game,
                                                                                i
                                                                            ) =>
                                                                                `${game} ${
                                                                                    s
                                                                                        .sports[
                                                                                        i +
                                                                                            1
                                                                                    ]
                                                                                        ? ","
                                                                                        : ""
                                                                                }`
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </li>
                        );
                    })}
                <div className='student_class'></div>
            </ul>
            {selected && (
                <Sidebar student={selected} close={() => setSelected(null)} />
            )}
        </div>
    );
};
export default App;
