/*
Grupo de Pesquisa: Inclusão e Tecnologias Assistivas
Universidade Tecnológica Federal do Paraná, UTFPR, Brasil.

Albino Szesz Junior - albinoszeszjunior@gmail.com
Lucas Mendes - lrmen14@gmail.com
Lucia Virginia Mamcasz Viginheski - lmamcaszviginheski@gmail.com
Sani de Carvalho Rutz da Silva - sani@utfpr.edu.br

April 10, 2021.

-------
Tags disponiveis: 
https://developer.mozilla.org/pt-BR/docs/Web/MathML/Element

Tags suportadas:
<math> Equação Matemática = https://developer.mozilla.org/pt-BR/docs/Web/MathML/Element/math

Simples - Funcao Padrao
<mo> Operadores [+,-] = https://developer.mozilla.org/pt-BR/docs/Web/MathML/Element/mo
<mi> Identificadores [x,y,PI] = https://developer.mozilla.org/pt-BR/docs/Web/MathML/Element/mi
<mn> Numeros [1,5,10.2] = https://developer.mozilla.org/pt-BR/docs/Web/MathML/Element/mn

Compostast - Funcao Propria
<msqrt> Raiz Quadrada = https://developer.mozilla.org/pt-BR/docs/Web/MathML/Element/msqrt
<mroot> Raiz Qualquer = https://developer.mozilla.org/pt-BR/docs/Web/MathML/Element/mroot
<mfrac> Fração = https://developer.mozilla.org/pt-BR/docs/Web/MathML/Element/mfrac
<msup> Exponenciacao = https://developer.mozilla.org/pt-BR/docs/Web/MathML/Element/msup
-----------

Tabela de Simbolos MathML:
https://www.w3.org/TR/MathML3/appendixc.html
https://www.tutorialspoint.com/mathml/mathml_algebra.htm

*/

math_text = "";

math_tags_converter = {
    "mfrac": {
        "begin": "InicioFração",
        "mid": "Dividido Por",
        "end": "FimFração",
    },
    "mi": {
        "π": "PI",
        "sin": "Seno De",
        "cos": "Cosseno De",
        "tan": "Tangente De"
    },
    "mo": {
        "+": "Mais",
        "−": "Menos",
        "±": "Mais ou Menos",
        "=": "Igual a",
        "≠": "Diferente de",
        "<": "Menor que",
        "≤": "Menor ou igual a",
        "&lt;=": "Menor ou igual a",
        "×": "Vezes",
        "(": "Abre Parênteses",
        ")": "Fecha Parênteses",
    },
    "mroot": {
        "begin":"InicioRaiz Expoente",
        "mid":"FimExpoente De",
        "end":"FimRaiz"
    },
    "msqrt": {
        "begin":"Raiz Quadrada de",
        "end":"Fim da Raiz Quadrada",
    },
    "msup": {
        "begin":"",
        "mid":"Elevado a",
        "end":"FimExponenciação"
    }
}

// MFRAC: 0 = numerator | 1 = denominator | [read numerator first]
function recursao_mfrac(valor) {
    math_text = math_text + " " + math_tags_converter.mfrac.begin;

    if (valor[0].childElementCount == 0) {
        math_text = math_text + " " + valor[0].innerHTML;
    } else {
        recursao(valor[0].children);
    }

    math_text = math_text + " " + math_tags_converter.mfrac.mid;

    if (valor[1].childElementCount == 0) {
        math_text = math_text + " " + valor[1].innerHTML;
    } else {
        recursao(valor[1].children);
    }

    math_text = math_text + " " + math_tags_converter.mfrac.end;
}

// MROOT: 0 = base | 1 = index | [read index first]
function recursao_mroot(valor) {
    math_text = math_text + " " + math_tags_converter.mroot.begin;

    if (valor[1].childElementCount == 0) {
        math_text = math_text + " " + valor[1].innerHTML;
    } else {
        recursao(valor[1].children);
    }

    math_text = math_text + " " + math_tags_converter.mroot.mid;

    if (valor[0].childElementCount == 0) {
        math_text = math_text + " " + valor[0].innerHTML;
    } else {
        recursao(valor[0].children);
    }

    math_text = math_text + " " + math_tags_converter.mroot.end;
}

function recursao_msqrt(valor) {
    math_text = math_text + " " + math_tags_converter.msqrt.begin;

    if (valor[0].childElementCount == 0) {
        math_text = math_text + " " + valor[0].innerHTML;
    } else {
        recursao(valor[0].children);
    }

    math_text = math_text + " " + math_tags_converter.msqrt.end;
}

// MSUP: 0 = base | 1 = superscript | [read base first]
function recursao_msup(valor) {
    math_text = math_text + " " + math_tags_converter.msup.begin;

    if (valor[0].childElementCount == 0) {
        math_text = math_text + " " + valor[0].innerHTML;
    } else {
        recursao(valor[0].children);
    }

    math_text = math_text + " " + math_tags_converter.msup.mid;

    if (valor[1].childElementCount == 0) {
        math_text = math_text + " " + valor[1].innerHTML;
    } else {
        recursao(valor[1].children);
    }

    math_text = math_text + " " + math_tags_converter.msup.end;
}

function recursao(valor) {
    if(valor.length > 0) {
        for(var i=0; i<valor.length; i++) {
            switch(valor[i].nodeName) {
                case "mfrac":
                    recursao_mfrac(valor[i].children);
                    break;
                case "mi":
                    // Especifics <mo> elements need translation text, like sin and cos. Another elements like x and y don't need.
                    is_found = false;
                    for(key in math_tags_converter.mi) {
                        if(key == valor[i].innerHTML.trim()) {
                            math_text = math_text + " " + math_tags_converter.mi[key];
                            is_found = true;
                        }
                    }
                    if (is_found == false) {
                        math_text = math_text + " " + valor[i].innerHTML;
                    }
                    break;
                case "mo":
                    for(key in math_tags_converter.mo) {
                        //math_text = math_text + " " + math_tags_converter.mo[key]);
                        //math_text = math_text + " " + valor[i].innerHTML.charCodeAt(0));
                        if(key == valor[i].innerHTML) {
                            math_text = math_text + " " + math_tags_converter.mo[key];
                        }
                    }
                    recursao(valor[i].children);
                    break;
                case "mroot":
                    recursao_mroot(valor[i].children);
                    break;
                case "msqrt":
                    recursao_msqrt(valor[i].children);
                    break;
                case "msup":
                    recursao_msup(valor[i].children);
                    break;
                default:
                    if (valor[i].childElementCount == 0) {
                        math_text = math_text + " " + valor[i].innerHTML;
                    }
                    recursao(valor[i].children);
                    break;
            }
        }
    }
}

// Funcao assincrona para obter as configuracoes da extensao em tempo de execucao
async function loadOptions() {
	return new Promise((fulfill) => {
        chrome.storage.sync.get(['mathSpeakOptions'], function(result) {
            if( result.mathSpeakOptions != null) {
                fulfill(result.mathSpeakOptions);
            } else {
                fulfill(true);
            }
        });
	});
};

async function main() {
    // Aguarda a leitura das opcoes da extensao para executar o método principal
    var optionShowMath = await loadOptions();

    var links = [].slice.apply(document.getElementsByTagName('math'));
    /*

    O codigo percorre todas as equacoes em MathML - tag <math> - presentes na página.
    Coloca cada equação dentro de um <div> próprio.
    O <div> contém a equação em formato texto no atributo ALT e pode ser lido por leitores de tela.

    */

    for (var index = 0; index < links.length; index++) {
        
        math_text = "";
        recursao(links[index].children);

        //alert("EquaXao " + index + " = " + links[index].childNodes.length);
        //alert(typeof(links[index]));

        // Obtem o elemento <math>
        var tdElement = links[index];
        
        // Obtem o parent do elemento <math>
        var trElement = tdElement.parentNode;
        
        // Remove o elemento <math>
        trElement.removeChild(tdElement);

        // Cria o <div> para colocar o elemento <math>
        var newDiv = document.createElement("div");
        
        // Define uma ID unica para o <div>
        newDiv.id = "Math2Text"+index.toString();
        
        // Define a equacao em FORMATO TEXTO como texto alternativo do MathML (lido por leitores de tela)
        
        //newDiv.setAttribute("alt", "Equacao Matematica " + index.toString() + ".");

        var newImg = document.createElement("img");
        newImg.setAttribute("src", chrome.runtime.getURL("images/icone_128.png"));
        newImg.setAttribute("alt","Equação Matematica " + (index+1) + ". " + math_text + ".");
        newImg.setAttribute("height","12px");
        newImg.setAttribute("width","48x");
        newDiv.appendChild(newImg);

        // Insere o elemento <math> dentro do <div> acessivel [ caso a opcao da extensao 'Exibir Equacao Visual' esteja ativada ]
        if (optionShowMath == true) {
            newDiv.appendChild(links[index]);
        }

        // Insere o elemento <div> no exato lugar onde estava o elemento <math>
        trElement.appendChild(newDiv);
    }
}

main();