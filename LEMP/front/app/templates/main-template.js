export default
`
<style>
    :host {
        display: flex;
        min-height: 80vh;
        flex-direction: column;
    }

    * {
        color: #333333;
        font-size: 1.2rem;
        font-family: sans-serif;
    }

    h1 {
        font-size: 2rem;
        text-align: center;
    }

    a, .a-btn {
        color: #fc2c38;
    }

    .btn, .a-btn {
        text-decoration: none;
        padding: 1.3rem;
        border: solid 1px;
        width: 10rem;
        margin-bottom: 1rem;
        margin-left: .5rem;
        text-align: center;
        transition: .2s;
        border-radius: .5rem;
        cursor: pointer;
        user-select: none;
    }
    .btn:hover {
        background-color: #a9a9a9;
        color: #fff;
    }
    .a-btn:hover {
        background-color: #f6989f;
        color: #fff;
    }
</style>
`;
