import React from "react";

function Sidebar({ student, close }) {
    return (
        <div className='sidebar'>
            <h2 className='close' onClick={() => close()}>
                x
            </h2>
            <div className='left'>
                <p>Name</p>
                <p>Age</p>
                <p>Gender</p>
                <p>Sports</p>
            </div>
            <div className='right'>
                <p className='highlight'>{student.name}</p>
                <p>{student.age}</p>
                <p>{student.gender}</p>
                <p className='highlight'>
                    {student.sports.map(
                        (game, i) =>
                            `${game} ${student.sports[i + 1] ? "," : ""}`
                    )}
                </p>
            </div>
        </div>
    );
}

export default Sidebar;
