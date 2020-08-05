import React from 'react';

import PageHeader from '../../components/PageHeader';

import './styles.css';

function TeacherList(){
    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="These are the available proffys">
                <form id="search-teachers">
                    <div className="input-block">
                        <label htmlFor="subject">Discipline</label>
                        <input type="text" id="subject"></input>
                    </div>
                    <div className="input-block">
                        <label htmlFor="week-day">Week Day</label>
                        <input type="text" id="week-day"></input>
                    </div>
                    <div className="input-block">
                        <label htmlFor="time">Hour</label>
                        <input type="text" id="time"></input>
                    </div>
                </form>
            </PageHeader>
        </div>
    );
}

export default TeacherList;