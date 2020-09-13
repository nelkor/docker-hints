export const basic =
`
<style>
    @keyframes popping {
        from {
            background-color: #0000;
            top: -100vh;
            left: 0;
        }

        to {
            background-color: #0009;
            top: -100vh;
            left: -100vw;
        }
    }

    @keyframes fly-up {
        from {
            background-color: #0009;
            top: -100vh;
            left: -100vw;
        }

        to {
            background-color: #0000;
            top: -200vh;
            left: -100vw;
        }
    }

    * {
        box-sizing: border-box;
        font-size: 1.2rem;
        font-family: sans-serif;
    }

    .bg {
        width: 300vw;
        height: 300vh;
        position: absolute;
        top: -100vh;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0009;
        animation: popping .5s forwards;
    }

    .container {
        max-width: 20rem;
        max-height: 15rem;
        min-width: 10rem;
        min-height: 7rem;
        width: 100vw;
        height: 100vh;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: #fff;
    }
    .container h1 {
        font-size: 1.4rem;
        margin-top: .5rem;
    }
    .container div {
        width: 100%;
        margin: .5rem 0;
    }

    .fly-up {
        animation: fly-up .5s forwards
    }
</style>
<div class="bg close">
    <div class="container"></div>
</div>
`;

export const notice =
`
    <h1>Внимание!</h1>
    <p class="notice-text"></p>
`;

export const ask_deletion =
`
    <h1>Удалять?</h1>
    <div class="btn close">О нет!</div>
    <div class="a-btn delete">О да!</div>
`;
