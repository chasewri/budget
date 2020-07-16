import React from 'react'
import Nav from '../../components/nav'
import style from './budgetPage.module.scss'

function Budget() {
    return (
        <div className={style.budgetPage}>
            <Nav />
            <h1>Here is the budget placeholder page</h1>
        </div>
    )
}

export default Budget
