// importação de dependência(s)
import express from 'express'
import { readFile } from 'fs/promises';



// variáveis globais deste módulo
const PORT = 3000;
const db = {};
const app = express(); //criacao de aplicacao express





// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 1-4 linhas de código (você deve usar o módulo de filesystem (fs))

try {

    db.jogadores = JSON.parse(await readFile(`${process.cwd()}/server/data/jogadores.json`));
    db.jogosPorJogador = JSON.parse(await readFile(`${process.cwd()}/server/data/jogadores.json`));

} catch (error) {

    console.error(`Erro ao carregar arquivo jogadores.json:${error}`);
}



// configurar qual templating engine usar. Sugestão: hbs (handlebars)
//app.set('view engine', '???qual-templating-engine???');
//app.set('views', '???caminho-ate-pasta???');
// dica: 2 linhas
app.set('view engine', 'hbs');
app.set('views', './server/views');



// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json (~3 linhas)

app.get('/', (req, res) => {
    //res.send('hello world');
    res.render('index', db);//db.jogadores define as variáveis para a view

})


// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter ~15 linhas de código


// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código
app.use(express.static(`client`));

// abrir servidor na porta 3000 (constante PORT)
// dica: 1-3 linhas de código


const server = app.listen(PORT, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Listening at http://${host}:${port}`);
});