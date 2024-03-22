import express from 'express';
import ejs from 'ejs';
import { createStore, addList, removeList } from '../state/store.js';

const store =  createStore();

export const router = express.Router();

export function buildListLink(listState) {
    const row = ejs.render(
    `
        <li data-listid="<%= id %>">
            <a href="/lists/<%= id %>"><%= name %></a>
            <form method="post" action="/lists/remove/<%=id %>">
            <button class="button__small">-</button> 
            </form>
        </li>
    `, listState);
    return row;
}

export function buildListItem(itemState) {
    const row = ejs.render(
    `
        <li data-listid="<%= listId %>" data-itemid="<%= id %>">
            <%= name %>
            <form method="post" action="/lists/<%= listId %>/items/remove/<%=id %>">
            <button class="button__small">-</button> 
            </form>
        </li>
    `, listState);
    return row;
}

export async function buildIndex(state) {
    const entries = Object.values(state.lists).map(buildListLink).join('\n');
    const page = await ejs.renderFile('./src/views/index.ejs', {
        listsHTML: entries,
    });
    return page;
}

export async function buildList(state, id) {
    const list = state.lists[id];
    if (!list) {
        console.log('Invalid list id');
        return 'List not found';
    }
    
    const entries = list.items.map(buildListItem).join('\n');
    const page = await ejs.renderFile('./src/views/list.ejs', {
        listName: list.name, 
        itemsHTML: entries,
    });
    return page;
}

export async function indexHandler(_, res) {
    const page = await buildIndex(store);  
    res.status(200).send(page);
}

function createListHandler(req, res) {
    const name = req.body['list-name'];
    addList({
        name,
    }, store);
    res.redirect(301, '/');
}

function removeListHandler(req, res) {
    const id = req.params.id;
    console.log("Params", req.params);
    removeList(id, store);
    res.redirect(301, '/');
}

async function listHandler(req, res) {
    const id = req.params.id;
    const page = await buildList(store, id);  
    res.status(200).send(page);
}

router.get('/', indexHandler); 
router.get('/:id', listHandler); 
router.post('/create', createListHandler); 
router.post('/remove/:id', removeListHandler); 
