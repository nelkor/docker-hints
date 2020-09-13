export default
`
<style>
    .item {
        height: 3rem;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .item:hover {
        background-color: rgba(255,114,144,0.1);
    }

    .item a {
        color: #333333;
        text-decoration: none;
    }

    .item-title {
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .item-controls {
        display: flex;
    }

    .item-edit {
        background: url(./pix/pencil.png) no-repeat center;
        background-size: contain;
        width: 3rem;
        height: 2rem;
    }

    .item-rm {
        background: url(./pix/dustbin.png) no-repeat;
        background-size: contain;
        width: 2rem;
        height: 2rem;
    }
</style>
<a class="a-btn" href="/add">Создать статью</a>
`;
