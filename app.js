var PERGUNTAS = [
  { t: "Você recebe uma mensagem no WhatsApp: “Oi, mãe/pai, troquei de número, salva esse novo. Chegou um código por SMS aí? Me manda, por favor.” O que você faz?",
    exp: "É golpe. O código do SMS é a chave da sua conta: quem tem o código assume o seu WhatsApp. Nunca compartilhe códigos recebidos por SMS." },
  { t: "Uma pessoa liga dizendo ser do seu banco e pede sua senha e o número do token para “confirmar uma compra suspeita”. É seguro informar?",
    exp: "É golpe. Banco de verdade nunca pede senha nem token por telefone. Desligue e ligue você para o número oficial do banco." },
  { t: "Um anúncio oferece celular novo com 80% de desconto, só hoje, pagamento adiantado via PIX para uma chave com nome de pessoa desconhecida. Vale a pena?",
    exp: "É golpe. Desconto exagerado + pressa + PIX para desconhecido são os três sinais clássicos. Compre apenas em lojas e sites que você já conhece." },
  { t: "Um parente que mora longe pede dinheiro urgente pelo WhatsApp, mas se recusa a fazer uma chamada de vídeo. O que fazer?",
    exp: "Desconfie e verifique por outro canal: ligue para o número antigo da pessoa ou fale com outro familiar antes de transferir qualquer valor." },
  { t: "Chega um SMS dos “Correios” com um link para pagar uma taxa e liberar sua encomenda. Você clica?",
    exp: "É golpe (phishing). Correios e bancos não cobram taxas por SMS com link. Apague a mensagem e consulte apenas o site ou aplicativo oficial." },
  { t: "Você recebe um e-mail do seu banco pedindo para atualizar o cadastro clicando num link. É seguro clicar?",
    exp: "É golpe na maioria dos casos. Não clique no link do e-mail: abra o aplicativo oficial do banco ou digite você o endereço do site. Links por e-mail podem levar a páginas falsas." },
  { t: "Um perfil recém-criado numa rede social, sem foto e quase sem seguidores, oferece uma vaga de emprego com salário alto, mas pede uma “taxa de cadastro” antecipada. É oportunidade?",
    exp: "É golpe. Emprego de verdade nunca cobra taxa para contratar. Desconfie de perfis novos com ofertas boas demais e nunca pague para conseguir trabalho." },
  { t: "Uma loja onde você já tem cadastro envia um e-mail com uma oferta e um botão para “ver a promoção”. Como aproveitar com segurança?",
    exp: "Verifique por conta própria: em vez de clicar no botão do e-mail, abra o aplicativo ou o site da loja digitando o endereço. Se a oferta existir lá, é segura." }
];
var OPS = ["É seguro / pode confiar", "É golpe", "Preciso verificar melhor"];
var CERTAS = [1, 1, 1, 2, 1, 1, 1, 2];
var TOTAL = PERGUNTAS.length;
var acertos = 0, respondidas = 0;
var box = document.getElementById("quiz");

PERGUNTAS.forEach(function(p, i) {
  var c = document.createElement("div");
  c.className = "card";
  var h = "<p><span class='qnum'>Situação " + (i + 1) + " de " + TOTAL + "</span></p><p>" + p.t + "</p>";
  OPS.forEach(function(op, j) {
    h += "<button data-q='" + i + "' data-o='" + j + "'>" + op + "</button>";
  });
  h += "<div class='feed' id='f" + i + "'></div>";
  c.innerHTML = h;
  box.appendChild(c);
});
document.getElementById("comecar").addEventListener("click", function() {
  document.getElementById("inicio").style.display = "none";
  box.style.display = "block";
  document.getElementById("barra").style.display = "block";
  document.getElementById("pcont").style.display = "block";
  box.scrollIntoView();
});
box.addEventListener("click", function(e) {
  if (e.target.tagName !== "BUTTON" || e.target.disabled) return;
  var q = +e.target.getAttribute("data-q"), o = +e.target.getAttribute("data-o");
  var btns = box.querySelectorAll("button[data-q='" + q + "']");
  btns.forEach(function(b) { b.disabled = true; });
  var f = document.getElementById("f" + q);
  if (o === CERTAS[q]) { acertos++; f.className = "feed ok"; f.innerHTML = "<strong>✔ Correto.</strong> " + PERGUNTAS[q].exp; }
  else { f.className = "feed no"; f.innerHTML = "<strong>✘ Atenção.</strong> " + PERGUNTAS[q].exp; }
  respondidas++;
  document.getElementById("preench").style.width = (respondidas / TOTAL * 100) + "%";
  document.getElementById("pcont").textContent = respondidas < TOTAL
    ? "Pergunta " + (respondidas + 1) + " de " + TOTAL
    : "Teste concluído!";
  if (respondidas === TOTAL) mostraResultado();
});
function mostraResultado() {
  var r = document.getElementById("resultado");
  var msg = acertos === TOTAL ? "Excelente! Você identificou todos os sinais de golpe."
    : acertos >= 6 ? "Muito bem! Revise as situações que passaram e compartilhe este teste com sua família."
    : "Vale reler com calma: golpe bom é o que parece urgente. Na dúvida, nunca informe senhas, códigos ou faça PIX para desconhecidos.";
  r.style.display = "block";
  r.innerHTML = "<p style='text-align:center;'><span class='score'>" + acertos + "/" + TOTAL + "</span></p>" +
    "<h2 style='margin-top:0;color:var(--navy);'>Seu resultado</h2><p>" + msg + "</p>" +
    "<p><strong>As 4 regras de ouro:</strong> 1) Nunca compartilhe senhas, códigos de SMS ou token. " +
    "2) Desconfie de pressa, desconto exagerado e prêmios. " +
    "3) Confira por outro canal antes de transferir dinheiro. " +
    "4) Acesse bancos e lojas digitando o endereço ou pelo aplicativo oficial.</p>" +
    "<button class='bigbtn' id='refazer'>Refazer o teste</button>" +
    "<button id='compartilhar'>Compartilhar este teste</button>" +
    "<p id='copiado'>✔ Link copiado! Cole onde quiser compartilhar.</p>";
  r.scrollIntoView();
  document.getElementById("refazer").addEventListener("click", function() { location.reload(); });
  document.getElementById("compartilhar").addEventListener("click", function() {
    var url = location.href;
    if (navigator.share) { navigator.share({ title: document.title, url: url }); }
    else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function() {
        document.getElementById("copiado").style.display = "block";
      });
    }
  });
}
