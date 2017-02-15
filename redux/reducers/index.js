

import todosList from './todos/todosList'
import todosFilter from './todos/todosFilter'
import { login } from './auth';
import { listProduct } from './product';
import { listOrder } from './order';
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
export default combineReducers({

    todos: combineReducers({
        todosList,
        todosFilter
    }),
    auth: combineReducers({
        login
    }),
    product: combineReducers({
        listProduct
    }),
    order: combineReducers({
        listOrder
    }),
    routing: routerReducer
})