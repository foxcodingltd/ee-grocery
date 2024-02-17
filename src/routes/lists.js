import express from 'express';
import ejs from 'ejs';
import { store } from '../state/store.js';

export const router = express.Router();

export function buildListLink(listState) {
    const row = ejs.render(
    `
        <li data-listid=<%=id%>>
            <%= name %>
            <form method="post" action="/removelist/<%=id%>">
            <button> Remove </button> 
            </form>
        </li>
    `, listState);
    return row;
}

export async function buildIndex(state) {
    const entries = state.lists.map(buildListLink).join('\n');
    const page = await ejs.renderFile('./src/views/index.ejs', {
        listsHTML: entries,
    });
    return page;
}

export async function indexHandler(_, res) {
    const page = await buildIndex(store);  
    res.status(200).send(page);

}

router.get('/', indexHandler); 
